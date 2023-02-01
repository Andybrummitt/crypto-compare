import React from "react";
import styled from "styled-components";
import DesktopHeader from "./header/DesktopHeader";
import MobileHeader from "./header/MobileHeader";
import MobileNavbar from "./header/MobileNavbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Main = styled.main`
  flex: 1;
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      {/* Display at mobile width */}
      <MobileHeader />
      {/* Display at desktop/tablet width */}
      <DesktopHeader />
      <Main>{children}</Main>
      {/* Display at mobile width */}
      <MobileNavbar />
    </Container>
  );
};

export default Layout;
