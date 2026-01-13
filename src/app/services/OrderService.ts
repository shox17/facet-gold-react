import axios from "axios";
import { serverApi } from "../../lib/config";
import { Order, OrderInquiry, OrderItemInput, OrderUpdateInput } from "../../lib/types/order";
import { CartItem } from "../../lib/types/search";

class OrderService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async createOrder(input: CartItem[]): Promise<Order> {
    try {
      const orderItems: OrderItemInput[] = input.map((cartItem: CartItem) => {
        return {
          itemQuantity: cartItem.quantity,
          itemPrice: cartItem.price,
          productId: cartItem._id,
        };
      });

      const url = `${this.path}/order/create`;
      const result = await axios.post(url, orderItems, {
        withCredentials: true,
      });
      console.log("createOrder:", result);

      return result.data;
    } catch (err) {
      console.log("Error. createOrder:", err);
      throw err;
    }
  }

  public async getMyOrders(input: OrderInquiry): Promise<Order[]> {
    try {
      // axios.defaults.withCredentials = true;
      const url = `${this.path}/order/all`;
      const query = `?page=${input.page}&limit=${input.limit}&orderStatus=${input.orderStatus}`;

      const result = await axios.get(url + query, { withCredentials: true });
      console.log("getMyOrders:", result);

      return result.data;
    } catch (err) {
      console.log("Error. getMyOrders:", err);
      throw err;
    }
  }

  public async updateOrder(input: OrderUpdateInput): Promise<Order> {
    try {
      const url = `${this.path}/order/update`;
      const result = await axios.post(url, input, { withCredentials: true });
      console.log("updateOrder:", result);

      return result.data;
    } catch (err) {
      console.log("Error. updateOrder:", err);
      throw err;
    }
  }

  public async getOrder(orderId: string): Promise<Order | null> {
    try {
      // Fetch from all order statuses to find the order
      const allStatuses = await Promise.all([
        this.getMyOrders({ page: 1, limit: 100, orderStatus: "PAUSE" as any }),
        this.getMyOrders({ page: 1, limit: 100, orderStatus: "PROCESS" as any }),
        this.getMyOrders({ page: 1, limit: 100, orderStatus: "FINISH" as any }),
      ]);
      
      const allOrders = allStatuses.flat();
      const order = allOrders.find((o: Order) => o._id === orderId);
      
      return order || null;
    } catch (err) {
      console.log("Error. getOrder:", err);
      return null;
    }
  }
}
export default OrderService;
