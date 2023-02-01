import React from "react";
import DesktopHeader from "./header/DesktopHeader";
import MobileHeader from "./header/MobileHeader";
import MobileNavbar from "./header/MobileNavbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {/* Display at mobile width */}
      <MobileHeader />
      <MobileNavbar />
      {/* Display at desktop/tablet width */}
      <DesktopHeader />
      <main>{children}</main>
    </>
  );
};

export default Layout;
