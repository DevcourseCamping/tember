<script setup></script>
<template>
  <div class="w-full h-screen">
    <RouterView :key="$route.fullPath" />
  </div>
</template>
<style scoped></style>
