import axios, { AxiosResponse } from "axios";
import { ProductItem } from "../interfaces/item.interfaces";
import * as MeliResponse from "../interfaces/meli.interfaces";
import * as NumberHelpers from "./number.helpers";


export const mapMeliProductItemsResponse = (itemResult: MeliResponse.MeliProductItem): ProductItem => {
        
    const { id, title, price, currency_id, thumbnail, condition, shipping, category_id, address } = itemResult;

    const productItem: ProductItem = { 
        id,
        title,
        category_id,
        state_name: address.state_name,
        picture: thumbnail,
        condition,
        price: {
            amount: NumberHelpers.getIntegerPart(price),
            currency: currency_id,
            decimals: NumberHelpers.getDecimalPart(price)
        },
        free_shipping: shipping.free_shipping
    }

    return productItem;
}

const getCategoriesById = async (categoryId: string) => {
    console.log('get category by id')
    const apiMeli = `${process.env.MELI_API_URL}/categories/${categoryId}`;

    const meliResponse: AxiosResponse = await axios.get(apiMeli);

    return meliResponse.data;
}

export const getCategories = async (data: MeliResponse.Filters): Promise<string[]> => {
    // El armado de categorias lo hago desde filtros
    // Si no hay filtros, lo armo desde AvailableFilters
    if(data.filters.length > 0) {
        return getCategoriesFromFilters(data.filters) 
    } else {
        return getCategoriesFromAvailableFilters(data.available_filters);
    }
}

export const getCategoriesFromFilters = async (filters: MeliResponse.Filter[]): Promise<string[]> => {

    try {
        console.log('from filters')

        const categoryFilters: MeliResponse.FilterValue[] = filters.filter(({id}: {id: string}) => id === 'category')[0].values;
        
        const categories: string[] = categoryFilters[0].path_from_root.map((pathFromRoot: MeliResponse.PathFromRoot) => pathFromRoot.name);
        
        return categories;
    } catch (error) {
        console.log(error);
        return [];
    }

}

export const getCategoriesFromAvailableFilters = async (available_filters: MeliResponse.AvailableFilter[]): Promise<string[]> => {

    try {
        console.log('from available filters')
        const categoryFilters: MeliResponse.AvailableFilter = available_filters.filter(({id}: {id: string}) => id === 'category')[0];

        // Si hay categorias las ordenamos las categorias por Resultado descendente y obtengo la de mayor valor
        const { id: categoryId } =  categoryFilters.values.sort((catA: MeliResponse.AvailableFilterValue, catB: MeliResponse.AvailableFilterValue) => catB.results - catA.results)[0];
            
        const meliResponseData = await getCategoriesById(categoryId);

        const categories: string[] = meliResponseData.path_from_root.map(({name}: {name: string}) => name);

        return categories;
    } catch (error) {
        console.log(error);
        return [];
    }

}