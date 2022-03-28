
interface MeliGeneric {
  id: string;
  name: string;
}


export interface MeliProductItem {
  id: string;
  title: string;
  price: number;
  currency_id: string;
  thumbnail: string;
  condition: string;
  shipping: { free_shipping: boolean };
  category_id: string;
  address: { state_name: string };
}

export interface Filter extends MeliGeneric {
  type: string
  values: FilterValue[]
}

export interface FilterValue extends MeliGeneric {
  path_from_root: PathFromRoot[]
}

export interface PathFromRoot extends MeliGeneric {
}

export interface AvailableFilter extends MeliGeneric {
  type: string
  values: AvailableFilterValue[]
}

export interface AvailableFilterValue extends MeliGeneric {
  results: number
}

export interface Filters {
  filters: Filter[];
  available_filters: AvailableFilter[];
}


export interface SearchResponse extends Filters {
  results: MeliProductItem[];  
}

export interface ItemInfoResponse {
  id: string; 
  category_id: string;
  condition: string; 
  currency_id: string; 
  price: number; 
  shipping: { free_shipping: boolean};
  thumbnail: string; 
  title: string; 
  sold_quantity: number;
  seller_address: { state: { name: string } };
}

export interface ItemDescriptionResponse {
  plain_text: string;
}

