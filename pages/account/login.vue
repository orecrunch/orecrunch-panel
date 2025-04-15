<template>
  <div class="flex items-center justify-center h-screen ">
  <div class="flex flex-col bg-(--ui-bg-elevated) p-8 rounded-xl shadow-2xl shadow-black ">
    <div class="mb-6 text-2xl">Login</div>
    <UForm :schema="LoginSchema" :state="state" class="space-y-5" @error="onError" @submit="onSubmit">
    <UFormField label="Email" name="email">
      <UInput v-model="state.email"  />
    </UFormField>
    <UFormField label="Password"   name="password">
      <UInput v-model="state.password" />
    </UFormField>

    <UButton class="mt-3" type="submit">
      Submit
    </UButton>
  </UForm>

  <a href="/account/signup" class="text-xs text-(--ui-text-muted) self-center mt-8 underline cursor-pointer">No Account? Sign up here</a>
  </div>
</div>
</template>

<script lang="ts" setup>
import type { FormErrorEvent, FormSubmitEvent } from '@nuxt/ui';
import type { z } from 'zod';


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
  
    const err = await navigateTo({ path: '/' }, {
      external: true,
      redirectCode: 200
    });

    console.log(err);
  }
  
  
}
async function onError(payload:FormErrorEvent) {
  toast.clear();
  payload.errors.forEach((err) => toast.add({ title: 'An Error',description: `${err.name}: ${err.message}` ,  color: 'error' }))
  
}
const { user, clear: clearSession } = useUserSession()

async function logout() {
  await clearSession()
  await navigateTo('/login')
}

</script>

<style>

</style>