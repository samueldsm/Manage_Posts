import { Link } from "@nextui-org/link";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";

import { AcmeLogo } from "../icons/acme_logo.jsx";

export default function Header() {
  return (
    <Navbar>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Link href="/" color="foreground">
            <AcmeLogo />
            <p className=" font-bold text-inherit">Administration</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
    </Navbar>
  );
}
