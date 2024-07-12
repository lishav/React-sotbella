import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductFetch from "./Api/Products";
import Product from "./Pages/ProductPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductFetch />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </Router>
  );
};

export default App;
