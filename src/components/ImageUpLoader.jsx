import React, { useState, useEffect } from "react";
import ImageUploader from "react-images-upload";
import firebase, { storage } from "../config/firebese";

const ImageUpLoader = () => {
  const [pictures, setPictures] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const onDrop = (pictureFiles) => {
    setPictures(pictureFiles[0]);
  };

  const makeUrl = () => {
    const uploadTask = storage.ref(`/pictures/${pictures.name}`).put(pictures);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      error,
      next,
      complete
    );
  };
  const complete = () => {
    storage
      .ref("pictures")
      .child(pictures.name)
      .getDownloadURL()
      .then((fireBaseUrl) => {
        setImageUrl(fireBaseUrl);
      })
      .catch((e) => console.log(e));
  };

  const next = (snapshot) => {
    const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(percent + "% done");
    console.log(snapshot);
  };

  const error = (err) => console.log(err);

  const createObjectURL =
    (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

  var binaryData = [];
  binaryData.push(pictures);
  const prevUrl = createObjectURL(
    new Blob(binaryData, { type: "application/zip" })
  );

  // const prevUrl = createObjectURL(pictures);
  // console.log(prevUrl);//何故か怒られる
  //Failed to execute 'createObjectURL' on 'URL': No function was found that matched the signature provided.

  console.log(pictures.length);

  return (
    <div style={{ width: "40%" }}>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "15px", width: "70%" }}>
          <ImageUploader
            withIcon={true}
            withPreview={false}
            label=""
            buttonText="画像アップロード"
            onChange={onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg"]}
            maxFileSize={1048576}
            fileSizeError=" file size is too big"
            singleImage={true}
          />
        </div>
        <img src={prevUrl} style={{ width: "30%" }} />
      </div>
      <button onClick={makeUrl}>決定</button>
    </div>
  );
};

export default ImageUpLoader;
