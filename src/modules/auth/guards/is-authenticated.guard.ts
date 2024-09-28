// import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

// const isAuthenticatedGuard = async (
//   to: RouteLocationNormalized,
//   from: RouteLocationNormalized,
//   next: NavigationGuardNext,
// ) => {
//   const userId = localStorage.getItem('userId');
//   localStorage.setItem('lastPath', to.path);

//   if (!userId) {
//     return next({
//       name: 'login',
//     });
//   }

//   return next();
// };

// export default isAuthenticatedGuard;


import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import { AuthStatus } from '../interfaces';

const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();

  await authStore.checkAuthStatus();
  



  ( authStore.authStatus === AuthStatus.Unauthenticated )
    ? next({ name: 'home' })
    : next();
  // return next();
};

export default isAuthenticatedGuard;

