import { useQuery } from "react-query";
import { Link, Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import { getCoin } from "./api";
import { Detail } from "./cointInterface";
import { DateTime } from "luxon";

const Title = styled.h1`
  font-size: 2rem;
  letter-spacing: 0.2rem;
  text-align: center;
  font-weight: 700;
  margin: 0.6rem 0 1rem 0;
  font-family: liebedoris, sans-serif;
`;

const TopBar = styled.div`
  margin-top: 0.7rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.4rem;
`;

const TopBadge = styled.div`
  letter-spacing: 0.1rem;
  font-family: liebedoris, sans-serif;
  box-shadow: 1px 1px 3px gray;
  font-size: 1rem;
  font-weight: 700;
  background-color: ${(props) => props.theme.accent};
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
  background-color: ${(props) => props.theme.accent};
  border-radius: 5px;
  font-size: 0.8rem;
  margin-top: 1.7rem;
  max-height: 10.3rem;
  overflow-y: scroll;
  padding: 1rem;

  & > h1 {
    font-size: 1rem;
    margin-bottom: 0.3rem;
    font-weight: 700;
  }
`;

const DateBar = styled.div`
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
  a:hover {
    color: ${(props) => props.theme.hoveredText};
  }
`;

const MoreInfo = styled.div`
  font-family: liebedoris, sans-serif;
  letter-spacing: 0.2rem;
  font-weight: 700;
  margin: 1rem 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  & > a {
    box-shadow: 2px 2px 2px gray;
    cursor: pointer;
    padding: 0.3rem 0.4rem;
    border-radius: 4px;
    color: ${(props) => props.theme.text};
    background-color: ${(props) => props.theme.accent};
    :hover {
      background-color: ${(props) => props.theme.hoveredBg};
      color: ${(props) => props.theme.text};
    }
  }
`;
const CoinDetail = () => {
  const { id } = useParams();
  const { data: coin, isLoading: isCoin } = useQuery<Detail>(["Coin", id], () =>
    getCoin(id)
  );

  return (
    <div>
      {isCoin ? (
        `Loading ${id} Data..`
      ) : (
        <div>
          <Title>{coin?.name || "No result"}</Title>
          <TopBar>
            <TopBadge>
              <span>Symbol:</span>
              <span>{coin?.symbol || "No result"}</span>
            </TopBadge>
            <TopBadge>
              <span>Rank:</span>
              <span>{coin?.rank || "No result"}</span>
            </TopBadge>
            <TopBadge>
              <span>Type:</span>
              <span>{coin?.type || "No result"}</span>
            </TopBadge>
            <TopBadge>
              <span>Open:</span>
              <span>{coin?.open_source ? "True" : "False"}</span>
            </TopBadge>
            <TopBadge>
              <span>Wallet:</span>
              <span>{coin?.hardware_wallet ? "True" : "False"}</span>
            </TopBadge>
            <TopBadge>
              <span>Active:</span>
              <span>{coin?.is_active ? "True" : "False"}</span>
            </TopBadge>
            <TopBadge>
              <span>Hash:</span>
              <span>{coin?.hash_algorithm || "No Result"}</span>
            </TopBadge>
          </TopBar>
          <Description>
            <h1>Coin Description</h1>
            <p>{coin?.description || "Description not found"}</p>
          </Description>
          <DateBar>
            <div>
              <h1>First Data at</h1>
              <p>
                {coin?.first_data_at
                  ? DateTime.fromISO(coin?.first_data_at as string).toFormat(
                      "yyyy - MM - dd"
                    )
                  : "No result"}
              </p>
            </div>
            <div>
              <h1>Last Data at</h1>
              <p>
                {coin?.last_data_at
                  ? DateTime.fromISO(coin?.last_data_at as string).toFormat(
                      "yyyy - MM - dd"
                    )
                  : "No result"}
              </p>
            </div>
          </DateBar>
          <Official>
            website:{" "}
            <a href={`${coin?.links.website || ""}`}>
              {coin?.links.website || "Link not found"}
            </a>
          </Official>
          <Official>
            Youtube:{" "}
            <a href={`${coin?.links.youtube?.[0] || ""}`}>
              {coin?.links.youtube?.[0] || "Link not found"}
            </a>
          </Official>
        </div>
      )}

      <MoreInfo>
        <Link to={"price"}>Price</Link>
        <Link to={"chart"} state={coin?.symbol}>
          Chart
        </Link>
      </MoreInfo>
      <Outlet />
    </div>
  );
};

export default CoinDetail;
