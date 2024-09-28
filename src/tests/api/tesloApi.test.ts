import { tesloApi } from "@/api/tesloApi";


describe('TesloApi axios instance', () => {


    test('should have baseURL set to VITE_TESLO_API_URL', () => {

        expect( tesloApi.defaults.baseURL ).toEqual( import.meta.env.VITE_TESLO_API_URL );

    });


    test('should set Authorization header with token from localhost', async () => {
        const token = 'myAuthToken';

        localStorage.setItem('token', token);


        const resp = await tesloApi.get('/api/');

        // console.log( resp.config.headers.Authorization );
        expect( resp.config.headers.Authorization ).toBe( `Bearer ${ token }`);
    });
    test('should not set Authorization header if token is not ib LocalStorage', async () => {
        localStorage.clear();

        


        const resp = await tesloApi.get('/api/');

        // console.log( resp.config.headers.Authorization );
        

        expect( resp.config.headers.Authorization ).toBeUndefined();
    });
});