<template>
  <div class="bg-white px-5 py-2 rounded">
    <h1 class="text-3xl">Productos</h1>
    <div class="md:px-32 py-8 w-full">
      <div class="shadow overflow-hidden rounded border-b border-gray-200">
        <table class="min-w-full bg-white">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="w-10 text-left py-3 px-4 uppercase font-semibold text-sm">imagen</th>
              <th class="flex-1 text-left py-3 px-4 uppercase font-semibold text-sm">Titulo</th>
              <th class="w-28 py-3 px-4 uppercase font-semibold text-sm">Precios</th>
              <th class="w-60 text-left py-3 px-4 uppercase font-semibold text-sm">Tallas</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr
              v-for="(product, index) in products"
              :key="product.id"
              :class="{ 'bg-gray-100': index % 2 === 0 }"
            >
              <td class="text-left py-3 px-4">
                <img class="h-10 w-10 object-cover" :src="product.images[0]" :alt="product.title" />
              </td>
              <td class="text-left py-3 px-4">
                <router-link
                  class="hover:text-blue-500 hover:underline"
                  :to="`/admin/products/${product.id}`"
                  >{{ product.title }}</router-link
                >
              </td>
              <td class="text-left py-3 px-4">
                <span class="text-blue-600 bg-blue-200 py-1 px-3 rounded-full text-xs">{{
                  product.price
                }}</span>
              </td>
              <td class="text-left py-3 px-4">
                {{ product.sizes.join(', ') }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <ButtonPagination :page="page" :has-more-data="!!products && products.length < 10" />
</template>
<script setup lang="ts">
import { getProductsActions } from '@/modules/products/actions';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { ref, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue';

const route = useRoute();
const page = ref(Number(route.query.page) || 1);
const queryClient = useQueryClient();
const { data: products } = useQuery({
  queryKey: ['products', { page: page }],
  queryFn: () => getProductsActions(page.value),
  // staleTime: 1000 * 60,
});
watch(
  () => route.query.page,
  (newPage) => {
    page.value = Number(newPage) || 1;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
);
watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['products', { page: page.value + 1 }],
    queryFn: () => getProductsActions(page.value + 1),
  });
});
</script>
