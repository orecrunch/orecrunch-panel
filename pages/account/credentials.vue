<template>
<div  class="min-h-[20vh]  ">
  <HeaderTitle description="Link the OAuth providers you want to use" title="OAuth Providers">
    <template #trailing>
      <UDropdownMenu :items="oauthProviders" :content="{
        align: 'start',
        side: 'bottom',
        sideOffset: 8
      }" :ui="{
        content: 'w-48'
      }">
        <UButton label="Link OAuth" icon="i-lucide-plus" color="neutral" variant="solid" />
      </UDropdownMenu>
    </template>
  </HeaderTitle>
  <PageCard class="mt-4">
    <template #default>
      <div v-if="oauthData && oauthData?.length > 0">
      <ul role="list" class="divide-y divide-(--ui-border-muted-subtle)">
        <li v-for="(credential, index) in oauthData" :key="index"
          class="flex items-center justify-between gap-3 py-3 px-4 sm:px-6">
          <div class="flex items-center gap-3 min-w-0">
            <UIcon :name="'simple-icons-' + credential.type" class="size-7" />
            <div class="text-sm min-w-0">
              <p class="text-(--ui-text-highlighted) font-medium truncate">
                {{ credential.type.charAt(0).toUpperCase() + credential.type.slice(1) }}
              </p>
              <p class="text-(--ui-text-muted) truncate">
                {{ credential.publicKey }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <UDropdownMenu :items="getCredentialsSelectitems(credential.type, credential.publicKey)"
              :content="{ align: 'end' }">
              <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" />
            </UDropdownMenu>
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="flex h-10 items-center justify-center text-(--ui-text-muted) text-sm"> No oauth linked.</div>
    </template>
  </PageCard>
</div>


  <HeaderTitle class="mt-10" description="Login using passkeys for a more secure login" title="Passkeys">
    <template #trailing>
      <UButton label="Add Passkey" icon="i-lucide-plus" color="neutral" variant="solid" v-on:click="addPasskey" />
    </template>
  </HeaderTitle>
  <PageCard class="mt-4">
    <template #default>
      <div v-if="passkeyData && passkeyData?.length > 0">
      <ul role="list" class="divide-y divide-(--ui-border-muted-subtle)">
        <li v-for="(credential, index) in passkeyData" :key="index"
          class="flex items-center justify-between gap-3 py-3 px-4 sm:px-6">
          <div class="flex items-center gap-3 min-w-0">
            <UIcon name="i-lucide-key-round" class="size-10" />

            <div class="text-sm min-w-0">
              <p class="text-(--ui-text-highlighted) font-medium truncate">
                {{ credential.type.charAt(0).toUpperCase() + credential.type.slice(1) }}
              </p>
              <p class="text-(--ui-text-muted) truncate">
                {{ credential.publicKey }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <UDropdownMenu :items="getCredentialsSelectitems(credential.type, credential.publicKey)"
              :content="{ align: 'end' }">
              <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" />
            </UDropdownMenu>
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="flex h-10 items-center justify-center text-(--ui-text-muted) text-sm"> No passkey added.</div>
    </template>
  </PageCard>
</template>

<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui';

const { data: oauthData, error: oauthError, refresh: oauthRefresh } = useFetch("/api/auth/credentials?exclude=passkey", {
  credentials: 'include'
})
const { data: passkeyData, error: passkeyError, refresh: passkeyRefresh } = useFetch("/api/auth/credentials?include=passkey", {
  credentials: 'include'
})

function getCredentialsSelectitems(type: string, credentialsId: string) {
  return [{
    label: 'View credential',
    onSelect: () => console.log('Edit member')
  }, {
    label: 'Remove credential',
    color: 'error' as const,
    onSelect: () => deleteCredentials(type, credentialsId)
  }]
}

async function addPasskey() {
  const { register } = useWebAuthn({
    registerEndpoint: "/api/auth/webauthn/register"
  });

  const session = useUserSession();
  console.log('USERNAME:' + session.user.value!.email)

  register({
    userName: session.user.value!.email
  }).then(async (result) => {
    console.log("succsess");
    await passkeyRefresh();
  })

}

const oauthProviders = ref<DropdownMenuItem[]>([
  {
    label: 'Link Google',
    icon: 'i-simple-icons-google',
    to: "/api/auth/oauth/google", external: true
  },
  {
    label: 'Link Github',
    icon: 'i-simple-icons-github',
    to: "/api/auth/oauth/github", external: true

  },

])

async function deleteCredentials(type: string, credentialsId: string) {
  const { data, error } = await useFetch("/api/auth/deleteCredentials", {
    method: "post",
    body: {
      type: type,
      credentialsId: credentialsId,
    }
  });

  const toast = useToast()

  if (error.value) {
    toast.add({ title: "Sorry.", description: "Youre credentials couldnt be deleted", color: "error" })
  } else {

    toast.add({ title: "Succsess", description: "Youre credentials are deleted!", color: "success" })
    await oauthRefresh();
    await passkeyRefresh();
  }
}
</script>
