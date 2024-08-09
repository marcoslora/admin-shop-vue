import { shopApi } from '@/api/shopApi';
import type { Product } from '../interfaces/product.interface';
import { getProductImageActions } from './get-product-image.actions';

export const getProductById = async (productId: string) => {
  // TODO: pensar la creación de un nuevo producto
  try {
    const { data } = await shopApi.get<Product>(`/products/${productId}`);

    return {
      ...data,
      images: data.images.map(getProductImageActions),
    };
  } catch (error) {
    console.log(error);
    throw new Error(`Error getting product by id ${productId}`);
  }
};
