
export interface Author {
    name: string;
    lastname: string;
}

export interface Price { 
    currency: string;
    amount: number;     
    decimals: number;
}

export interface ProductItem {
    id: string;
    title: string;
    price: Price;
    picture: string;
    condition: string;
    free_shipping: boolean;
    category_id: string;
    state_name: string;
}

export interface ProductItemDescription extends ProductItem {
    sold_quantity: number;
    description: string;
}
