import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import { useHistory } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";
import AccountPanelHeader from "./AccountPanelHeader";
import AccountSidebar from "./AccountSidebar";
import PersonalInformationPanel from "./PersonalInformationPanel";
import MyOrdersPanel from "./MyOrdersPanel";
import ManageAddressPanel from "./ManageAddressPanel";
import PaymentMethodPanel from "./PaymentMethodPanel";
import PasswordManagerPanel from "./PasswordManagerPanel";
import "../../../css/userPage.css";

export default function UserPage() {
  const history = useHistory();
  const { authMember } = useGlobals();
  const [activeSection, setActiveSection] = useState("personal");

  if (!authMember) {
    history.push("/");
    return null;
  }

  const renderPanel = () => {
    switch (activeSection) {
      case "personal":
        return <PersonalInformationPanel />;
      case "orders":
        return <MyOrdersPanel />;
      case "address":
        return <ManageAddressPanel />;
      case "payment":
        return <PaymentMethodPanel />;
      case "password":
        return <PasswordManagerPanel />;
      default:
        return <PersonalInformationPanel />;
    }
  };

  return (
    <div className="user-page">
      <AccountPanelHeader />
      
      <Container className="user-page-container" maxWidth="lg">
        <Grid container spacing={4} className="user-page-grid">
          {/* Left Sidebar */}
          <Grid item xs={12} md={3}>
            <AccountSidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </Grid>

          {/* Right Content Area */}
          <Grid item xs={12} md={9}>
            <Box className="user-content-area">
              {renderPanel()}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
