import { Member } from "./member";
import { Order } from "./order";
import { Product } from "./product";

/** REACT APP STATE **/
export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductsPageState;
  ordersPage: OrdersPageState;
}

/** HOME PAGE **/
export interface HomePageState {
  popularProducts: Product[];
  newProducts: Product[];
  topUsers: Member[];
}

/** PRODUCTS PAGE **/
export interface ProductsPageState {
  jewelleryShop: Member | null;
  chosenProduct: Product | null;
  products: Product[];
}

/** ORDER PAGE **/
export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}
