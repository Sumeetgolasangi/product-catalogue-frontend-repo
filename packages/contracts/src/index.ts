import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string().url(),
  rating: z.object({ rate: z.number(), count: z.number() }),
  isTopRated: z.boolean().optional()
});
export type Product = z.infer<typeof ProductSchema>;
export const ProductsResponseSchema = z.object({ products: z.array(ProductSchema) });
export const CategoriesResponseSchema = z.object({ categories: z.array(z.string()) });
export const EnquirySchema = z.object({
  productId: z.number().int().positive(),
  productTitle: z.string().min(1).max(300),
  name: z.string().trim().min(1).max(100),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  message: z.string().trim().min(10).max(2000),
  website: z.string().max(0).optional()
});
export type Enquiry = z.infer<typeof EnquirySchema>;
export const ErrorResponseSchema = z.object({ error: z.object({ code: z.string(), message: z.string() }) });
