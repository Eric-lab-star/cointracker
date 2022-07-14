import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getRecentPrice } from "./api";
import { OCHLC } from "./cointInterface";

const PriceGrid = styled.div`
  display: grid;
  font-size: 0.8rem;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  gap: 1rem;
  margin: 0.7rem 0;
  padding-bottom: 5px;
  border-bottom: 1px dashed ${(props) => props.theme.text};
  :last-child {
    border-bottom: none;
  }
`;

export default function CoinPrice() {
  const { id } = useParams();
  const { data: price, isLoading: isPrice } = useQuery<OCHLC[]>(
    ["Coin", "OHLC"],
    () => getRecentPrice(id)
  );

  return (
    <div>
      {isPrice ? (
        "Loading"
      ) : (
        <>
          <PriceGrid>
            <h1>Open</h1>
            <span>${price?.[0].open.toFixed(2)}</span>
          </PriceGrid>
          <PriceGrid>
            <h1>High</h1>
            <span>${price?.[0].high.toFixed(2)}</span>
          </PriceGrid>
          <PriceGrid>
            <h1>Low</h1>
            <span>${price?.[0].low.toFixed(2)}</span>
          </PriceGrid>
          <PriceGrid>
            <h1>Close</h1>
            <span>${price?.[0].close.toFixed(2)}</span>
          </PriceGrid>
        </>
      )}
    </div>
  );
}
