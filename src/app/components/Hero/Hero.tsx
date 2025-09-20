import Image from "next/image";

export default function Hero() {
  return (
    <section className="py-12">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative w-full h-[400px] overflow-hidden rounded-xl">
          <input
            type="radio"
            name="slide"
            id="slide1"
            className="hidden peer/slide1"
            defaultChecked
          />
          <input
            type="radio"
            name="slide"
            id="slide2"
            className="hidden peer/slide2"
          />

          <div className="absolute inset-0 transition-opacity duration-500 opacity-100 peer-checked/slide1:opacity-100 peer-checked/slide2:opacity-0">
            <Image
              src="/slider-image-3.jpeg"
              alt="Slide 1"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 transition-opacity duration-500 opacity-0 peer-checked/slide1:opacity-0 peer-checked/slide2:opacity-100">
            <Image
              src="/slider-image-2.jpeg"
              alt="Slide 2"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute bottom-4 w-full flex justify-center gap-3">
            <label
              htmlFor="slide1"
              className="w-3 h-3 rounded-full cursor-pointer bg-gray-400 peer-checked/slide1:bg-white"
            ></label>
            <label
              htmlFor="slide2"
              className="w-3 h-3 rounded-full cursor-pointer bg-gray-400 peer-checked/slide2:bg-white"
            ></label>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="relative h-[190px] rounded-xl overflow-hidden">
            <Image
              src="/slider-image-1.jpeg"
              alt="Static 1"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-[190px] rounded-xl overflow-hidden">
            <Image
              src="/slider-image-2.jpeg"
              alt="Static 2"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
