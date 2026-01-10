import React, { ReactNode, useState } from "react";
import Cookies from "universal-cookie";
import { Member } from "../../lib/types/member";
import { GlobalContext } from "../hooks/useGlobals";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cookies = new Cookies();
  if (!cookies.get("access_token")) localStorage.removeItem("itemData");

  const [authMember, setAuthMember] = useState<Member | null>(
    localStorage.getItem("memberData")
      ? JSON.parse(localStorage.getItem("memberData") as string)
      : null
  );

  const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());
  console.log("=== verify ===");

  return (
    <GlobalContext.Provider
      value={{ authMember, setAuthMember, orderBuilder, setOrderBuilder /** basket: useBasket() */}}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
