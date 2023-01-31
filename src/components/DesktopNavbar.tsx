import { useContext, useEffect } from "react";
import { AiOutlinePieChart, AiOutlineUser } from "react-icons/ai";
import styled from "styled-components";
import { AuthContext } from "../contexts/AuthContext";
import { AuthIcon } from "./MobileNavbar";
import NavLink from "./NavLink";

//  Styles
const Nav = styled.nav`
  background: #ffffff;
  height: 4rem;
  display: flex;
  @media (max-width: 700px) {
    display: none;
  }
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

const Button = styled.button`
  color: white;
  border-radius: 0.5rem;
  font-weight: bold;
  background: linear-gradient(to bottom, #0063F5, #1E90FF);
  padding: 0.5rem;
  width: 5rem;
  border: none;
  cursor: pointer;
`;

//  Navbar Component
const DesktopNavbar = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <Nav>
      <MarketsUl>
        <Li>
          <NavLink href="/">
            <Span>Markets</Span>
          </NavLink>
        </Li>
        <Li>
          <NavLink href="/trending">
            <Span>Trending</Span>
          </NavLink>
        </Li>
        <Li>
          <NavLink href="/compare">
            <Span>Compare</Span>
          </NavLink>
        </Li>
      </MarketsUl>
      {user.isLoggedIn ? (
        <AuthUl>
          <Li>
            <NavLink href="/portfolio">
              <AuthIcon Icon={AiOutlinePieChart} />
              <Span>Portfolio</Span>
            </NavLink>
          </Li>
          <Li>
            <NavLink href="/profile">
              <AuthIcon Icon={AiOutlineUser} />
              <Span>Profile</Span>
            </NavLink>
          </Li>
        </AuthUl>
      ) : (
        <AuthUl>
          <Li>
            <NavLink href="/login">
              <Button>
                <Span>Log In</Span>
              </Button>
            </NavLink>
          </Li>
          <Li>
            <NavLink href="/signup">
              <Button>
                <Span>Sign Up</Span>
              </Button>
            </NavLink>
          </Li>
        </AuthUl>
      )}
    </Nav>
  );
};

export default DesktopNavbar;
