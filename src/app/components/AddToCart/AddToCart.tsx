"use client"
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { HeartIcon, Loader2, ShoppingCartIcon } from 'lucide-react'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { CartContext } from '../Context/CartContext'
import { addToCartAction } from '@/app/(pages)/products/_action/addToCart.action'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { addToWishlist } from '@/app/(pages)/wishList/_action/addToWishlist.action'

export default function AddToCart({productId} :{productId:string}) {

    const [isLoading,setIsLoading] = useState(false)
    const {getCart,setCartData} =useContext(CartContext)

    const session = useSession();
    const router = useRouter()
    async function addProductToCart() {
      if(session.status == 'authenticated'){
        setIsLoading(true)
        const data = await addToCartAction(productId);
        // await getCart()
        setCartData(data)
        data.status == 'success' && toast.success(data.message)
        setIsLoading(false)
        console.log(data)
      }else{
        router.push('/login')
      }
        
    }

    async function addProductToWishList() {
          if(session.status == 'authenticated'){
            const data = await addToWishlist(productId);
            data.status == 'success' && toast.success("it has been added to wishlist successfully")
            console.log(data)
          }else{
            router.push('/login')
          }
            
    }

  return <>
  <CardFooter className='gap-1'>
    <Button disabled={isLoading} onClick={addProductToCart} className='grow cursor-pointer '>
        { isLoading? <Loader2 className='animate-spin size-4'/>: <ShoppingCartIcon/>} Add To Cart</Button>
    <HeartIcon className="cursor-pointer text-black" onClick={() => { addProductToWishList(productId) }}/>

  </CardFooter>
  </>
}
