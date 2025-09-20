import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import { Product } from '@/interfaces/product';
import Image from 'next/image';
import Link from 'next/link';
import StarIcon from '@/app/components/Icons/StarIcon';
import AddToCart from '@/app/components/AddToCart/AddToCart';

export default async function Products() {
  
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/products');
  const {data:products}: {data:Product[]}=await response.json()
  console.log(products[0])
  return <>
 <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
   {
  products.map((product) => 
    <div key={product._id} className=''>
    <Card className=''>
   <Link href={'/products/'+product._id}>
      <Image src={product.imageCover} className='w-full' alt='' width={300} height={300}/>
  <CardHeader>
    <CardTitle>{product.title.split(' ',2)}</CardTitle>
    <CardDescription>{product.category.name}</CardDescription>
    <CardAction>{product.brand.name}</CardAction>
  </CardHeader>
  <CardContent className='flex justify-between'>
    <div className='flex gap-1'>

        <StarIcon/>
        <StarIcon/>
        
    <p>{product.ratingsAverage}</p>
    </div>
    <p className='pt-2'> Price: <span className='text font-bold'>{product.price} EGP</span></p>

  </CardContent>
    </Link>

  <AddToCart productId={product._id}/>
</Card>

  </div>)}
 </div>

  </>
}
