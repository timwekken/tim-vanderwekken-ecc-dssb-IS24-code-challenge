import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Modal, Box, Button, TextField } from "@mui/material";
import { Product } from "../types/product";

const EMPTY_NEW_PRODUCT = {
  name: "",
  scrumMaster: "",
  productOwner: "",
  developers: [],
  startDate: "",
  methodology: "",
  repoURL: "",
};

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: '8px',
  maxHeight: '100%',
  overflow: 'scroll'
};

interface ProductModalProps {
  isOpen: boolean;
  closeModal: () => void;
  currEditProduct: Product | null;
  updateProductInList: (product: Product) => void;
  addNewProductToList: (product: Product) => void;
}

export default function AddEditProductModal({
  isOpen,
  closeModal,
  currEditProduct,
  updateProductInList,
  addNewProductToList,
}: ProductModalProps) {
  const [formData, setFormData] = useState<Product>(EMPTY_NEW_PRODUCT);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeDevelopers = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.split(","),
    });
  };

  const handleSubmit = async (formData: Product) => {
    const res = await fetch(`/api/products/${formData.id ? "edit" : "add"}`, {
      method: formData.id ? "PUT" : "POST",
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      const { updatedProduct } = await res.json();
      if (currEditProduct) {
        updateProductInList(updatedProduct);
      } else {
        addNewProductToList(updatedProduct);
      }
      closeModal();
    } else {
      alert("Form submission failed");
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Validate the form fields here
    const isFormValid = Object.values(formData).every(
      (value) => value.toString().trim() !== ""
    );
    if (isFormValid) {
      handleSubmit(formData);
    } else {
      alert("Please fill in all fields.");
    }
  };

  useEffect(() => {
    setFormData(currEditProduct || EMPTY_NEW_PRODUCT);
  }, [currEditProduct]);

  return (
    <Modal open={isOpen} onClose={closeModal} aria-labelledby="Product Modal">
      <Box sx={boxStyle}>
        <h2>{formData.id ? "Edit" : "Add"} a Product</h2>
        <br />
        <form
          onSubmit={handleFormSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: '8px'
          }}
        >
          <TextField
            id="name"
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            id="scrumMaster"
            label="Scrum Master"
            name="scrumMaster"
            value={formData.scrumMaster}
            onChange={handleChange}
          />
          <TextField
            id="productOwner"
            label="Product Owner"
            name="productOwner"
            value={formData.productOwner}
            onChange={handleChange}
          />
          <TextField
            id="developers"
            label="Developers (comma seperated)"
            name="developers"
            value={formData.developers}
            onChange={handleChangeDevelopers}
          />
          <TextField
            id="startDate"
            label="Start Date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
          <TextField
            id="methodology"
            label="Methodology"
            name="methodology"
            value={formData.methodology}
            onChange={handleChange}
          />
          <TextField
            id="repoURL"
            label="Repository Location"
            name="repoURL"
            value={formData.repoURL}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained">
            Save
          </Button>
        </form>
        <Button onClick={closeModal} variant="outlined">
          Close
        </Button>
      </Box>
    </Modal>
  );
}
