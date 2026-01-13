import { useState } from "react";
import { useHistory } from "react-router-dom";
import MemberService from "../services/MemberService";
import { sweetTopSuccessAlert } from "../../lib/sweetAlert";
import { useGlobals } from "./useGlobals";

export const useLogout = () => {
  const history = useHistory();
  const { setAuthMember } = useGlobals();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const member = new MemberService();
      await member.logout();
      await sweetTopSuccessAlert("Logged out successfully", 700);
      setAuthMember(null);
      history.push("/");
    } catch (err) {
      console.log("Error, logout:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return { handleLogout, isLoggingOut };
};
