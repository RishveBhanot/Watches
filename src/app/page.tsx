import Hero from "@/components/Hero";
import ProductsList from "@/components/ProductsList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#F8F9FA]">
      <Hero/>
      <h2 className="w-full text-center text-2xl md:text-4xl font-semibold py-6">
        All Products
      </h2>
      <ProductsList/>
    </div>
  );
}
