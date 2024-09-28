<template>
  <h1 class="text-2xl font-semibold mb-4">Nueva cuenta</h1>
  <form @submit.prevent="onRegister">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="name" class="block text-gray-600">Nombres</label>
      <input
        v-model="myForm.fullName"
        ref="fullNameInputRef"
        type="text"
        id="name"
        name="name"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>

    <!-- Username Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">Correo</label>
      <input
        v-model="myForm.email"
        ref="emailInputRef"
        type="text"
        id="email"
        name="email"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Contraseña</label>
      <input
        v-model="myForm.password"
        ref="passwordInputRef"
        type="password"
        id="password"
        name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>

    <!-- Forgot Password Link -->
    <div class="mb-6 text-blue-500">
      <a href="#" class="hover:underline">Olvidaste tu contraseña?</a>
    </div>
    <!-- Login Button -->
    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
    >
      Crear cuenta
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'login' }" class="hover:underline">Iniciar sesión</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import { useToast } from 'vue-toastification';
import { registerAction } from '../actions/register.action';


// const router = useRouter();
const fullNameInputRef = ref<HTMLInputElement|null>( null );
const emailInputRef = ref<HTMLInputElement|null>( null );
const passwordInputRef = ref<HTMLInputElement|null>( null );
const authStore = useAuthStore();
const toast = useToast();


const myForm = reactive({
  fullName: '',
  email: '',
  password: '',
});

const onRegister = async () => {


  if ( myForm.fullName.length < 2 ){
    return emailInputRef.value?.focus();
  }
  if ( myForm.email === '' ){
    return emailInputRef.value?.focus();
  }
  if ( myForm.password.length < 6 ){
    return passwordInputRef.value?.focus();
  }


  console.log( myForm );

  const ok = await authStore.register( myForm.fullName, myForm.email, myForm.password );

  console.log( ok );

  if( ok ) return;
  toast.error( "Hubo un error al crear el usuario" );
  
  
};


</script>
