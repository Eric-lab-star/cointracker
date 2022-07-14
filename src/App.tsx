import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import CoinDetail from "./CoinDetail";
import CoinPrice from "./CoinPrice";
import CoinChart from "./CoinChart";
import Landing from "./Landing";
import CoinList from "./CoinList";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";

const Button = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  border-radius: 50%;
  border-style: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.theme.block};
  color: white;
`;

function App() {
  const [isclicked, setClick] = useState(false);
  const onClick = () => {
    setClick((pre) => (pre = !pre));
  };
  return (
    <ThemeProvider theme={isclicked ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Button onClick={onClick}>
          {isclicked ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          )}
        </Button>
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
    </ThemeProvider>
  );
}

export default App;
