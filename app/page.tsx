"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Container, Fab, TextField } from "@mui/material";
import { Product } from "./types/product";
import AddEditProductModal from "./components/AddEditProductModal";
import ProductTable from "./components/ProductTable";
import styles from "./page.module.css";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [scrumMasterFilter, setScrumMasterFilter] = useState('');
  const [developerFilter, setDeveloperFilter] = useState('');
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currEditProduct, setCurrEditProduct] = useState<Product | null>(null);

  const getProductsFromAPI = async (
    filterName?: string,
    filterValue?: string
  ) => {
    setIsLoading(true);
    let getProductsURL = "api/products";
    if (filterName && filterValue) {
      getProductsURL += `?${filterName}=${filterValue}`;
    }
    const res = await fetch(getProductsURL, {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    setIsLoading(false);
    setProducts(data.products);
  };

  useEffect(() => {
    getProductsFromAPI();
  }, []);

  const filterByScrumMaster = (e: ChangeEvent<HTMLInputElement>) => {
    setDeveloperFilter('');
    const newScrumMasterFilterValue = e.target.value;
    setScrumMasterFilter(newScrumMasterFilterValue);
    getProductsFromAPI("scrumMaster", newScrumMasterFilterValue);
  };

  const filterByDeveloper = (e: ChangeEvent<HTMLInputElement>) => {
    setScrumMasterFilter('');
    const newDevFilterValue = e.target.value;
    setDeveloperFilter(newDevFilterValue);
    getProductsFromAPI("developers", newDevFilterValue);
  };

  const openEditModal = () => {
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setCurrEditProduct(null);
    setEditModalIsOpen(false);
  };

  const editProduct = (editProduct: Product) => {
    setCurrEditProduct(editProduct);
    setEditModalIsOpen(true);
  };

  const updateProductInList = (updatedProduct: Product) => {
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
  };

  const addNewProductToList = (newProduct: Product) => {
    const updatedProducts = [newProduct, ...products];
    setProducts(updatedProducts);
  };

  return (
    <main className={styles.main}>
      <h1>ECC Product Database</h1>
      <Fab
        color="primary"
        aria-label="add"
        variant="extended"
        onClick={openEditModal}
      >
        Add New Product
      </Fab>
      <Container style={{ textAlign: 'center' }}>
        <TextField
          type="text"
          value={scrumMasterFilter}
          style={{ backgroundColor: "white" }}
          placeholder="Filter by scrum master"
          onChange={filterByScrumMaster}
        />
        <TextField
          type="text"
          value={developerFilter}
          style={{ backgroundColor: "white" }}
          placeholder="Filter by developer"
          onChange={filterByDeveloper}
        />
      </Container>
      {products.length > 0 ? (
        <>
          <h4 className={styles.results}>{products.length} products</h4>
          <ProductTable products={products} editProduct={editProduct} />
        </>
      ) : (
        <p>{isLoading ? 'Loading...' : 'No Results'}</p>
      )}
      <AddEditProductModal
        isOpen={editModalIsOpen}
        closeModal={closeEditModal}
        currEditProduct={currEditProduct}
        updateProductInList={updateProductInList}
        addNewProductToList={addNewProductToList}
      />
    </main>
  );
}
