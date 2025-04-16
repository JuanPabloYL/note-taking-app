import { useState } from "react";

const init = {
  name: "",
  email: "",
  password: "",
};

export const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(id);
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted form:", formData);
    // You can now send `formData` to Firebase or another API
  };

  return { formData, setFormData, handleChange, handleSubmit };
};
