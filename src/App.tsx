import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import CoinDetail from "./CoinDetail";
import CoinPrice from "./CoinPrice";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/:id" element={<CoinDetail />}>
            <Route path="price" element={<CoinPrice />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
