import axios from "axios";

export const uploadImage = (imageData) =>
  axios.post(
    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_USERNAME}/image/upload`,
    imageData
  );
