/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import React from "react";
import DesktopNavbar from "../../src/components/header/DesktopNavbar";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
    };
  },
}));

jest.spyOn(require("next/router"), "useRouter");

describe("Desktop Navbar Component", () => {
  useRouter.mockImplementation(() => ({
    useRouter() {
      return {
        route: "/",
        pathname: "",
        query: "",
        asPath: "",
        push: jest.fn(),
      };
    },
  }));
  it("Renders Nav Items Correctly", () => {
    render(<DesktopNavbar />);
    screen.getByRole("link", { name: "Markets" });
    screen.getByRole("link", { name: "Trending" });
    screen.getByRole("link", { name: "Compare" });
    screen.getByText("Log In");
    screen.getByText("Sign Up");
  });
});
