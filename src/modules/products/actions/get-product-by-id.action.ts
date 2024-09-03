import { shopApi } from '@/api/shopApi';
import type { Product } from '../interfaces/product.interface';
import { getProductImageActions } from './get-product-image.actions';

export const getProductById = async (productId: string): Promise<Product> => {
  if (productId === 'create') {
    return {
      id: '',
      title: '',
      slug: '',
      description: '',
      price: 0,
      stock: 0,
      images: [],
      tags: [],
      sizes: [],
      gender: '' as any,
      user: {} as any,
    };
  }

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
