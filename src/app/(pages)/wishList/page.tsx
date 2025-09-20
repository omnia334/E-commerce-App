"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Trash2, Loader2} from 'lucide-react'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { Product } from '@/interfaces/product'
import { getWishlist, removeFromWishlist } from './_action/addToWishlist.action'
import { useRouter } from 'next/navigation'



export default function WishlistPage() {
  const session = useSession()
  const [wishlist, setWishlist] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [removingId, setRemovingId] = useState<string | null>(null)
  const router = useRouter()
  
  console.log(session)
  async function GetAllWishlist(){
    setLoading(true)
    const data = await getWishlist()
    if (data.status === 'success') setWishlist(data.data || [])
    setLoading(false)
  }

  async function handleRemove(productId: string) {
    if (!session.data) return
    setRemovingId(productId)
    const data = await removeFromWishlist(productId)
    if (data.status === 'success') {
      toast.success("it has been Removed sucessfully")
      setWishlist((prev) => prev.filter((item) => item._id !== productId))
    } else {
      toast.error(data.message)
    }
    setRemovingId(null)
  }

  

  useEffect(() => {
    GetAllWishlist()
  }, [session.status])

  if (session.status === 'loading' || loading)
    return <Loader2 className="animate-spin m-auto" size={40} />

  if (session.status !== 'authenticated'){
    router.push('/login')
  }

  return (
    <div className="container mx-auto px-4 py-6">

      {wishlist.length === 0 ? 
      <div className='min-h-[60vh] flex justify-center items-center flex-col'>
       <h2 className='text-2xl mb-3'>Your WishList Is Empty</h2>
  </div> : 
  <div className='container mx-auto px-4 py-6'>
      <h1 className='text-3xl font-bold tracking-tight'>My wish List</h1>  
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start mt-6'>
        <div className='lg:col-span-2 space-y-4'>
          {wishlist.map((item)=>
            <div key={item._id} className='flex gap-4 rounded-xl border p-4 shadow-sm bg-card'>
            <img src={item.imageCover} alt={item.title} className='w-24 h-24 rounded-lg object-cover md:w-28 md:h-28'/>
  
            <div className='flex-1 min-w-0'>
              <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2'>
                <div className='min-w-0'>
                  <h3 className='font-semibold text-base md:text-lg line-clamp-2'>{item.title}</h3>
                  <p className="text-sm mb-2 font-semibold">${item.price}</p>
                    <Button
                onClick={() => handleRemove(item._id)}
                className="text-destructive  hover:bg-white bg-white mt-2 ms-auto  cursor-pointer"
                disabled={removingId === item._id}
              >
                {removingId === item._id ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Remove
              </Button>
                </div>
      
              </div>
            </div>
          </div>)}
        </div>

      </div>
    </div>
    }
    </div>
  )
}
