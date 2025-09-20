"use client"

import React, { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { GetAddresses } from "../addresses/_action/address.action"
import { Address } from "@/interfaces/Address"



export default function AddressesPage() {
    const [addresses, setAddresses] = useState<Address[]>([])
    const [loading, setLoading] = useState(false)

    async function fetchAddresses() {
    setLoading(true)
    const data = await GetAddresses()
    if (data.status === "success") setAddresses(data.data || [])
    setLoading(false)
    }

    useEffect(() => {
    fetchAddresses()
    }, [])

    return (
    <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-600">All Addresses</h1>

        {loading ? (
        <Loader2 className="animate-spin m-auto" size={40} />
        ) : addresses.length !== 0 ? (
            <div className="flex flex-col gap-4 max-w-md mx-auto">
            {addresses.map((addr) => (
            <div key={addr._id} className="border p-3 rounded-lg bg-card">
                <p>{addr.name}</p>
                <p>{addr.details}</p>
                <p>{addr.city}</p>
                <p>{addr.phone}</p>
            </div>
            ))}
        </div>
        ) : (
            <p className="text-center text-muted-foreground">There ara no Address </p>

        )}
    </div>
    )
}
