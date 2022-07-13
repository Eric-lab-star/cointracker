import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { getCoin, getRecentPrice } from "./api";
import { Coin, Detail, OCHLC } from "./cointInterface";
import { DateTime } from "luxon";

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  font-weight: 700;
  margin: 0.6rem 0 1rem 0;
  color: ${(props) => props.theme.mainText};
`;

const TopBar = styled.div`
  margin-top: 0.7rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.4rem;
`;

const TopBadge = styled.div`
  box-shadow: 1px 1px 3px gray;
  font-size: 0.8rem;
  background-color: ${(props) => props.theme.accent};
  color: ${(props) => props.theme.text};
  border-radius: 3px;
  padding: 0.2rem;
  display: flex;
  justify-content: center;
  :last-child {
    grid-column: span 2;
  }

  span:first-child {
    margin-right: 4px;
  }
`;

const Description = styled.div`
  color: ${(props) => props.theme.mainText};
  font-size: 0.9rem;
  margin-top: 1.7rem;
  & > h1 {
    font-size: 1rem;
    font-weight: 600;
  }
`;

const DateBar = styled.div`
  color: ${(props) => props.theme.mainText};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
  h1 {
    font-size: 0.9rem;
    font-weight: 700;
  }
  p {
    font-size: 0.8rem;
  }
  & > div:first-child {
    margin-right: 3rem;
  }
`;

const Official = styled.div`
  font-size: 0.8rem;
  margin-top: 0.4rem;
  a {
    color: ${(props) => props.theme.mainText};
  }
  a:hover {
    color: ${(props) => props.theme.hoveredText};
  }
`;

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
        <Title>{state ? state.name : isCoin ? "Loading" : coin?.name}</Title>
        <TopBar>
          <TopBadge>
            <span>Symbol:</span>
            <span>
              {state ? state.symbol : isCoin ? "Loading" : coin?.symbol}
            </span>
          </TopBadge>
          <TopBadge>
            <span>Rank:</span>
            <span>{state ? state.rank : isCoin ? "Loading" : coin?.rank}</span>
          </TopBadge>
          <TopBadge>
            <span>Type:</span>
            <span>{state ? state.type : isCoin ? "Loading" : coin?.type}</span>
          </TopBadge>
          <TopBadge>
            <span>Open:</span>
            <span>
              {isCoin ? "Loading" : coin?.open_source ? "True" : "False"}
            </span>
          </TopBadge>
          <TopBadge>
            <span>Wallet:</span>
            <span>
              {isCoin ? "Loading" : coin?.hardware_wallet ? "True" : "False"}
            </span>
          </TopBadge>
          <TopBadge>
            <span>Active:</span>
            <span>
              {isCoin ? "Loading" : coin?.is_active ? "True" : "False"}
            </span>
          </TopBadge>
          <TopBadge>
            <span>Hash:</span>
            <span>
              {isCoin
                ? "Loading"
                : coin?.hash_algorithm
                ? coin?.hash_algorithm
                : null}
            </span>
          </TopBadge>
        </TopBar>

        <Description>
          <h1>Coin Description</h1>
          <p>{isCoin ? "Loading" : coin?.description}</p>
        </Description>
        <DateBar>
          <div>
            <h1>First Data at</h1>
            <p>
              {isCoin
                ? "Loading"
                : DateTime.fromISO(coin?.first_data_at as string).toFormat(
                    "yyyy - MM - dd"
                  )}
            </p>
          </div>
          <div>
            <h1>Last Data at</h1>
            <p>
              {isCoin
                ? "Loading"
                : DateTime.fromISO(coin?.last_data_at as string).toFormat(
                    "yyyy - MM - dd"
                  )}
            </p>
          </div>
        </DateBar>
        <Official>
          website: <a href={`${coin?.links.website}`}>{coin?.links.website}</a>
        </Official>
        <Official>
          Youtube: <a href={`${coin?.links.youtube}`}>{coin?.links.youtube}</a>
        </Official>
      </div>
    </div>
  );
};

export default CoinDetail;
