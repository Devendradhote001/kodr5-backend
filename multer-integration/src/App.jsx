import React from "react";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState(null);
  console.log(file);

  let formData = new FormData();

  let handleFileUpload = async () => {
    formData.append("image", file);
    formData.append("name", "hello");

    let res = await axios.post("http://localhost:3000/api/post", formData);
    console.log(res);
  };

  return (
    <div>
      <h1>Multer integration</h1>

      <input onChange={(e) => setFile(e.target.files[0])} type="file" />
      <button onClick={handleFileUpload}>Send</button>
    </div>
  );
};

export default App;
