import { Injectable } from "@angular/core";

import { ORDERS_MOCK_DATA } from "./orders-mock"
import { Order } from "./order";
import { OrderStatus } from "./orderStatus";

@Injectable()
export class OrdersService {

  allOrders: Order[];

  constructor() {
    this.allOrders = new Array();
    for (let i = 0; i < ORDERS_MOCK_DATA.length; i++) {
      const order = new Order();
      order.id = ORDERS_MOCK_DATA[i].ID;
      order.date = ORDERS_MOCK_DATA[i].CreationDate;
      order.status = ORDERS_MOCK_DATA[i].Status;
      order.items = ORDERS_MOCK_DATA[i].Items;
      this.allOrders.push(order);
    }
  }

  getOrdersActive(): Order[] {
    const result = [];
    for (let i = 0; i < this.allOrders.length; i++) {
      if (this.allOrders[i].status === OrderStatus.Active) {
        result.push(this.allOrders[i]);
      }
    }
    return result;
  }

  getOrdersActiveById(idPattern: string): Order[] {
    const result = [];
    for (let i = 0; i < this.allOrders.length; i++) {
      if (this.allOrders[i].status === OrderStatus.Active && this.allOrders[i].id.indexOf(idPattern) >= 0) {
        result.push(this.allOrders[i]);
      }
    }
    return result;
  }

  getOrdersCompleted(): Order[] {
    const result = [];
    for (let i = 0; i < this.allOrders.length; i++) {
      if (this.allOrders[i].status === OrderStatus.Complete) {
        result.push(this.allOrders[i]);
      }
    }
    return result;
  }

  getOrdersIncompleted(): Order[] {
    const result = [];
    for (let i = 0; i < this.allOrders.length; i++) {
      if (this.allOrders[i].status === OrderStatus.Incomplete) {
        result.push(this.allOrders[i]);
      }
    }
    return result;
  }

  getOrdersAvailable(): Order[] {
    const result = [];
    for (let i = 0; i < this.allOrders.length; i++) {
      if (this.allOrders[i].status === OrderStatus.Available) {
        result.push(this.allOrders[i]);
      }
    }
    return result;
  }

  getOrder(searchOrderId: string): Order {
    for (let i = 0; i < this.allOrders.length; i++) {
      if (this.allOrders[i].id === searchOrderId) {
        return this.allOrders[i];
      }
    }
    return null;
  }

  deleteOrder(orderId: string) {
    for (let i = 0; i < this.allOrders.length; i++) {
      if (this.allOrders[i].id === orderId) {
        this.allOrders.splice(i, 1);
        break;
      }
    }
  }

  updateOrderStatus(orderId: string, newStatus: OrderStatus) {
    for (let i = 0; i < this.allOrders.length; i++) {
      if (this.allOrders[i].id === orderId) {
        this.allOrders[i].status = newStatus;
        break;
      }
    }
  }

}
