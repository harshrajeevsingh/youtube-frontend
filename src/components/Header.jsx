import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Input,
  Button,
} from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { Search } from "lucide-react";

import { AcmeLogo } from "./AcmeLogo.jsx";
import Login from "./ui/loginbtn.jsx";
import UserDropDown from "./ui/userDropDown.jsx";
import { useUserStoreSelectors } from "../store/userSlice.js";

export default function Header() {
  const user = useUserStoreSelectors.use.user();

  return (
    <Navbar isBordered maxWidth="full">
      <NavbarContent justify="start" className="md:px-10">
        <NavbarBrand className="md:mr-4">
          <AcmeLogo />
          <p className="hidden sm:block font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="flex-1 justify-center">
        <div className="w-full max-w-full md:px-4 ">
          <Input
            classNames={{
              base: "w-full h-10 drop-shadow-lg",
              mainWrapper: "h-full",
              input:
                "text-small placeholder:text-slate-600 dark:placeholder:text-gray-400",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 ",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<Search />}
            type="search"
            radius="full"
          />
        </div>
      </NavbarContent>
      {user ? (
        <UserDropDown />
      ) : (
        <NavbarContent justify="end" className="md:px-10">
          <NavLink to="/signup">
            <Button radius="full" variant="faded">
              Register
            </Button>
          </NavLink>
          <Login />
        </NavbarContent>
      )}
    </Navbar>
  );
}
