"use client"
import { CartContext } from '@/app/components/Context/CartContext'
import { formatCurrency } from '@/app/Helpers/formatCurrency'
import Loading from '@/app/loading'
import { Button } from '@/components/ui/button'
import { Loader2, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import Checkout from '@/app/components/CheckOut/Checkout'
import { clearCart, removeCartItem, updateCartItemCount } from '../products/_action/addToCart.action'

export default function Cart() {
  const {cartData ,isLoading,getCart,setCartData} =useContext(CartContext);
  const [removingId ,setRemovingId] =useState <string | null>(null)
  const [updateId ,setupdateId] =useState <string | null>(null)
  const [isclearing ,setisclearing] =useState <boolean>(false)

  if(typeof cartData?.data.products[0]?.product == 'string' || cartData == null){
    getCart();
  }
  async function removeCart(productId:string) {
    setRemovingId(productId)
    const data = await removeCartItem(productId)
    if(data.status == 'success'){
      toast.success("Product Removed successfully")
      setCartData(data)
    }
    setRemovingId(null)
    
  }
  async function clearAllCart() {
    setisclearing(true)
    const data = await clearCart();
    if(data.message == 'success'){
      setCartData(null)
    }
    setisclearing(false)
    
  }
  async function updateCartItem(productId:string , count : number) {
    if(count == 0){
      removeCart(productId)
    }else {
      setupdateId(productId)
    const data = await updateCartItemCount(productId,count);
    if(data.status == 'success'){
      toast.success("Product Quantity updated successfully")
      setCartData(data)
    }
    setupdateId(null)
    }
    
  }
  
  
  return <>
  {isLoading || typeof cartData?.data.products[0]?.product == 'string' ? <Loading/> : cartData?.numOfCartItems! > 0 ?
  <div className='container mx-auto px-4 py-6'>
    <h1 className='text-3xl font-bold tracking-tight'>Shopping Cart</h1>
    <p className='text-muted-foreground mt-1'>{cartData?.numOfCartItems} items in your cart</p>

    <div className='grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start mt-6'>
      <div className='lg:col-span-2 space-y-4'>
        {cartData?.data.products.map((item)=>
          <div key={item._id} className='flex gap-4 rounded-xl border p-4 shadow-sm bg-card'>
          <img src={item.product.imageCover} alt={item.product.title} className='w-24 h-24 rounded-lg object-cover md:w-28 md:h-28'/>

          <div className='flex-1 min-w-0'>
            <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2'>
              <div className='min-w-0'>
                <h3 className='font-semibold text-base md:text-lg line-clamp-2'>{item.product.title}</h3>
                <p className='text-sm text-muted-foreground mt-1'>{item.product.brand.name}.{item.product.category.name}</p>
              </div>

              <div className='text-right shrink-0'>
                <div className='font-semibold'>
                  {formatCurrency(item.price)}
                </div>
              </div>
            </div>

          <div className='mt-3 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <button onClick ={()=> updateCartItem(item.product._id , item.count - 1)} disabled={item.count == 1} aria-label='decrease' className='size-8 rounded-lg border hover:bg-accent'> - </button>
              <span className='w-6 text-center font-medium'>{updateId === item.product._id ? <Loader2 className='animate-spin size-2'/> : item.count}</span>
              <button onClick ={()=> updateCartItem(item.product._id , item.count + 1)} aria-label='increase' className='size-8 rounded-lg border hover:bg-accent'> + </button>
            </div>
            <button onClick={()=> removeCart(item.product.id)} aria-label='remove' disabled={removingId == item.product.id} 
            className='text-destructive hover:underline text-sm cursor-pointer flex gap-1 items-center'> 
            {removingId == item.product.id && <Loader2 className='animate-spin size-2'/>}Remove</button>

          </div>
          </div>
        </div>)}
      </div>

      <div className='lg:col-span-1 sticky top-18'>
        <div className='rounded-xl border p-5 shadow-sm'>
          <h2 className='text-lg font-semibold'>Order Summery</h2>
          <div className='mt-4 space-y-2'>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-muted-foreground'>Subtotal({cartData?.numOfCartItems} items)</span>
              <span className='font-semibold'>{formatCurrency(cartData?.data.totalCartPrice!)}</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-muted-foreground'> Shipping</span>
              <span className='text-emerald-600 font-medium'>Free</span>
            </div>
          </div>

          <div className='my-4 border-t'>
            <div className='flex items-center justify-between'>
              <span className='text-base font-semibold'> Total</span>
              <span className='text-base font-bold'>{formatCurrency(cartData?.data.totalCartPrice!)}</span>
            </div>
            <Checkout cartId={cartData?.cartId!} />


            <button className='w-full mt-3 h-11 rounded-xl border hover:bg-accent'> Continue Shopping</button>


          </div>


        </div>
        <Button onClick={clearAllCart} variant={"outline"} className='text-destructive hover:text-destructive mt-2 ms-auto flex cursor-pointer'> <Trash2/> clear Cart</Button>

      </div>

    </div>

  </div>:
  <div className='min-h-[60vh] flex justify-center items-center flex-col'>
    <h2 className='text-2xl mb-3'>Your Cart Is Empty</h2>
  <Link href={'/products'} className=''>
    <Button>
      Add Ones
    </Button>
  </Link>
  </div>
  
  }
  </>
}

  
  
  
