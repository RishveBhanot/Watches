"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Product {
  _id: string;
  image: string;
  name: string;
  price: number;
}

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("/api/fetch-products").then((response) => setProducts(response.data.products));
  }, []);

  return (
    <div id="product" className="px-4 md:px-12 py-5">
      <div className="flex overflow-x-auto space-x-6 h-96">
        {products.map((product: Product) => (
          <div
            key={product._id}
            className="flex-none w-64 aspect-[4/3] rounded-lg overflow-hidden"
          >
            <Link href={`/product/${product._id}`} className="block">
              <Image
                src={product.image}
                alt="img"
                width={1000}
                height={1000}
                className="w-full h-72 object-cover object-center rounded-lg"
              />
              <div className="mt-4">
                <h2 className="font-semibold">{product.name}</h2>
                <p className="font-medium text-sm mt-1">${product.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
