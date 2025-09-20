import { CategoryI } from "@/interfaces/category";


export default async function Categories() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
  const { data: categories }: { data: CategoryI[] } = await res.json();

  return (
    <div className="container mx-auto py-5">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
        All Categories
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="border rounded-md shadow-sm hover:shadow-md hover:shadow-green-700 transition p-2 flex flex-col items-center bg-white"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-[250px] object-cover rounded-md"
            />
            <h2 className="text-green-700 font-semibold text-lg mt-4">
              {cat.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
