<template>
  <span class="text-2xl font-bold">Servers</span>
  <div class="justify-self-center  flex flex-col">
    <AuthState v-slot="{ loggedIn, clear }">
      <button v-if="loggedIn" @click="clear">Logout</button>
      <NuxtLink v-else to="/login">Login</NuxtLink>
    </AuthState>
  </div>
</template>

<script lang="ts" setup>
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession()




</script>
