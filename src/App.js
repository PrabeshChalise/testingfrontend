import React from "react";
import "./App.css";
import Main from "./main";

import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import necessary components for v6
// import Product from "./Product";
import User from "./User";
import Worker from "./Worker";
import Setting from "./Setting";
import StockTable from "./StockTable";
import ProductForm from "./ProductForm";
import AddWorker from "./AddWorker";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="product" element={<StockTable />} />
        <Route path="/user" element={<User />} />
        <Route path="/worker" element={<Worker />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/add-stock" element={<ProductForm />} />
        <Route path="/add-worker" element={<AddWorker />} />
        {/* <Route path="/" element={<Main />} />
        <Route
          path="https://serofero.netlify.app/product"
          element={<StockTable />}
        />
        <Route path="https://serofero.netlify.app/user" element={<User />} />
        <Route
          path="https://serofero.netlify.app/worker"
          element={<Worker />}
        />
        <Route
          path="https://serofero.netlify.app/setting"
          element={<Setting />}
        />
        <Route
          path="https://serofero.netlify.app/add-stock"
          element={<ProductForm />}
        />
        <Route
          path="https://serofero.netlify.app/add-worker"
          element={<AddWorker />}
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
