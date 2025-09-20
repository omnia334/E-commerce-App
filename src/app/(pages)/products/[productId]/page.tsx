import { Product } from '@/interfaces/product';
import { Params } from 'next/dist/server/request/params'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import React from 'react'
import StarIcon from '@/app/components/Icons/StarIcon';
import ProductSlider from '@/app/components/ProductSlider/ProductSlider';
import AddToCart from '@/app/components/AddToCart/AddToCart';

export default async function ProductDetails({params}:{params:Params}) {
  const {productId} = await params;

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/products/'+productId);
  const {data: product} : {data:Product} = await response.json()

  return <>
  <Card className='grid md:grid-cols-3 items-center'>
    <div className='col-span-1'>
      <ProductSlider images={product.images} altContent={product.title}/>

    </div>
    <div className='md:col-span-2 w-full space-y-4 p-4'>
      <CardHeader>
      <CardDescription>{product.brand.name}</CardDescription>
      <CardTitle className='text-2xl'>{product.title}</CardTitle>
      <CardDescription>{product.description}</CardDescription>
  </CardHeader>
  <CardContent>
    <CardDescription>{product.category.name}</CardDescription>
    <div className='flex justify-between items-center mt-3'>
      <p className='flex gap-1'><StarIcon/> <span>{product.ratingsAverage}</span></p>
      <p className=''>Remaining <span>{product.ratingsQuantity}</span></p>
    </div>
    <div className='flex justify-between items-center mt-3'>
      <p className=''>Quantity: <span>{product.quantity}</span></p>
      <p className='flex gap-1 items-center'>EGP<span className='text-xl font-semibold'>{product.price}</span></p>

    </div>
  </CardContent>
  <AddToCart productId={product._id}/>

    </div>
  
</Card>
  
  </>
}
