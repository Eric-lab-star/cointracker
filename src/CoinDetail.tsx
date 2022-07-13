import { config } from "dotenv";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import { getCoin, getRecentPrice } from "./api";
import { Coin, Detail, OCHLC } from "./cointInterface";

const CoinDetail = () => {
  const { id } = useParams();
  const state = useLocation().state as Coin | undefined;

  const { data: coin, isLoading: isCoin } = useQuery<Detail>(
    ["Coin", "Detail"],
    () => getCoin(id)
  );
  const { data: price, isLoading: isPrice } = useQuery<OCHLC>(
    ["Coin", "OHLC"],
    () => getRecentPrice(id)
  );
  return (
    <div>
      <div>
        <h1>{state ? state.name : isCoin ? "Loading" : coin?.name}</h1>
        <div>
          <div>
            <span>Symbol</span>
            <span>
              {state ? state.symbol : isCoin ? "Loading" : coin?.symbol}
            </span>
          </div>
          <div>
            <span>Rank</span>
            <span>{state ? state.rank : isCoin ? "Loading" : coin?.rank}</span>
          </div>
          <div>
            <span>Type</span>
            <span>{state ? state.type : isCoin ? "Loading" : coin?.type}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetail;
