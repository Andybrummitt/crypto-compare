import styled from "styled-components";
import NavLink from "../NavLink";
import BrandingContainer from "./BrandingContainer";
import DesktopNavbar from "./DesktopNavbar";

const Header = styled.header`
  display: none;
  @media (min-width: 700px) {
    display: block;
  }
`;

const Logo = styled.img`
  width: auto;
  height: 3rem;
`;

const LogoAndBrandingContainer = styled.div`
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  background: var(--red);
`;

const DesktopHeader = () => {
  return (
    <Header>
      <LogoAndBrandingContainer>
        <NavLink href={"/"}>
          <Logo alt="logo" src="/cryptocompare-logo-white.png" />
        </NavLink>
        <BrandingContainer />
      </LogoAndBrandingContainer>
      <DesktopNavbar />
    </Header>
  );
};

export default DesktopHeader;
