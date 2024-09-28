import { tesloApi } from "@/api/tesloApi";
import type { Product } from "../interfaces/product.interface";
import { getProductsImageAction } from "./get-products-image.action";




export const getProductById = async ( productId: string ): Promise<Product> => {



    if( productId === 'create' ) {


        return {
            id: '',
            title: '',
            slug: '',
            description: '',
            price: 0,
            stock: 0,
            images: [],
            tags: [],
            sizes: [],
            gender: '' as any,
            user: {} as any
        }
    }
    try {

        const { data } = await tesloApi.get<Product>(`/products/${ productId }`);
        // console.log( data );
        
        return {
            ...data,
            images: data.images.map( getProductsImageAction )
        }
        
    } catch (error) {
        // console.log( error );
        throw new Error(`Error getting product by id ${ productId }`);
        
    }

};