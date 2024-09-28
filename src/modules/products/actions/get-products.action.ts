import { tesloApi } from "@/api/tesloApi";
import type { Product } from "../interfaces/product.interface";
import { getProductsImageAction } from "./get-products-image.action";




export const getProductsAction = async ( page: number = 1, limit: number = 10 ) => {
    console.log( "VALOR ++", page );
    
    try {
        const { data } = await tesloApi.get<Product[]>(`/products?limit=${ limit }&offset=${ (page - 1) * limit }`);

        // console.log( data );

        return data.map( product => ({
            ...product,
            images: product.images.map( getProductsImageAction )
        }));
        // return data.map( product => {
        //     return {
        //         ...product,
        //         images: product.images.map( getProductsImageAction )
        //     }
        // })
        
    } catch (error) {
        console.log( error );
        throw new Error('Error getting products');
        
    }
}