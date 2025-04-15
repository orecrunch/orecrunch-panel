<template>
    <div class="flex items-center justify-center h-screen ">
      <div class="bg-(--ui-bg-elevated) p-8 rounded-xl shadow-2xl shadow-black ">
    <div class="mb-6 text-2xl">SignUp</div>
    <UForm :schema="SignupSchema" :state="state" class="space-y-4" @error="onError" @submit="onSubmit">
    <UFormField label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormField>
    <UFormField label="Password" name="password">
      <UInput v-model="state.password" />
    </UFormField>
    <UFormField label="Name" name="name">
      <UInput v-model="state.name" />
    </UFormField>
    <UFormField label="Avatar URL" name="avatar url">
      <UInput v-model="state.image" />
    </UFormField>

    <UButton class="mt-6 mb-8" type="submit">
      Submit
    </UButton>
  </UForm>
  <a href="/account/login" class="text-xs text-(--ui-text-muted) self-center underline cursor-pointer">You have an Account? Login here</a>
  </div>
    </div>
</template>

<script lang="ts" setup>
import type { FormErrorEvent, FormSubmitEvent } from '@nuxt/ui';
import type { SignupSchema} from '../../utils/authschema'
import type { z } from 'zod';

definePageMeta({
  layout: false,
  skipAuth: true
})

type signupschema = z.output<typeof SignupSchema>



const state = reactive<Partial<signupschema>>({
  email: undefined,
  password: undefined
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<signupschema>) {
  const {error} = await useFetch("/api/auth/signup", {
    credentials: 'include',
    method: 'POST',
    body: event.data
  })
 
  if(error.value) {
    toast.add({ title: error.value?.data.message ,description: `Please verify your credentials.` ,  color: 'error' })
  }else {
    toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' });
    await navigateTo("/");
  }
  
  
}
async function onError(payload:FormErrorEvent) {
  toast.clear();
  payload.errors.forEach((err) => toast.add({ title: 'An Error',description: `${err.name}: ${err.message}` ,  color: 'error' }))

}

</script>

<style>

</style>