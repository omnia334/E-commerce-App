"use client"

import { orders } from "@/interfaces/Orders";
import { useEffect, useState } from "react";


export default function AllOrders() {

  const [orders, setOrders] = useState<orders[]>([]);

  async function getOrders() {
          const res = await fetch("https://ecommerce.routemisr.com/api/v1/orders/");
          const { data } = await res.json();
          setOrders(data);
          console.log(data)
        
      }
  useEffect(() => {
      getOrders();
    }, []);
  return (
<div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold text-center mb-5 text-green-600">
        All Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-muted-foreground">There are no orders</p>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-xl p-4 bg-card shadow-sm flex flex-col gap-3"
            >
              <p>
                <span className="font-semibold">User:</span> {order.user.name}
              </p>
              <p>
                <span className="font-semibold">Total Price:</span> ${order.totalOrderPrice.toFixed(2)}
              </p>
              <p>
                <span className="font-semibold">Paid:</span> {order.isPaid ? "✅" : "❌"}
              </p>
              <p>
                <span className="font-semibold">Delivered:</span> {order.isDelivered ? "✅" : "❌"}
              </p>
              <p>
                <span className="font-semibold">Created At:</span> {new Date(order.createdAt).toLocaleString()}
              </p>

              <div className="mt-2">
                <span className="font-semibold">Products:</span>
                <div className="flex flex-col gap-2 mt-1">
                  {order.cartItems.map((item) => (
                    <div key={item._id} className="flex items-center gap-2 border p-2 rounded-lg">
                      <img src={item.product.imageCover} alt={item.product.title} className="w-12 h-12 object-cover rounded" />
                      <div>
                        <p className="font-medium">{item.product.title}</p>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: {item.count}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      
          
        
      </div>
      )
}
