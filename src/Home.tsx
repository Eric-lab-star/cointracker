import { Helmet, HelmetProvider } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { getCoins } from "./api";
import { Coin } from "./cointInterface";

const Image = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;

const Item = styled.li`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0.4rem;
  margin: 0.8rem 0;
  background-color: ${(props) => props.theme.accent};
  border-radius: 4px;
  :hover {
    background-color: ${(props) => props.theme.hoveredBg};
  }

  :hover {
    color: ${(props) => props.theme.hoveredText};
  }
  & > span {
    margin-left: 1rem;
    color: ${(props) => props.theme.text};
  }
`;

const Home = () => {
  const { data, isLoading } = useQuery<Coin[]>(["Coins, Assets"], getCoins);

  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>Home</title>
        </Helmet>
        {isLoading ? (
          "isLoading"
        ) : (
          <ul>
            {data?.slice(0, 100).map((v, i) => {
              return (
                <Link key={v.id} to={`/${v.id}`} state={v}>
                  <Item>
                    <Image
                      src={`https://coinicons-api.vercel.app/api/icon/${v.symbol.toLowerCase()}`}
                      alt="coinid"
                    />
                    <span>{v.name}</span>
                  </Item>
                </Link>
              );
            })}
          </ul>
        )}
      </div>
    </HelmetProvider>
  );
};

export default Home;
