import {
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";

import { useLogoutUser } from "../../api/authApi";
import { useUserStoreSelectors } from "../../store/userSlice";

const UserDropDown = () => {
  const user = useUserStoreSelectors.use.user();
  const logoutMutation = useLogoutUser();
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  return (
    <NavbarContent justify="end" className="md:px-10">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="default"
            name={user.fullName}
            size="md"
            src={user.avatar.url}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user.email}</p>
          </DropdownItem>
          <DropdownItem key="my_channel">My Channel</DropdownItem>
          <DropdownItem key="dashboard">Dashboard</DropdownItem>
          <DropdownItem key="settings">Settings</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            onClick={handleLogout}
            isReadOnly={logoutMutation.isPending}
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  );
};

export default UserDropDown;
