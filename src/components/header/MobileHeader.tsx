import styled from "styled-components";
import NavLink from "../NavLink";
import BrandingContainer from "./BrandingContainer";
import { Button } from "./DesktopNavbar";

const Header = styled.header`
  @media (min-width: 700px) {
    display: none;
  }
`;

const Logo = styled.h2`
  font-weight: bold;
  font-size: 1rem;
  color: black;
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
  return (
    <Header>
      <LinksContainer>
        <NavLink href="/">
          <Logo>CryptoCompare</Logo>
        </NavLink>
        <div>
          <NavLink href="/login">
            <Button>Log In</Button>
          </NavLink>
          <NavLink href="signup">
            <Button>Sign Up</Button>
          </NavLink>
        </div>
      </LinksContainer>
      <BrandingContainer />
    </Header>
  );
};

export default MobileHeader;
