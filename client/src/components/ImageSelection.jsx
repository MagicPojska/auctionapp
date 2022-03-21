import { useEffect, useState } from "react";

const ImageSelection = ({ images }) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    setImage(images[0]);
  }, [images]);

  return (
    <div className="w-1/2">
      <div className="mr-28 flex flex-col">
        <img src={image} className="object-cover aspect-[8/10]" alt="" />
        <div
          className={`h-24 w-full flex ${
            images.length === 5 ? "justify-between" : "space-x-10"
          } mt-5`}
        >
          {images.map((item, id) => (
            <img
              key={id}
              src={item}
              alt=""
              className="w-20 object-cover"
              onClick={() => setImage(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSelection;
