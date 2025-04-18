import { useEffect, useMemo, useState } from "react";

export const useForm = (initialState = {}, formValidations = {}) => {
  const [formData, setFormData] = useState(initialState);
  const [formValidation, setFormValidation] = useState({});

  useEffect(() => {
    createValidators();
  }, [formData]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }

    return true;
  }, [formValidation]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const onResetForm = () => {
    setFormData(initialState);
  };

  const createValidators = () => {
    const formCheckedValues = {};

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage = "Error Validation"] =
        formValidations[formField];

      formCheckedValues[`${formField}Valid`] = fn(formData[formField])
        ? null
        : errorMessage;
    }

    setFormValidation(formCheckedValues);
  };

  return {
    formData,
    setFormData,
    onResetForm,
    handleChange,
    ...formValidation,
    isFormValid,
  };
};
