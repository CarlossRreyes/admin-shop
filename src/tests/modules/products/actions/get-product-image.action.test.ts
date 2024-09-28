import { getProductsImageAction } from "@/modules/products/actions";





describe( 'getProductsImageAction', () => {


    test('should return proper image URL', () => {

        const imageName = 'test.jpg';
        const url = getProductsImageAction( imageName );


        const expectUrl = `${ import.meta.env.VITE_TESLO_API_URL }/files/product/${ imageName }`;
        

        expect( url ).toBe( expectUrl );
    });

    // test('', () => {

    // });
});