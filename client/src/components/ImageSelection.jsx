const ImageSelection = ({ image, images, setImage }) => {
  return (
    <div className="w-1/2">
      <div className="mr-28 flex flex-col">
        <img src={image} className="object-cover aspect-[7/9]" alt="" />
        <div className="h-24 w-full flex justify-between">
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
