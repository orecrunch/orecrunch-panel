<template>
  <div>
    <motion.div :initial='{ transform: "translateY(100px)", opacity: 0 }'
      :animate='{ transform: "translateY(0px)", opacity: 1, transition: { duration: 1.2, type: "spring" } }'
      class="justify-self-center  flex  bg-amber-200 h-[200px] w-[200px]" />
  </div>
</template>

<script lang="ts" setup>
import { motion } from "motion-v"
</script>
