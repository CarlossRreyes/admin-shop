import ShopLayout from '@/modules/shop/layouts/ShopLayout.vue';
import { shallowMount } from '@vue/test-utils';


describe( '<ShopLayout/>', () => {


    test('render top-menu, router-view and footer', () => {


        const wrapper = shallowMount( ShopLayout, {
            global: { stubs: ['router-view'] }
        });

        expect( wrapper.findComponent({ name: 'top-menu' }).exists() ).toBeTruthy();
        expect( wrapper.findComponent({ name: 'router-view' }).exists() ).toBeTruthy();
        expect( wrapper.findComponent({ name: 'custom-footer' }).exists() ).toBeTruthy();
        
        
    });
});


// describe( '', () => {


//     test('', () => {

//     });
//     test('', () => {

//     });
// });