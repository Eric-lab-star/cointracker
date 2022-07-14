import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import CoinDetail from "./CoinDetail";
import CoinPrice from "./CoinPrice";
import CoinChart from "./CoinChart";
import Landing from "./Landing";
import CoinList from "./CoinList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<CoinList />}>
            <Route index element={<Landing />} />
            <Route path=":id" element={<CoinDetail />}>
              <Route path="price" element={<CoinPrice />} />
              <Route path="chart" element={<CoinChart />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
