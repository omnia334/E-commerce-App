"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Brand } from "@/interfaces/Brand";



export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);

  async function getBrands() {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
        const { data } = await res.json();
        setBrands(data);
    }
  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold text-center mb-5 text-green-600">
        All Brands
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <Link
            key={brand._id}
            href={`/brands/${brand._id}`}
            className="border rounded-lg shadow-sm hover:shadow-md hover:shadow-green-700 transition flex flex-col items-center p-4 bg-white cursor-pointer"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-[100px] object-contain"
            />
            <h2 className="mt-3 text-lg font-semibold text-center">
              {brand.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
