import React, { useContext, useEffect } from "react";
import { IconContext } from "react-icons";
import { AiFillFire, AiOutlinePieChart, AiOutlineUser } from "react-icons/ai";
import { MdCompareArrows } from "react-icons/md";
import { VscGraphLine } from "react-icons/vsc";
import styled from "styled-components";
import { AuthContext } from "../contexts/AuthContext";
import NavLink from "./NavLink";

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

  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <Nav>
      <Ul>
        <Li>
          <NavLink href="/">
            <AuthIcon Icon={VscGraphLine} />
            <Span>Markets</Span>
          </NavLink>
        </Li>
        <Li>
          <NavLink href="/trending">
            <AuthIcon Icon={AiFillFire} />
            <Span>Trending</Span>
          </NavLink>
        </Li>
        <Li>
          <NavLink href="/compare">
            <AuthIcon Icon={MdCompareArrows} />
            <Span>Compare</Span>
          </NavLink>
        </Li>
        {user.isLoggedIn && (
          <>
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
          </>
        )}
      </Ul>
    </Nav>
  );
};

export default MobileNavbar;
