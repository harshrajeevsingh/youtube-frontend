import {
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@nextui-org/react";

import { Upload, MonitorUp, PencilLine } from "lucide-react";
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
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly variant="light">
            <MonitorUp strokeWidth={1} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
          <DropdownItem
            key="new"
            startContent={<Upload strokeWidth={1} size={20} />}
          >
            Upload Video
          </DropdownItem>
          <DropdownItem
            key="copy"
            startContent={<PencilLine strokeWidth={1} size={20} />}
          >
            Create Post
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

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
