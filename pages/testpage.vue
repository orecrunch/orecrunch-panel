<template>
  <div class="h-screen ">
  <div  ref="terminal"></div>
</div>

</template>

<script lang="ts" setup>
import { useEventSource } from '@vueuse/core'
definePageMeta({
  layout: false,
  skipAuth: true
})

import { onMounted, onBeforeUnmount, ref } from 'vue'
import { Terminal } from "@xterm/xterm"

const terminal = useTemplateRef('terminal')

let eventSource: EventSource

onMounted(() => {
  
  const term = new Terminal();

  term.open(terminal.value!)
  
  term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')


  // Replace with your SSE endpoint
  eventSource = new EventSource('/api/servers/attach?id=316eaca1f9047ad187ea92ce38f2ccec28521a41588667c2b01356ef637a448a', )

  eventSource.onmessage = (event: MessageEvent<string>) => {

    
  }

  eventSource.onerror = (err) => {
    console.error('SSE error:', err)
    eventSource.close()
  }
})

onBeforeUnmount(() => {
  if (eventSource) {
    eventSource.close()
  }
})



</script>

<style>

</style>