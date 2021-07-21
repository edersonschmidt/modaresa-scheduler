import React, { useState } from "react";
import {
  Nav,
  Navbar as Navigation,
  NavLink,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  Collapse,
  NavbarText,
} from "reactstrap";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Navigation color="light" light expand="md">
      <NavbarBrand href="/scheduler">Scheduler</NavbarBrand>
      <NavbarToggler
        onClick={() => {
          setOpen((prevState) => !prevState);
        }}
      />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/staffs">Staffs</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/clients">Clients</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navigation>
  );
};
export default Navbar;
