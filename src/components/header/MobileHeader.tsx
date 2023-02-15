import { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";
import NavLink from "../NavLink";
import BrandingContainer from "./BrandingContainer";
import { Button } from "./DesktopNavbar";

const Header = styled.header`
  @media (min-width: 700px) {
    display: none;
  }
`;

const Logo = styled.img`
  width: auto;
  height: 4rem;
`;

const LinksContainer = styled.div`
  display: flex;
  padding: 0.5rem;
  & > div {
    display: flex;
    margin-left: auto;
    & > a {
      margin-left: 0.25rem;
    }
  }
`;

const MobileHeader = () => {
  const { user } = useContext(AuthContext);
  return (
    <Header>
      <LinksContainer>
        <NavLink href="/">
          <Logo alt="logo" src="/cryptocompare-logo.png" />
        </NavLink>
        {!user.isLoggedIn ? (
          <div>
            <NavLink href="/login">
              <Button>Log In</Button>
            </NavLink>
            <NavLink href="signup">
              <Button>Sign Up</Button>
            </NavLink>
          </div>
        ) : null}
      </LinksContainer>
      <BrandingContainer />
    </Header>
  );
};

export default MobileHeader;
