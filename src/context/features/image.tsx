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
  uploadImage: (route: string, id: string) => void;
  removeImage: (route: string, id: string) => void;
  removeImageLoading: boolean;
  setRemoveImageLoading: any;
  removeImageSuccess: boolean;
  setRemoveImageSuccess: any;
  addedImage: string;
  setAddedImage: any;
}

export const ImageContext = createContext({} as imageContextIFace);

const ImageProvider = ({ children }: childrenIFace) => {
  const [image, setImage] = useState("");
  const [addedImage, setAddedImage] = useState("");

  const [uploadImageLoading, setUploadImageLoading] = useState(false);
  const [uploadImageSuccess, setUploadImageSuccess] = useState(false);

  const [removeImageLoading, setRemoveImageLoading] = useState(false);
  const [removeImageSuccess, setRemoveImageSuccess] = useState(false);

  const uploadImage = async (route: string, id: string) => {
    setUploadImageLoading(true);
    setUploadImageSuccess(false);

    try {
      const { data } = await axios.put(`/api/${route}/upload_img`, {
        image,
        id,
      });

      if (data) {
        setUploadImageLoading(false);
        setUploadImageSuccess(true);
        setAddedImage(data.addedImage);
      }
    } catch (error) {
      setUploadImageLoading(false);
      console.log(error);
    }
  };

  const removeImage = async (route: string, id: string) => {
    setRemoveImageLoading(true);
    setRemoveImageSuccess(false);

    try {
      const { data } = await axios.put(`/api/${route}/remove_img`, { id });

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
    addedImage,
    setAddedImage,
  };

  return (
    <ImageContext.Provider value={contextData}>
      {children}
    </ImageContext.Provider>
  );
};

export default ImageProvider;
