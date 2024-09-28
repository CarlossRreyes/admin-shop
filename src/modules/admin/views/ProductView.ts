import { createUpdateProductAction, getProductById } from "@/modules/products/actions"
import { useMutation, useQuery } from "@tanstack/vue-query"
import { defineComponent, ref, watch, watchEffect } from 'vue';
import { useRouter } from "vue-router";
import { useFieldArray, useForm } from 'vee-validate';
import * as yup from 'yup';
import CustomInput from "@/modules/common/components/CustomInput.vue";
import CustomTextArea from "@/modules/common/components/CustomTextArea.vue";
import { useToast } from "vue-toastification";

const validationSchema = yup.object({
    title: yup.string().required(),
    slug: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    stock: yup.number().min(1).required(),
    gender: yup.string().required().oneOf(['men', 'women', 'kid'])
});


export default defineComponent({

    components: {
        CustomInput,
        CustomTextArea,
    },

    props: {
        productId: {
            type: String,
            required: true
        }
    },

    setup( props ){
        const router = useRouter();
        const toast = useToast();

        const { data: product, isError, isLoading, refetch } = useQuery({
            queryKey: ['product', props.productId ],
            queryFn: () => getProductById( props.productId ),
            retry: false
        });

        const { mutate, isPending, isSuccess: isUpdateSuccess, data: updateProduct  } = useMutation({
            mutationFn: createUpdateProductAction
        });

        const { values, defineField, errors, handleSubmit, resetForm, meta } = useForm({
            validationSchema,
            // initialValues: product.value
        });

        const onSubmit = handleSubmit( async ( values ) => {
            console.log( { values });
            // mutate( values );

            const formValues = {
                ...values,
                images: [...values.images, ...imageFiles.value],
            };
        
            mutate(formValues);
        });

        const [title, titleAttrs] = defineField('title');
        const [slug, slugAttrs] = defineField('slug');
        const [description, descriptionAttrs] = defineField('description');
        const [price, priceAttrs] = defineField('price');
        const [stock, stockAttrs] = defineField('stock');
        const [gender, genderAttrs] = defineField('gender');

        const { fields: images } = useFieldArray<string>('images');
        const { fields: sizes, remove: removeSize, push: pushSize } = useFieldArray<string>('sizes');

        const imageFiles = ref<File[]>([]);

        const toggleSize = ( size: string ) => {
            const currentSizes = sizes.value.map( s => s.value );
            const hasSize = currentSizes.includes( size );


            if( hasSize ){
                removeSize( currentSizes.indexOf( size ));
            } else {
                pushSize( size );
            }
        };


        const onFileChange = ( event: Event ) => {
            const fileInput = event.target as HTMLInputElement;
            const fileList = fileInput.files;


            if( !fileList ) return;
            if( fileList.length === 0 ) return;

            for( const imagefile of fileList ){
                imageFiles.value.push( imagefile );
            }
        };

        watchEffect( () => {
            if( isError.value && !isLoading.value ) {
                router.replace('/admin/products');
                // return;
            }
        });


        watch( product, () => {
            if( !product ) return;
            resetForm({
                values: product.value
            })


        }, {
            deep: true,
            immediate: true
        });


        watch( isUpdateSuccess, ( value ) => {
            console.log( { isUpdateSuccess });
            if( !value ) return;
            toast.success('Producto actualizado correctamente');

            router.replace(`/admin/products/${ updateProduct.value?.id }`)


            resetForm({ //Restablecer valores del formulario
                values: updateProduct.value
            });

            imageFiles.value = []; //??
            
        });


        watch(
            () => props.productId,
            () => {
                console.log( props.productId );
                refetch();
            }
        );


        return {
            values,
            errors,
            meta,

            
            //Properties
            title,
            titleAttrs,
            slug,
            slugAttrs,
            description,
            descriptionAttrs,
            price,
            priceAttrs,
            stock,
            stockAttrs,
            gender,
            genderAttrs,


            images,
            sizes,
            imageFiles,
            

            isPending,
            

            //Getters
            allSizes: [ 'XS', 'S', 'M', 'L', 'XL', 'XXL' ],



            //Actions
            onSubmit,
            toggleSize,

            onFileChange,


            hasSize: ( size: string ) => {
                const curentSizes = sizes.value.map( s => s.value );
                return curentSizes.includes( size );
            },

            temporalImageUrl: ( imageFile: File ) => {
                return URL.createObjectURL( imageFile );
            }
            
        }

    }



})