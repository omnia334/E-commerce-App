"use server"
import { getUserToken } from "@/app/Helpers/getUserToken"



export async function GetAddresses() {
    const token = await getUserToken()
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
        headers: {
          token:token + '',
        },
      })
      const data = await res.json();
      return data
    
  }

export async function addAddress({ details, city, phone }:{details:string,city:string,phone:string}) {
        const token = await getUserToken()
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
        method: "POST",
        headers: {
        token:token + '',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ details, city, phone }),
      })
      const data = await res.json()
      return data
      

  }

export async function deleteAddress (id: string) {
            const token = await getUserToken()
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`, {
        method: "DELETE",
        headers: {
        token:token + '',
        },
      })
      const data = await res.json();
      return data
      
  }