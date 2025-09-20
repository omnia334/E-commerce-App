"use server"

import { getUserToken } from "@/app/Helpers/getUserToken";
import { CartResponse } from "@/interfaces/cart";


export async function addToCartAction(productId:string) {

    const token = await getUserToken()

    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart',{
            method:"POST",
            body: JSON.stringify({productId}),
            headers:{
                token:token + '',
                "Content-Type" : "application/json"
            }
        });
        const data = await response.json();

        return data;
    
}

export async function removeCartItem(productId:string) {
    const token = await getUserToken()
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/'+ productId,{
            method:"DELETE",
            headers:{
                token:token + '',
            }
    });
    const data:CartResponse = await response.json();
    console.log(data);
    return data;
    
    
}
export async function clearCart() {
    const token = await getUserToken()
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/',{
            method:"DELETE",
            headers:{
                token : token + '',
            }
    });
    const data:CartResponse = await response.json();
    console.log(data);
    return data;
    
}
export async function updateCartItemCount(productId:string , count : number) {
    const token = await getUserToken()
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/' + productId,{
    method : "PUT" ,
    body : JSON.stringify({count}),
    headers:{
        token : token + '',        
        "Content-Type" : "application/json"
}        
})
    const data:CartResponse = await response.json();
    console.log(data);
    return data;
    
}