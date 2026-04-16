import { useRef, useState } from "react";
import axios from "axios"; // 1. Don't forget to import axios


const Photo = () => {
  const fileref = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
   
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile); 

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
        
        
      });
        const message = response.data.message;
    alert(message);
    
    } catch (error) {
      console.error("Upload error:", error);
      
    }
    
  };

  return (
    <div style={{ backgroundColor: "black", color: "white", minHeight: "100vh", padding: "20px" }}>
      <h1>This photopage will be Updated soon</h1>

      <input
        type="file"
        id="file"
       
        onChange={handleChange} 
      />

      <button onClick={handleSubmit}>Submit</button>
<div className="show">
  
</div>
    </div>
  );
};

export default Photo;