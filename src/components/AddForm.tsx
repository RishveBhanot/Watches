"use client";

import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { addAction } from "../../utils/addAction";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import Image from "next/image";

const AddForm = () => {
  const router = useRouter();

  //   useState<...>(): This is a generic form of the useState hook. You're explicitly telling TypeScript what type of value this state will hold.

  // <string | undefined>: This means the state can be either a string (like a URL) or undefined (no image selected yet).
  const [imageURL, setImageURL] = useState<string | undefined>();
  const clientAddAction = async (formData: FormData) => {
    const image = formData.get("image");
    console.log("image from FormData:", image);
    const { error, success } = await addAction(formData);
    if (error) {
      toast.error(error);
    }

    if (success) {
      toast.success(success);

      router.push("/");

      setImageURL("");
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileSize = file.size;

      if (Math.round(fileSize / 1024) > 1024) {
        toast.error("Image greater than 1 mb is not allowed.");
      } else {
        setImageURL(URL.createObjectURL(file));
      }
    }
  };

  return (
    <form
      action={clientAddAction}
      className="w-full max-w-xl mx-auto flex flex-col justify-center"
    >
      {imageURL && (
        <Image
          src={imageURL}
          alt="img"
          width={1000}
          height={1000}
          className="max-w-full max-h-72 object-cover object-center rounded-lg"
        />
      )}
      <div>
        <label>Product Image:</label>
        <Input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleImageChange}
        />
      </div>

      <div>
        <label>Name:</label>
        <Input type="text" name="name" placeholder="Enter the product name" />
      </div>

      <div>
        <label>Price:</label>
        <Input type="number" name="price" />
      </div>

      <div>
        <label>Seller's Link:</label>
        <Input
          type="text"
          name="link"
          placeholder="Link to where buyers can find you"
        />
      </div>

      <div>
        <label>Description:</label>
        <Textarea
          name="description"
          placeholder="Enter the product description"
          rows={4}
        />
      </div>

      <Button type="submit">Add Product</Button>
    </form>
  );
};

export default AddForm;
