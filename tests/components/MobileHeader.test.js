/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import React from "react";
import MobileHeader from "../../src/components/header/MobileHeader";

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

describe("Desktop Header Component", () => {
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
    render(<MobileHeader />);
    screen.getByRole("button", { name: "Log In" });
    screen.getByRole("button", { name: "Sign Up" });
  });
});
