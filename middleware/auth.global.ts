


export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.meta.skipAuth) return

    const {data:userData, error} = await useFetch<SessionResponse>("/api/_auth/session", {
      credentials: 'include'
    });
 
    if (!(userData.value?.user) || error.value) {

       return navigateTo('/auth/login');
      }
})
