import { Params } from "next/dist/server/request/params";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Product } from "@/interfaces/product";
import { Brand } from "@/interfaces/Brand";


export default async function BrandDetails({params}: {params: Params;}) {
  const { brandId } = params;

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`
  );
  const { data: brand }: { data: Brand } = await res.json();

  const productsRes = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`
  );
  const { data: products }: { data: Product[] } = await productsRes.json();

  return (
    <div className="container mx-auto py-6 space-y-8">
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-green-700">
            {brand.name}
          </CardTitle>
          <CardDescription className="text-lg">{brand.slug}</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-6 mt-4">
          <Image
            src={brand.image}
            alt={brand.name}
            width={300}
            height={200}
            className="object-contain rounded-lg"
          />

          {/* Back Button */}
          <Link href="/brands">
            <Button className="bg-gray-700 text-white text-lg px-6 py-2 rounded-lg">
              ← Back to Brands
            </Button>
          </Link>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Products by {brand.name}
        </h2>
        {products.length === 0 ? (
          <p className="text-gray-600">No products found for this brand.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product._id}`}
                className="border rounded-lg shadow-sm hover:shadow-md transition p-4 bg-white flex flex-col items-center"
              >
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  width={200}
                  height={150}
                  className="object-contain h-[150px]"
                />
                <h3 className="mt-3 text-lg font-semibold text-center">
                  {product.title.split(" ", 3).join(" ")}
                </h3>
                <p className="text-green-700 font-bold mt-2">
                  {product.price} EGP
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
