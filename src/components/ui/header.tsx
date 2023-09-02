import React from "react";

import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";

import { AcmeLogo } from "./acme_logo.jsx";

export default function Header() {
  return (
    <Navbar>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <AcmeLogo />
          <p className=" font-bold text-inherit">Administration</p>
        </NavbarBrand>
      </NavbarContent>
    </Navbar>
  );
}
