"use client";

import { Button } from "@heroui/button";
import { useRef, useState } from "react";
import Image from "next/image";

interface ImagePickerProps {
  label?: string;
  name?: string;
}

const ImagePicker: React.FC<ImagePickerProps> = ({
  label = "Pick an image",
  name = "image",
}) => {
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const imageInput = useRef<HTMLInputElement>(null);

  const handleImagePick = () => {
    imageInput.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        setPickedImage(fileReader.result);
      } else {
        setPickedImage(null);
      }
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-left gap-2">
        <div className="w-40 h-40 relative flex items-center justify-center bg-gray-100 rounded border border-gray-300 overflow-hidden">
          {pickedImage ? (
            <Image
              alt="The image selected by the user"
              src={pickedImage}
              fill
              className="object-cover"
            />
          ) : (
            <span className="text-gray-400 text-center px-2">
              No image picked
            </span>
          )}
        </div>
        <Button type="button" color="secondary" onPress={handleImagePick}>
          {label}
        </Button>
        <input
          type="file"
          accept="image/png, image/jpeg"
          id={name}
          name={name}
          className="hidden"
          ref={imageInput}
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
};

export default ImagePicker;
