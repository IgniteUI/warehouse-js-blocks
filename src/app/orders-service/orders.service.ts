import { Injectable } from "@angular/core";

import { ORDERS_MOCK_DATA } from "./orders-mock"
import { Order } from "./order";

@Injectable()
export class OrdersService {

  constructor() {
  }

  getOrdersAll(): Order[] {
    let result = [];
    for (let i = 0; i < ORDERS_MOCK_DATA.length; i++) {
      let order = new Order();
      order.id = ORDERS_MOCK_DATA[i].ID;
      order.date = ORDERS_MOCK_DATA[i].CreationDate;
      order.progress = ORDERS_MOCK_DATA[i].Progress;
      order.completed = ORDERS_MOCK_DATA[i].IsCompleted;
      result.push(order);
    }
    return result;
  }

  getOrdersById(idPattern: string): Order[] {
    let result = [];
    for (let i = 0; i < ORDERS_MOCK_DATA.length; i++) {
      if (ORDERS_MOCK_DATA[i].ID.indexOf(idPattern) >= 0) {
        let order = new Order();
        order.id = ORDERS_MOCK_DATA[i].ID;
        order.date = ORDERS_MOCK_DATA[i].CreationDate;
        order.progress = ORDERS_MOCK_DATA[i].Progress;
        order.completed = ORDERS_MOCK_DATA[i].IsCompleted;
        order.items = ORDERS_MOCK_DATA[i].Items;
        result.push(order);
      }
    }
    return result;
  }

  getOrdersCompleted(): Order[] {
    let result = [];
    for (let i = 0; i < ORDERS_MOCK_DATA.length; i++) {
      if (ORDERS_MOCK_DATA[i].IsCompleted) {
        let order = new Order();
        order.id = ORDERS_MOCK_DATA[i].ID;
        order.date = ORDERS_MOCK_DATA[i].CreationDate;
        order.progress = ORDERS_MOCK_DATA[i].Progress;
        order.completed = ORDERS_MOCK_DATA[i].IsCompleted;
        order.items = ORDERS_MOCK_DATA[i].Items;
        result.push(order);
      }
    }
    return result;
  }

  getOrdersIncompleted(): Order[] {
    let result = [];
    for (let i = 0; i < ORDERS_MOCK_DATA.length; i++) {
      if (!ORDERS_MOCK_DATA[i].IsCompleted) {
        let order = new Order();
        order.id = ORDERS_MOCK_DATA[i].ID;
        order.date = ORDERS_MOCK_DATA[i].CreationDate;
        order.progress = ORDERS_MOCK_DATA[i].Progress;
        order.completed = ORDERS_MOCK_DATA[i].IsCompleted;
        order.items = ORDERS_MOCK_DATA[i].Items;
        result.push(order);
      }
    }
    return result;
  }

  getOrder(searchOrderId: string): Order {
    for (let i = 0; i < ORDERS_MOCK_DATA.length; i++) {
      if (ORDERS_MOCK_DATA[i].ID == searchOrderId) {
        let order = new Order();
        order.id = ORDERS_MOCK_DATA[i].ID;
        order.date = ORDERS_MOCK_DATA[i].CreationDate;
        order.progress = ORDERS_MOCK_DATA[i].Progress;
        order.completed = ORDERS_MOCK_DATA[i].IsCompleted;
        order.items = ORDERS_MOCK_DATA[i].Items;
        return order;
      }
    }
    return null;
    
  }

}
