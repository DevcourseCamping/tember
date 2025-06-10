<script setup></script>
<template>
  <div class="fixed w-full h-screen">
    <RouterView :key="$route.fullPath" />
  </div>
</template>
<style scoped></style>
