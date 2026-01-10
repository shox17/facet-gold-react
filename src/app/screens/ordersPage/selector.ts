import { createSelector } from "reselect";
import { AppRootState, OrdersPageState } from "../../../lib/types/screen";

export const retrievePausedOrders = createSelector(
  (state: AppRootState) => state.ordersPage,
  (ordersPage: OrdersPageState) => ordersPage.pausedOrders
);
export const retrieveProcessOrders = createSelector(
  (state: AppRootState) => state.ordersPage,
  (ordersPage: OrdersPageState) => ordersPage.processOrders
);
export const retrieveFinishedOrders = createSelector(
  (state: AppRootState) => state.ordersPage,
  (ordersPage: OrdersPageState) => ordersPage.finishedOrders
);
