import { tesloApi } from "@/api/tesloApi";
import { loginAction } from "@/modules/auth/actions";
import { createUpdateProductAction } from "@/modules/products/actions";
import type { Product } from "@/modules/products/interfaces/product.interface";
import path from 'path';
import fs from 'fs';


describe('createUpdateProductAction', () => {


    beforeAll( async () => {
        const resp = await loginAction( 'test1@google.com', 'Abc123' );
        if( !resp.ok ) {
            throw new Error( 'Failed to login ' );
        }

        localStorage.setItem('token', resp.token );



    })


    test('should create a new product', async () => {

        const product: Product = {
            id: '',
            title: 'Test product 2',
            slug: 'test_product_2',
            description: 'Test description',
            price: 100,
            stock: 10,
            images: [],
            tags: [],
            sizes: [],
            gender: 'kid' as any,
            user: {} as any
            
        };

        const resp = await createUpdateProductAction( product );
        // console.log( resp );

        await tesloApi.delete(`/products/${ resp.id }`);

        expect( resp ).toEqual({
            description: "Test description",
            gender: "kid",
            id: expect.any( String ),
            images: [],
            price: 100,
            sizes: [],
            slug: "test_product_2",
            stock: 10,
            tags: [],
            title: "Test product 2",
            user: {
            email: "test1@google.com",
            fullName: "Test One",
            id: expect.any( String ),
            isActive: true,
            roles: expect.any ( Array ) 
            }
      });
        

    });


    test('should update a product', async () => {

        const products = await tesloApi.get<Product[]>('/products');

        const product = products.data[0];

        const productId = product.id;

        const updatedProduct = {
            ...product,
            title: 'Updated product',
            description: 'Updated description',
            stock: 10
        };


        const resp = await createUpdateProductAction( updatedProduct );

        console.log( resp );

        expect( resp ).toEqual(
            expect.objectContaining({
                ...product,
                id: productId,
                title: 'Updated product',
                description: 'Updated description',
                stock: 10

            })
        )
        

    });
    test('should upload product image', async () => {

        // console.log( __dirname );

        const imagePath = path.join( __dirname, '../../../fake', 't-shirt.jpg');
        console.log( "IMAGEN", imagePath );
        
        const imageBuffer = fs.readFileSync( imagePath );

        const imageFile = new File([imageBuffer], 't-shirt.jpg', { type: 'image/jpeg' })
        



        const product: Product = {
            id: '',
            title: 'Test product 2',
            slug: 'test_product_2',
            description: 'Test description',
            price: 100,
            stock: 10,
            images: [imageFile] as any,
            tags: [],
            sizes: [],
            gender: 'kid' as any,
            user: {} as any
            
        };

        const { images, id } = await createUpdateProductAction( product );
        const [img1] = images;

        expect( typeof img1 ).toBe('string');

        await tesloApi.delete(`/products/${ id }`);

    });
    // test('', () => {

    // });
});