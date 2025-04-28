"use client"

import Link from "next/link";
import React, { ChangeEvent } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {

  const router = useRouter();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", e.target.value);
    
    const searchQuery = urlParams.toString();
    
    router.push(`/search?${searchQuery}`);
  }
  return (
    <nav className="px-4 md:px-12 py-4 md:py-6 bg-white text-black">
      <div className="flex justify-between items-center">
        <Link
          href={"/"}
          className="hidden md:inline-block text-lg font-semibold"
        >
          RWatches
        </Link>
        <div className="relative max-w-[300px] md:w-[400px]">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Search className="size-4" />
          </div>

          <input
            type="text"
            onChange={handleChange}
            className="h-[36px] relative pl-10 border-[1px] border-black/[0.7] text-sm rounded-[8px] w-full py-2 px-3 focus:outline-none bg-transparent"
            placeholder="Search"
          />
        </div>
        <Link href={"/add-product"}>
          <Button className="cursor-pointer">Add Product</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
