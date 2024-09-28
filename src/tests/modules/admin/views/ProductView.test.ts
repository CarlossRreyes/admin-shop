import ProductView from "@/modules/admin/views/ProductView.vue";
import { fakeProducts } from "@/tests/fake/products.fake";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { shallowMount } from "@vue/test-utils";
import type { Mock } from "vitest";
import { ref } from "vue";
import { createRouter, createWebHistory, useRouter } from "vue-router";



vi.mock('@tanstack/vue-query');


vi.mock('vue-query', async ( original ) => {
    const originalImpl = await original();

    return {
        ...( originalImpl as any ),
        useRouter: vi.fn()
    }
});


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: ProductView
        }
    ]
});




describe('<ProductView/>', () => {

    const fakeProduct = fakeProducts.at( 0 );

    const mutateSpy = vi.fn();
    const replaceSpy = vi.fn();

    ( useMutation as Mock ).mockReturnValue({
        
        mutate: mutateSpy,
        isPending: ref( false ),
        isSuccess: ref( false ),
        data: ref( fakeProduct )
    });

    ( useRouter as Mock ).mockReturnValue({
        replace: replaceSpy
    })


    test('should redirect to products if id not found', () => {

        ( useQuery as Mock ).mockReturnValue({
            data: ref({}),
            isError: ref( true ),
            isLoading: ref( false ),
            refresh: vi.fn()
        });

        const wrapper = shallowMount( ProductView, {
            props: {
                productId: 'XXXXX'
            },
            global: {
                plugins: [ router ]
            }
        });
    });
    test('', () => {

    });
});