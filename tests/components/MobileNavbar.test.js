/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import React from "react";
import MobileNavbar from "../../src/components/header/MobileNavbar";

jest.mock("next/router", () => ({
    useRouter(){
        return {
            route: "/",
            pathname: "",
            query: "",
            asPath: "",
            push: jest.fn()
        }
    }
}))

jest.spyOn(require("next/router"), "useRouter");

describe("Mobile Navbar Component", () => {

    useRouter.mockImplementation(() => ({
        useRouter(){
            return {
                route: "/",
                pathname: "",
                query: "",
                asPath: "",
                push: jest.fn()
            }
        }
    }))
    it("Renders Nav Items Correctly", () => {
        render(<MobileNavbar />);
        screen.getByRole("link", { name: "Markets" })
        screen.getByRole("link", { name: "Trending" })
        screen.getByRole("link", { name: "Compare" })
    })
})