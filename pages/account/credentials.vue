<template>
  <div v-if="userdata">
    <div class="text-2xl mb-4">Credentials/Linked Accounts</div>
   <span class="outline p-1.5 rounded-md outline-(--ui-bg-accented) text-(--ui-text-elevated)"> <UIcon name="i-simple-icons-github" /> <a href="/api/auth/github" class="underline">Login with GitHub</a></span>
   <span class="outline p-1.5 rounded-md outline-(--ui-bg-accented) text-(--ui-text-elevated)"> <UIcon name="i-simple-icons-google" /> <a href="/api/auth/google" class="underline">Login with Google</a></span>
    <div v-for="data in userdata" class="mb-3 mt-4 bg-(--ui-bg-elevated) p-3.5 rounded-xl outline-1 outline-(--ui-bg-accented)">
      <div class="text-base">{{ data.type }}</div>
      <div class="text-xs">{{ data.credentialsId }}</div>
      
    </div>
  </div>
  <div v-else>
    <div class="text-2xl">An Error Occoured!</div>
  </div>
</template>

<script lang="ts" setup>

const {data:userdata, error} = useFetch("/api/auth/credentials", {
  credentials: 'include'
})



</script>

<style>

</style>