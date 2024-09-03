import { shopApi } from '@/api/shopApi';
import type { Product } from '../interfaces/product.interface';

export const createUpdateProductAction = async (product: Partial<Product>) => {
  if (product.id && product.id !== '') {
    return await updateProduct(product);
  }
  return await createProduct(product);
};

export const updateProduct = async (product: Partial<Product>) => {
  const image: string[] =
    product.images?.map((image) => {
      if (image.startsWith('http')) {
        const imageName = image.split('/').pop();
        return imageName ? image : '';
      }
      return image;
    }) ?? [];
  const productId = product.id;
  delete product.id;
  delete product.user;
  product.images = image;
  try {
    const { data } = await shopApi.patch(`/products/${productId}`, product);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error updating product');
  }
};
export const createProduct = async (product: Partial<Product>) => {
  const image: string[] =
    product.images?.map((image) => {
      if (image.startsWith('http')) {
        const imageName = image.split('/').pop();
        return imageName ? image : '';
      }
      return image;
    }) ?? [];
  delete product.id;
  delete product.user;
  product.images = image;
  try {
    const { data } = await shopApi.post(`/products/`, product);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error creating product');
  }
};
