import { shopApi } from '@/api/shopApi';
import type { Product } from '../interfaces/product.interface';
import { getProductImageActions } from './get-product-image.actions';

export const getProductsActions = async (page: number = 1, limit: number = 10) => {
  try {
    const { data } = await shopApi.get<Product[]>(
      `/products?limit=${limit}&offset=${page * limit}`,
    );
    return data.map((product) => ({
      ...product,
      images: product.images.map(getProductImageActions),
    }));
  } catch (error) {
    throw new Error('Error getting products');
  }
};
