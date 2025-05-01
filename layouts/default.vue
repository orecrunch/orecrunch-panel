<template>
  <div class="flex flex-row">
    <div class="w-78 p-4 h-screen inline-flex flex-col">

      <div v-if="user" class="flex flex-row items-center mb-4 px-2">
        <UAvatar size="md" :src="user?.image" />

       
        <div class="ml-2">
          <div class="font-medium text-sm">Hello, {{ user?.name }}!</div>
          <div class="text-xs text-(--ui-text-muted)">Logout <a @click="onlogout" class="underline cursor-pointer">here</a> </div>
        </div>
      </div>


      <UNavigationMenu orientation="vertical" :items="items[0]" />
      <UNavigationMenu orientation="vertical" :items="items[1]" class="mt-auto" />

    </div>
    <USeparator orientation="vertical" class="h-screen py-4" />
    <div class="p-5 h-screen w-screen ">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession()

async function onlogout() {
await clear();
await navigateTo({ path: '/account/login', }, {
  external: true,
  redirectCode: 200
});
}

const items = [
  [
    {
      label: 'Servers',
      icon: 'i-lucide-server',
      to: '/',
    },
    {
      label: 'Account',
      icon: 'i-lucide-user',
      defaultOpen: true,
      children: [
      {
        label: 'Credentials',
        to: '/account/credentials',

      },
      {
        label: 'Security',
        to: '/account/security',

      },
    ]
    },
    {
      label: 'Settings',
      to: '/settings',
      icon: 'i-lucide-settings',
      defaultOpen: true,
      children: [{
        label: 'General',
        to: '/settings',
        exact: true,

      },]
    },
  ],
  [
    {

      label: 'GitHub',
      icon: 'i-simple-icons-github',
      to: 'https://github.com/orecrunch/orecrunch-panel',
      target: '_blank'
    },
    {

      label: 'Twitter',
      icon: 'i-simple-icons-x',
      to: 'https://patreon.com/mcpixie',
      target: '_blank'
    },
    {
      label: 'Help & Support',
      icon: 'i-lucide-circle-help',
      disabled: true
    }
  ],

]
</script>

<style></style>