<template>
  <!-- component -->
  <!-- Header Navbar -->
  <top-menu />
  <!-- RouterView -->
  <router-view />

  <!-- Footer -->
  <custom-footer />
</template>

<script setup lang="ts">
import TopMenu from '../components/TopMenu.vue';
import CustomFooter from '../components/CustomFooter.vue';
// import HomeView from '@/views/HomeView.vue';
import { RouterView } from 'vue-router';
</script>
