import React from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <MobileNavbar />
      <DesktopNavbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
