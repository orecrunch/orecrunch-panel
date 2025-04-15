export default defineNuxtRouteMiddleware((to, from) => {
  if (to.meta.skipAuth) return
  if (import.meta.client) return
    const session = useUserSession();

    console.log("hello from middleware");
    if (!session.loggedIn.value) {
        
       return navigateTo('/account/login');
      }
})
