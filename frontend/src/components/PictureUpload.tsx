import axios from "axios";
import { useState } from "react";

export const PictureUpload = ({ imgUrl, setImgUrl }: any) => {
  const [file, setFile] = useState<File>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (file) {
      const url = "http://localhost:8000/upload";
      const formData = new FormData();
      formData.append("file", file, file.name);

      try {
        const response = await axios.post(url, formData);
        return setImgUrl(response.data.filename);
      } catch (err) {
        return console.log("error", err);
      }
    }
    return alert("Select a file");
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>Téleversement de l'Image</h1>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <button type="submit">Téléverser</button>
        {imgUrl ? (
          <img width="500px" src={imgUrl} alt="image téléversée" />
        ) : null}
      </form>
    </>
  );
};
