import React, { useState } from "react";

function ImageUploadForm() {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          console.log(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form>
      <input
        type="file"
        accept="image/*"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleImageChange(e)
        }
      />
    </form>
  );
}

export default ImageUploadForm;
