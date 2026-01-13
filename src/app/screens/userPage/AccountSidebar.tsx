import React from "react";
import { Box, List, ListItemButton, ListItemText, Divider, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLogout } from "../../hooks/useLogout";

interface AccountSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function AccountSidebar(props: AccountSidebarProps) {
  const { activeSection, onSectionChange } = props;
  const { handleLogout } = useLogout();

  const menuItems = [
    { id: "personal", label: "Personal Information", icon: <PersonIcon /> },
    { id: "orders", label: "My Orders", icon: <ShoppingBagIcon /> },
    { id: "address", label: "Manage Address", icon: <LocationOnIcon /> },
    { id: "payment", label: "Payment Method", icon: <PaymentIcon /> },
    { id: "password", label: "Password Manager", icon: <LockIcon /> },
  ];

  return (
    <Box className="account-sidebar">
      <List className="account-sidebar-list" disablePadding>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.id}
            className={`account-sidebar-item ${activeSection === item.id ? "active" : ""}`}
            onClick={() => onSectionChange(item.id)}
          >
            <Box className="account-sidebar-icon">{item.icon}</Box>
            <ListItemText
              primary={item.label}
              className="account-sidebar-text"
            />
          </ListItemButton>
        ))}
      </List>
      
      <Divider className="account-sidebar-divider" />
      
      <Box className="account-sidebar-logout">
        <Button
          className="account-logout-btn"
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
          fullWidth
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}
