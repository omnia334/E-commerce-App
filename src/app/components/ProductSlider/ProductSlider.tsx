"use client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"

export default function ProductSlider({images, altContent} : {images:string[], altContent: string}) {
  return <>
  <Carousel opts={{
    loop: true
  }}  plugins={[
        Autoplay({
          delay: 1000,
        }),
      ]}>
  <CarouselContent>
    {images.map((img,index)=><CarouselItem key={index}>
        <Image src={img} className="w-full" alt={altContent} width={400} height={400}/>
    </CarouselItem>
)}
  </CarouselContent>
</Carousel>
  
  </>
}
