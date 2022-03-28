import {Request, Response, NextFunction} from 'express';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { ProductItem, ProductItemDescription } from '../interfaces/item.interfaces';
import * as NumberHelpers from '../helpers/number.helpers';
import * as MeliResponse from '../interfaces/meli.interfaces';
import { createJsonBody } from '../helpers/response.helpers';
import { getCategories, mapMeliProductItemsResponse } from '../helpers/items.helpers';



interface SearchItemsByQueryResponse {
    categories: string[];
    items: ProductItem[];
}

export const searchItemsByQueryController = async (req: Request, res: Response, next: NextFunction) => {

    const query = req.query.q;

    try {
    
        const apiMeli = `${process.env.MELI_API_URL}/sites/MLA/search?q=${query}`;

        const meliResponse: AxiosResponse = await axios.get(apiMeli);

        const meliData: MeliResponse.SearchResponse = meliResponse.data;

        const productCategories: string[] = (await getCategories(meliData)).reverse();
        
        const productItems: ProductItem[] = meliData.results.map( mapMeliProductItemsResponse );

        const apiResponse: SearchItemsByQueryResponse = {
            categories: productCategories,
            items: productItems
        }

        res.json(
            createJsonBody(apiResponse)
        );

    } catch (catchedError: any) {
        next(catchedError.response.data);
    }
}


interface GetItemByIdParamResponse {
    item: ProductItemDescription; 
}

export const getItemByIdParamController = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { id: idParam } = req.params;

        const [itemDataResponse, descriptionDataResponse] = await Promise.all([
            axios.get(`${process.env.MELI_API_URL}/items/${idParam}`),
            axios.get(`${process.env.MELI_API_URL}/items/${idParam}/description`)
        ]);

        const { id, title, thumbnail, condition, price, currency_id, category_id, shipping, sold_quantity, seller_address }:MeliResponse.ItemInfoResponse = itemDataResponse.data;
        const { plain_text }: MeliResponse.ItemDescriptionResponse = descriptionDataResponse.data;

        const apiResponse: GetItemByIdParamResponse = {
            item: {
                id,
                title,
                category_id,
                state_name: seller_address.state.name,
                picture: thumbnail,
                condition,
                price: {
                    amount: NumberHelpers.getIntegerPart(price),
                    currency: currency_id,
                    decimals: NumberHelpers.getDecimalPart(price)
                },
                free_shipping: shipping.free_shipping,
                sold_quantity,
                description: plain_text
            }
        }
            
        res.json(
            createJsonBody(apiResponse)
        );

    } catch (catchedError: any) {
        next(catchedError.response.data);
    }
}