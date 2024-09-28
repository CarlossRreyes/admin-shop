


describe('Main.ts', () => {
    test('should return proper env values', () => {
        // console.log( import.meta.env.VITE_TESLO_API_URL );
        
        expect( import.meta.env.VITE_TESLO_API_URL ).toBe( 'http://localhost:3000/api' );


    })
})