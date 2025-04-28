import { NextRequest } from "next/server";
import { connectDB } from "../db/connectDB";
import Product from "../models/productModels";

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const searchTerm = searchParams.get("searchTerm");

    const products = await Product.find({
        $or: [
            {name: { $regex: searchTerm, $options: "i" }},
            {description: {$regex: searchTerm, $options: "i"}}
        ]
    
    }).sort({ createdAt: -1 });
    // searchTerm = "watch"
    // Matches: "Smart Watch", "WATCH", "apple watch"

    // -1 means descending order

    // It means the newest products (latest createdAt) will come first

    return Response.json({ products }, { status: 200 });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 400 });
  }
};
