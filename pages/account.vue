<template>
  <div>
    <UNavigationMenu color="neutral"  highlight :items="items" class="w-auto border-b-1 border-(--ui-border) mb-14 " />
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
const items = [
  {
    label: 'Credentials',
      icon: 'i-lucide-user',
      to: '/account/credentials'
  },
  {
    label: 'Security',
      icon: 'i-lucide-users',
      to: '/account/security'
  },
  ]
</script>

<style>

</style>