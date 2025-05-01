<template>
  <div class="flex items-center justify-center h-screen ">
  <div class="flex flex-col bg-(--ui-bg-elevated) outline-(--ui-bg-accented) p-8 rounded-xl shadow-2xl  ">
    <div class="mb-3 text-2xl">Login</div>
    <UForm :schema="LoginSchema" :state="state" class="space-y-5" @error="onError" @submit="onSubmit">
    <UFormField label="Email" name="email">
      <UInput v-model="state.email"  />
    </UFormField>
    <UFormField label="Password"   name="password">
      <UInput v-model="state.password" />
    </UFormField>

    <UButton class="mb-3" type="submit">
      Submit
    </UButton>
  </UForm>
  <span class="outline p-1.5 rounded-md outline-(--ui-bg-accented) text-(--ui-text-elevated) hover:bg-(--ui-bg-accented) mt-4"> <UIcon  name="i-simple-icons-github" class="mr-2" /> <a href="/api/auth/oauth/github" >Login with GitHub</a></span>
  <span class="outline p-1.5 rounded-md outline-(--ui-bg-accented) text-(--ui-text-elevated) hover:bg-(--ui-bg-accented) mt-4"> <UIcon name="i-simple-icons-google" class="mr-2" /> <a href="/api/auth/oauth/google" >Login with Google</a></span>
 <div class="mt-6 mb-2  text-sm font-medium">Passkeys</div> 
  
  <UInput placeholder="Email" v-model="passkeyinput"  />
  <UButton class="mt-4" v-on:click="loginWithPasskey">Authenticate with Passkeys</UButton> 
  <a href="/auth/signup" class="text-xs text-(--ui-text-muted) self-center mt-8 underline cursor-pointer">No Account? Sign up here</a>
   
</div>
</div>
</template>

<script lang="ts" setup>
import type { FormErrorEvent, FormSubmitEvent } from '@nuxt/ui';
import type { z } from 'zod';

const passkeyinput = ref("");
definePageMeta({
  layout: false,
  skipAuth: true
})

type loginSchema = z.output<typeof LoginSchema>



const state = reactive<Partial<loginSchema>>({
  email: undefined,
  password: undefined
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<loginSchema>) {
  const {error} = await useFetch("/api/auth/login", {
    credentials: 'include',
    method: 'POST',
    body: event.data
  })
  
  if(error.value) {
   
    toast.add({ title: error.value?.data.message, description: "Please verify your credentials.",  color: 'error' })
  }else {
    toast.add({ title: "Succsess", description: "You are logedin",  color: 'success' })
    await navigateTo("/", {
      external: true
    });

  }
}


async function onError(payload:FormErrorEvent) {
  toast.clear();
  payload.errors.forEach((err) => toast.add({ title: 'An Error',description: `${err.name}: ${err.message}` ,  color: 'error' }))
  
}

const { register, authenticate, isSupported } = useWebAuthn({
  authenticateEndpoint: "/api/auth/webauthn/authenticate"
});

async function loginWithPasskey() {
  try {

  
  const  err = await authenticate(passkeyinput.value)

  console.log(err);
  await navigateTo("/", {
      external: true
    });
  } catch(e) {

    toast.add({ title: (e as any).data.message, description: "Please verify your credentials.",  color: 'error' })
  }
}


const { user, clear: clearSession } = useUserSession()

async function logout() {
  await clearSession()
  await navigateTo('/login')
}

</script>

<style>

</style>