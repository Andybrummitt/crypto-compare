import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const StyledLink = styled.a`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #6c757d;
  &.active {
    font-weight: bold;
    color: var(--primary);
  }
`;

const NavLinkWithActive = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const className = router.pathname === href ? "active" : "";

  return (
    <Link href={href} passHref legacyBehavior>
      <StyledLink className={className}>{children}</StyledLink>
    </Link>
  );
};

export default NavLinkWithActive;
