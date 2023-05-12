import { createContext, ReactNode, useState } from "react";
import axios from "../../utils";

interface childrenIFace {
  children: ReactNode;
}

interface imageContextIFace {
  image: string;
  setImage: any;
  uploadImageLoading: boolean;
  setUploadImageLoading: any;
  uploadImageSuccess: boolean;
  setUploadImageSuccess: any;
  uploadImage: () => void;
  removeImage: () => void;
  removeImageLoading: boolean;
  setRemoveImageLoading: any;
  removeImageSuccess: boolean;
  setRemoveImageSuccess: any;
  addedProfImage: string;
  setAddedProfImage: any;
}

export const ImageContext = createContext({} as imageContextIFace);

const ImageProvider = ({ children }: childrenIFace) => {
  const [image, setImage] = useState("");
  const [addedProfImage, setAddedProfImage] = useState("");

  const [uploadImageLoading, setUploadImageLoading] = useState(false);
  const [uploadImageSuccess, setUploadImageSuccess] = useState(false);

  const [removeImageLoading, setRemoveImageLoading] = useState(false);
  const [removeImageSuccess, setRemoveImageSuccess] = useState(false);

  const uploadImage = async () => {
    setUploadImageLoading(true);
    setUploadImageSuccess(false);

    try {
      const { data } = await axios.post("/api/users/profile/upload_prof_img", {
        image,
      });

      if (data) {
        setUploadImageLoading(false);
        setUploadImageSuccess(true);
        setAddedProfImage(data.addedImage);
      }
    } catch (error) {
      setUploadImageLoading(false);
      console.log(error);
    }
  };

  const removeImage = async () => {
    setRemoveImageLoading(true);
    setRemoveImageSuccess(false);

    try {
      const { data } = await axios.put(
        "/api/users/profile/remove_prof_img",
        {}
      );

      if (data) {
        setRemoveImageLoading(false);
        setRemoveImageSuccess(true);
      }
    } catch (error) {
      setRemoveImageLoading(false);
      console.log(error);
    }
  };

  const contextData = {
    image,
    setImage,
    uploadImageLoading,
    setUploadImageLoading,
    uploadImageSuccess,
    setUploadImageSuccess,
    uploadImage,
    removeImage,
    removeImageLoading,
    setRemoveImageLoading,
    removeImageSuccess,
    setRemoveImageSuccess,
    addedProfImage,
    setAddedProfImage,
  };

  return (
    <ImageContext.Provider value={contextData}>
      {children}
    </ImageContext.Provider>
  );
};

export default ImageProvider;
