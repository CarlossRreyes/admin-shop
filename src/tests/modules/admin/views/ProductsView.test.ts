import ProductsView from "@/modules/admin/views/ProductsView.vue";
import router from "@/router";
import { fakeProducts } from "../../../fake/products.fake";
// import { fakeProducts } from "@/tests/fake/products.fake";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { shallowMount } from "@vue/test-utils";
import type { Mock } from "vitest";


vi.mock('@tanstack/vue-query', () => {
    return {
        useQueryClient: vi.fn().mockReturnValue({
            prefetchQuery: vi.fn()
        }),
        useQuery: vi.fn(),
    }
})

describe('<ProductsView/>', () => {

    (useQuery as Mock).mockReturnValue({
        data: fakeProducts
    })

    ( window as any ).scrollTo = vi.fn();

    const wrapper = shallowMount( ProductsView, {
        global: {
            plugins: [ router ]
        }
    });
    test('should render with default values', async () => {




        // console.log( wrapper.html() );
        expect( wrapper.html() ).toMatchSnapshot();
        
        
    });

    test('should prefetch query on mounted', async () => {


        await router.replace('/?page=2');

        expect( useQueryClient().prefetchQuery ).toHaveBeenCalledWith({
            queryKey: ['products', { page: 3  }],
            queryFn: expect.any( Function )
        });

        // expect( window.scrollTo ).toHaveBeenCalledWith({
        //     top: 0, behavior: 'smooth'
        // })
    });
    // test('', () => {

    // });
});
// describe('', () => {


//     test('', () => {

//     });
//     test('', () => {

//     });
// });