"use client"

import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {  Loader2 } from "lucide-react"
import toast from "react-hot-toast"
import { addAddress, deleteAddress, GetAddresses } from "../addresses/_action/address.action"
import { Address } from "@/interfaces/Address"



export default function ManageAddressesPage() {
    const [addresses, setAddresses] = useState<Address[]>([])
    const [loading, setLoading] = useState(false)
    const [details, setDetails] = useState("")
    const [city, setCity] = useState("")
    const [phone, setPhone] = useState("")
    const [adding, setAdding] = useState(false)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    async function fetchAddresses() {
        setLoading(true)
        const data = await GetAddresses()
        if (data.status === "success") setAddresses(data.data )
        setLoading(false)
    }

    useEffect(() => {
        fetchAddresses()
    }, [])

    async function addAddressUser()  {
        if (!details || !city || !phone) {
            toast.error("You must enter data")
            return
        }
        setAdding(true)
        const data = await addAddress({ details, city, phone })
        if (data.status === "success") {
            toast.success("Address Added ")
            setAddresses([...addresses, data.data])
            setDetails(""); setCity(""); setPhone("")
        } else {
            toast.error("Failed to add address")
        }
        setAdding(false)
    }

    async function deleteAddressUser (id: string) {
        setDeletingId(id)
        const data = await deleteAddress(id)
        if (data.status === "success") {
        toast.success("Address Removed ")
        setAddresses(addresses.filter((addr) => addr._id !== id))
    } else {
        toast.error("Failed to remove address")
    }
    setDeletingId(null)
    }

    return (
    <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-600"> Addreses</h1>

    <div className="flex flex-col gap-3 mb-6 max-w-md mx-auto">
        <Input placeholder="Address Details" value={details} onChange={(e) => setDetails(e.target.value)} />
        <Input placeholder="your city" value={city} onChange={(e) => setCity(e.target.value)} />
        <Input placeholder="your phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <Button onClick={addAddressUser} disabled={adding}>
        {adding ? <Loader2 className="animate-spin w-5 h-5" /> : "Address add"}
        </Button>
    </div>

    </div>
)
}
