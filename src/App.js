import React from "react";
import "./App.css";
import ProductFetch from "./Api/Products";

function App() {
  return (
    <div className="App">
      <h1>Sotbella</h1>
      <ProductFetch />
    </div>
  );
}

export default App;
