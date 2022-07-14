import { Helmet, HelmetProvider } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

import { getCoins } from "./api";
import { Coin } from "./cointInterface";

const Image = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;

const List = styled.ul`
  max-height: 50vh;
  overflow-y: scroll;
  border-radius: 7px;
  font-family: liebedoris, sans-serif;
  letter-spacing: 0.14rem;
  font-weight: 700;
  box-shadow: 3px 3px 4px ${(props) => props.theme.hoveredBg};
`;

const Item = styled.li`
  padding: 0.4rem;
  margin-bottom: 0.8rem;
  background-color: ${(props) => props.theme.accent};
  border-radius: 4px;
  :last-child {
    margin-bottom: 0;
  }
  :hover {
    background-color: ${(props) => props.theme.hoveredBg};
    color: ${(props) => props.theme.hoveredText};
  }
  & > a {
    display: flex;
    align-items: center;
    span {
      margin-left: 1rem;
    }
  }
`;

const CoinList = () => {
  const { data, isLoading } = useQuery<Coin[]>(["Coins, Assets"], getCoins);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Outlet />
      {isLoading ? (
        "isLoading"
      ) : (
        <List>
          {data?.slice(0, 100).map((v, i) => {
            return (
              <Item key={v.id}>
                <Link to={`/${v.id}`}>
                  <Image
                    src={`https://coinicons-api.vercel.app/api/icon/${v.symbol.toLowerCase()}`}
                    alt="coinid"
                  />
                  <span>{v.name}</span>
                </Link>
              </Item>
            );
          })}
        </List>
      )}
    </HelmetProvider>
  );
};

export default CoinList;
