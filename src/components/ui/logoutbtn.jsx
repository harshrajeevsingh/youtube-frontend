import { Button } from "@nextui-org/react";
import { useLogoutUser } from "../../api/authApi";

const LogoutButton = () => {
  const logoutMutation = useLogoutUser();
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  return (
    <Button onClick={handleLogout} disabled={logoutMutation.isPending}>
      Logout
    </Button>
  );
};

export default LogoutButton;
