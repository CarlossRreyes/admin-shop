import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { AuthStatus, type User } from '../interfaces';
import { loginAction } from '../actions/login.action';
import { useLocalStorage } from '@vueuse/core';
import { checkAuthAction, registerAction } from '../actions';




export const useAuthStore = defineStore('auth', () => {

  const authStatus = ref<AuthStatus>( AuthStatus.Checking );
  const user = ref< User| undefined >();
  // const token = ref('');
  const token = ref( useLocalStorage('token', ''));

  const login = async ( email: string, password: string ) => {
    try {
      const loginResp = await loginAction( email, password );

      if( !loginResp.ok ){
        return false;
      }

      user.value = loginResp.user;
      token.value = loginResp.token;
      authStatus.value = AuthStatus.Authenticated;
      return true;
      
    } catch (error) {
      return logOut();
      
    }
  };

  const register = async ( fullName: string, email: string, password: string ) => {
    try {
      const regResp = await registerAction( fullName, email, password );
      if( !regResp.ok ){
        logOut();
        return {
          ok: false,
          message: regResp.message
        };
      }
      
      
      user.value = regResp.user;
      token.value = regResp.token;
      authStatus.value = AuthStatus.Authenticated;
      return { ok: true, message: ''}
      
    } catch (error) {
      return {
        ok: false,
        message: 'Error al registrar el usuario'
      };
      
    }
  };
  
  const logOut = () => {
    localStorage.removeItem('token');
    authStatus.value = AuthStatus.Unauthenticated;
    user.value = undefined;
    token.value = '';
    console.log('usuario cerrado');
    
    return false;
  };

  const checkAuthStatus = async (): Promise<boolean> => {

    try {
      const statusResp = await checkAuthAction();
  
      if( !statusResp.ok ) {
        logOut();
        return false;
      }

      authStatus.value = AuthStatus.Authenticated;
      token.value = statusResp.token;
      user.value = statusResp.user;
      return true;
      
    } catch (error) {
      logOut();
      return false;
    }


  };


  return {
    user,
    token,
    authStatus,



    //Getters
    isChecking: computed( () => authStatus.value === AuthStatus.Checking ),
    isAuthenticated: computed( () => authStatus.value === AuthStatus.Authenticated ),
    username: computed( () => user.value?.fullName ),

    //todo: isAdmin
    isAdmin: computed( () => user.value?.roles.includes('admin') ?? false ),

    //todo: actions
    login,
    register,
    checkAuthStatus,
    logOut
  }
})
