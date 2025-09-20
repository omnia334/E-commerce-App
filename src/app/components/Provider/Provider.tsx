"use client"
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'
import Navbar from "@/app/components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import CartContextProvider from '../Context/CartContext';

export default function Provider({children}:{children : ReactNode}) {
  return (
    <SessionProvider>
        <CartContextProvider>
        <Navbar/>
        <div className="container mx-auto py-4">
          <Toaster/>
        {children}

        </div>
        </CartContextProvider>
    </SessionProvider>
  )
}
