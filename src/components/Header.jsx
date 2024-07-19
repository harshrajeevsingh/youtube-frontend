import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Input,
  Button,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { Search } from "lucide-react";
import LogoutButton from "./ui/logoutbtn.jsx";
import Login from "./ui/loginbtn.jsx";
import UserDropDown from "./ui/userDropDown.jsx";
import { useUserStoreSelectors } from "../store/userSlice.js";
import { NavLink } from "react-router-dom";
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
              base: "w-full h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<Search />}
            type="search"
          />
        </div>
        <LogoutButton /> {/* Will remove this, just for testing purpose */}
      </NavbarContent>
      {user ? (
        <UserDropDown />
      ) : (
        <NavbarContent justify="end" className="md:px-10">
          <NavLink to="/signup">
            <Button className="bg-transparent border-1">Register</Button>
          </NavLink>
          <Login />
          <LogoutButton />
        </NavbarContent>
      )}
      {/* <NavbarContent justify="end" className="md:px-10">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="my_channel">My Channel</DropdownItem>
            <DropdownItem key="dashboard">Dashboard</DropdownItem>
            <DropdownItem key="settings">Settings</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent> */}
    </Navbar>
  );
}
