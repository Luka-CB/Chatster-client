import DummyProfilePic from "../assets/images/dummy-profile-pic.png";
import { AiOutlineCloseCircle } from "react-icons/ai";
import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../context/features/states";
import { ImageContext } from "../context/features/image";

interface propsIFace {
  avatar: string | undefined;
  id?: string;
  route: string;
}

const UploadImage: React.FC<propsIFace> = ({ avatar, route, id = "" }) => {
  const {
    image,
    setImage,
    uploadImageLoading,
    uploadImageSuccess,
    setUploadImageSuccess,
    uploadImage,
    removeImage,
    removeImageLoading,
    removeImageSuccess,
    setAddedImage,
    addedImage,
    setRemoveImageSuccess,
  } = useContext(ImageContext);
  const { setShowUploadImage } = useContext(StateContext);

  const handleFileInput = (file: any) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleShowUploadImage = () => {
    setShowUploadImage(false);
    setImage("");
  };

  useEffect(() => {
    if (uploadImageSuccess) {
      setUploadImageSuccess(false);
      handleShowUploadImage();
    }
  }, [uploadImageSuccess]);

  useEffect(() => {
    if (removeImageSuccess) {
      setRemoveImageSuccess(false);
      setAddedImage("");
      setImage("");
    }
  }, [removeImageSuccess]);

  return (
    <div className="upload-image-bg" onClick={handleShowUploadImage}>
      <div
        className="upload-image-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="close-btn" onClick={handleShowUploadImage}>
          <AiOutlineCloseCircle id="close-icon" />
        </div>
        <div className="preview-image">
          <div className="image">
            {addedImage ? (
              <img src={addedImage} alt="Preview Image" />
            ) : image ? (
              <img src={image} alt="Preview Image" />
            ) : avatar ? (
              <img src={avatar} alt="Avatar" />
            ) : (
              <img src={DummyProfilePic} alt="Dummy Image" />
            )}
          </div>
        </div>
        <div className="upload-image">
          <input
            type="file"
            accept="image/*"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              e.target.files !== null && handleFileInput(e.target.files[0])
            }
          />
        </div>
        <div className="btns">
          <button
            id="upload-btn"
            disabled={!image || uploadImageLoading || removeImageLoading}
            onClick={() => uploadImage(route, id)}
          >
            {uploadImageLoading ? "Uploading..." : "Upload Image"}
          </button>
          <button
            id="remove-btn"
            disabled={!avatar || uploadImageLoading || removeImageLoading}
            onClick={() => removeImage(route, id)}
          >
            {removeImageLoading ? "Removing..." : "Remove Image"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
