<template>
  <full-screen-loader v-if="authStore.isChecking"></full-screen-loader>
  

  <RouterView v-else></RouterView>
  <VueQueryDevtools></VueQueryDevtools>
</template>

<script lang="ts" setup>


import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { useAuthStore } from './modules/auth/stores/auth.store';
import { AuthStatus } from './modules/auth/interfaces';
import { useRoute, useRouter } from 'vue-router';
import FullScreenLoader from './modules/common/components/FullScreenLoader.vue';



const authStore = useAuthStore();

const router = useRouter();
const route = useRoute();

authStore.$subscribe( ( _, state ) => {
  // console.log( { mutation, state });
  console.log( state.authStatus );
  if( state.authStatus === AuthStatus.Checking ) {
    authStore.checkAuthStatus();
    return;
  }

  if( route.path.includes('/auth') &&  state.authStatus === AuthStatus.Authenticated ) {
    router.replace( { name: 'home' })
  }

  console.log( state.authStatus );
  


  
}, {
  immediate: true
})
</script>