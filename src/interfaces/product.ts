import { CategoryI } from "./category"

export interface Product {
  sold: number
  images: string[]
  subcategory: CategoryI[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: CategoryI
  brand: CategoryI
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
}

export interface Subcategory {
  _id: string
  name: string
  slug: string
  category: string
}



export interface Brand {
  _id: string
  name: string
  slug: string
  image: string
}
