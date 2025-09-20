"use server"

import { getUserToken } from "@/app/Helpers/getUserToken"

export async function addToWishlist(productId:string) {
    const token = await getUserToken()
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
      method: 'POST',
      headers:{
                token:token + '',
                "Content-Type" : "application/json"
        },
      body: JSON.stringify({ productId }),
    })
    const data = await res.json()
    return data
  } 

export async function getWishlist() {
    const token = await getUserToken()
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
    method:'GET',
      headers:{
        token : token+ ''
      },
    })
    const data = await res.json()
    return data
}


export async function removeFromWishlist(productId: string) {
        const token = await getUserToken()
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
      method: 'DELETE',
      headers: { token : token + '' },
    })
    const data = await res.json()
    return data
  
}




