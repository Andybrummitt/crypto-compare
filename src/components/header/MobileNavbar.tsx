import React, { useContext } from "react";
import { IconContext } from "react-icons";
import { AiFillFire, AiOutlinePieChart, AiOutlineUser } from "react-icons/ai";
import { MdCompareArrows } from "react-icons/md";
import { VscGraphLine } from "react-icons/vsc";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";
import NavLinkWithActive from "../NavLinkWithActive";

//  Styles
const Nav = styled.nav`
  background: #ffffff;
  position: fixed;
  bottom: 0;
  height: 4rem;
  width: 100%;
  @media (min-width: 700px) {
    display: none;
  }
  border-top: 1px solid var(--grey-border-color);
`;

const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem;
`;

const Li = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Span = styled.span`
  color: inherit;
  font-size: 0.8rem;
`;

//  Auth Icon Component
interface Props {
  Icon: React.ElementType;
}

export const AuthIcon: React.FC<Props> = ({ Icon }) => {
  return (
    <IconContext.Provider value={{ color: "inherit", size: "2rem" }}>
      <Icon />
    </IconContext.Provider>
  );
};

//  Navbar Component
const MobileNavbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <Nav>
      <Ul>
        <Li>
          <NavLinkWithActive href="/">
            <AuthIcon Icon={VscGraphLine} />
            <Span>Markets</Span>
          </NavLinkWithActive>
        </Li>
        <Li>
          <NavLinkWithActive href="/trending">
            <AuthIcon Icon={AiFillFire} />
            <Span>Trending</Span>
          </NavLinkWithActive>
        </Li>
        <Li>
          <NavLinkWithActive href="/compare">
            <AuthIcon Icon={MdCompareArrows} />
            <Span>Compare</Span>
          </NavLinkWithActive>
        </Li>
        {user.isLoggedIn && (
          <>
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
          </>
        )}
      </Ul>
    </Nav>
  );
};

export default MobileNavbar;
