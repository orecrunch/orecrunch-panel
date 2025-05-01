<template>
  <div class="flex flex-row items-center justify-between w-2xl mx-auto">
    <div>
      <h1 class="text-base text-pretty  font-semibold text-(--ui-text-highlighted) ">
        {{ props.title }}
      </h1>
      <div class="text-[15px] text-(--ui-text-muted) mt-1">
        {{ props.description }}
      </div>
    </div>
    <slot name="trailing" />
  </div>

</template>

<script lang="ts" setup>
const props = defineProps({
  title: String,
  description: String
})
</script>

<style></style>