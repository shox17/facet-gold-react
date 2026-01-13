import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";

export default function OrdersRedirect() {
  const history = useHistory();
  const location = useLocation();
  const { authMember } = useGlobals();

  useEffect(() => {
    // Redirect to home if not authenticated
    if (!authMember) {
      history.replace("/");
      return;
    }

    // Handle query parameter compatibility
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get("tab");

    if (tab === "process" || tab === "2") {
      history.replace("/orders/process");
    } else if (tab === "finished" || tab === "3") {
      history.replace("/orders/finished");
    } else if (tab === "paused" || tab === "1") {
      history.replace("/orders/paused");
    } else {
      // Default to paused orders
      history.replace("/orders/paused");
    }
  }, [history, location, authMember]);

  return null;
}
