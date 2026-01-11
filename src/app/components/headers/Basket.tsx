import React from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
  const { cartItems } = props;
  const history = useHistory();

  /** HANDLERS **/
  const handleClick = () => {
    // Navigate to cart page instead of opening dropdown
    history.push("/cart");
  };

  return (
      <IconButton
        aria-label="cart"
        onClick={handleClick}
      className={"hover-line"}
      >
        <Badge badgeContent={cartItems.length} color="secondary">
        <img src={"/icons/shopping-cart.svg"} alt="Shopping Cart" />
        </Badge>
      </IconButton>
  );
}
