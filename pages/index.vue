<template>
  <span class="text-2xl font-bold">Servers</span>
  <div class="justify-self-center  flex flex-col">
    <div v-if="loggedIn">
    <h1>Welcome {{ session?.user?.name }}!</h1>
    <p>Logged in since {{ session.loggedInAt }}</p>
    <button @click="clear">Logout</button>
  </div>
  <div v-else>
    <h1>Not logged in</h1>
    <a href="/api/auth/github">Login with GitHub</a>
    <a href="/api/auth/google">Login with Google</a>
    <!-- or open the OAuth route in a popup -->
  </div>
  </div>
</template>

<script lang="ts" setup>
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession()




</script>
