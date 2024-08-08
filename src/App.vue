<template>
  <FullScreenLoader v-if="authStore.isChecking" />

  <RouterView v-else />
  <VueQueryDevtools />
</template>

<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { useAuthStore } from './modules/auth/stores/auth.store';
import { AuthStatus } from './modules/auth/interfaces';
import FullScreenLoader from '@/modules/common/components/FullScreenLoader.vue';
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore();
// manejar la navegacion
const router = useRouter();
// informacion de la ruta
const route = useRoute();
authStore.$subscribe(
  (_, state) => {
    if (state.authStatus === AuthStatus.Checking) {
      authStore.checkAuthStatus();
      return;
    }
    if (route.path.includes('/auth') && state.authStatus === AuthStatus.Authenticated) {
      router.replace({ name: 'home' });
      return;
    }
  },
  { immediate: true },
);
</script>
