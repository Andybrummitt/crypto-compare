import { useContext } from "react";
import { AiOutlinePieChart, AiOutlineUser } from "react-icons/ai";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";
import NavLinkWithActive from "../NavLinkWithActive";
import { AuthIcon } from "./MobileNavbar";

//  Styles
const Nav = styled.nav`
  background: #ffffff;
  height: 4rem;
  display: flex;
`;

const LinksContainer = styled.div`
  display: flex;
`;

const MarketsUl = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.25rem;
  flex: 3;
`;

const AuthUl = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.25rem;
  flex: 1;
`;

const Li = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 0.5rem;
`;

const Span = styled.span`
  color: inherit;
  font-size: 0.8rem;
  @media (min-width: 700px) {
    font-size: 1rem;
  }
`;

export const Button = styled.button`
  color: white;
  border-radius: 0.5rem;
  font-weight: bold;
  background: linear-gradient(to bottom, #0063f5, #1e90ff);
  padding: 0.5rem;
  width: 5rem;
  border: none;
  cursor: pointer;
`;

//  Navbar Component
const DesktopNavbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <Nav>
      <MarketsUl>
        <Li>
          <NavLinkWithActive href="/">
            <Span>Markets</Span>
          </NavLinkWithActive>
        </Li>
        <Li>
          <NavLinkWithActive href="/trending">
            <Span>Trending</Span>
          </NavLinkWithActive>
        </Li>
        <Li>
          <NavLinkWithActive href="/compare">
            <Span>Compare</Span>
          </NavLinkWithActive>
        </Li>
      </MarketsUl>
      {user.isLoggedIn ? (
        <AuthUl>
          <Li>
            <NavLinkWithActive href="/portfolio">
              <AuthIcon Icon={AiOutlinePieChart} />
              <Span>Portfolio</Span>
            </NavLinkWithActive>
          </Li>
          <Li>
            <NavLinkWithActive href="/profile">
              <AuthIcon Icon={AiOutlineUser} />
              <Span>Profile</Span>
            </NavLinkWithActive>
          </Li>
        </AuthUl>
      ) : (
        <AuthUl>
          <Li>
            <NavLinkWithActive href="/login">
              <Button>
                <Span role="button">Log In</Span>
              </Button>
            </NavLinkWithActive>
          </Li>
          <Li>
            <NavLinkWithActive href="/signup">
              <Button>
                <Span role="button">Sign Up</Span>
              </Button>
            </NavLinkWithActive>
          </Li>
        </AuthUl>
      )}
    </Nav>
  );
};

export default DesktopNavbar;
