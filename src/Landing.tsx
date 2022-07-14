import styled from "styled-components";

const Description = styled.div`
  color: ${(props) => props.theme.text};
  & > p {
    margin-bottom: 1rem;
    font-size: small;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 3rem;
  font-weight: 500;
  margin-bottom: 1.2rem;
  font-family: ohm-bold, sans-serif;
  color: ${(props) => props.theme.text};
`;

export default function Landing() {
  return (
    <div>
      <Title>Wow Coins</Title>
      <Description>
        <p>
          Click the coins from the below list to get all the information you
          need.
        </p>
        <p>
          This List provides you recent coin ranking, OHLC price, and beautiful
          chart for free!
        </p>
        <p>scroll down the list for more coins! 100 coins are ready!</p>
        <p>Click the price or chart tab for more information</p>
      </Description>
    </div>
  );
}
