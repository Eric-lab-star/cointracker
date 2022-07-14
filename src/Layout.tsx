import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
`;
const NavBar = styled.div`
  box-shadow: 2px 2px 3px gray;
  box-sizing: border-box;
  display: grid;
  width: 20rem;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  font-size: 1.2rem;
  background-color: ${(props) => props.theme.block};
  padding: 0.5rem;
  border-radius: 5px;
  margin-bottom: 1rem;
`;
const Icon = styled.div`
  height: 3rem;
  margin-right: 12px;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  :hover {
    cursor: pointer;
    span {
      color: ${(props) => props.theme.hoveredText};
    }
    svg {
      color: ${(props) => props.theme.hoveredBg};
    }
  }
  svg {
    padding: 4px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.accent};
    color: ${(props) => props.theme.text};
    box-shadow: 1px 1px 3px gray;
  }
  span {
    color: ${(props) => props.theme.text};
    font-size: 0.7rem;
    margin-top: 0.3rem;
  }
`;
const Page = styled.div`
  box-shadow: 2px 2px 3px gray;
  background-color: ${(props) => props.theme.block};
  box-sizing: border-box;
  border-radius: 0.4rem;
  padding: 1rem 1.4rem;
  max-width: 20rem;
  margin-bottom: 1rem;
`;
const Layout = () => {
  const nav = useNavigate();
  return (
    <Container>
      <NavBar>
        <Icon onClick={() => nav(-1)}>
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
              d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
            />
          </svg>
          <span>Back</span>
        </Icon>

        <Link to={"/"}>
          <Icon>
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span>Home</span>
          </Icon>
        </Link>
        <Link to={"/"}>
          <Icon onClick={() => nav(1)}>
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
                d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Next</span>
          </Icon>
        </Link>
      </NavBar>
      <Page>
        <Outlet />
      </Page>
    </Container>
  );
};

export default Layout;
