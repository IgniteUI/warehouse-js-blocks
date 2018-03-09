import { Injectable } from "@angular/core";

import { ORDERS_MOCK_DATA } from "./orders-mock"
import { Order } from "./order";
import { OrderStatus } from "./orderStatus";

@Injectable()
export class OrdersService {

  constructor() {
  }

  getOrdersActive(): Order[] {
    let result = [];
    for (let i = 0; i < ORDERS_MOCK_DATA.length; i++) {
      let order = new Order();
      order.id = ORDERS_MOCK_DATA[i].ID;
      order.date = ORDERS_MOCK_DATA[i].CreationDate;
      order.status = ORDERS_MOCK_DATA[i].Status;
      order.items = ORDERS_MOCK_DATA[i].Items;
      result.push(order);
    }
    return result;
  }

  getOrdersActiveById(idPattern: string): Order[] {
    let result = [];
    for (let i = 0; i < ORDERS_MOCK_DATA.length; i++) {
      if (ORDERS_MOCK_DATA[i].Status == OrderStatus.Active && ORDERS_MOCK_DATA[i].ID.indexOf(idPattern) >= 0) {
        let order = new Order();
        order.id = ORDERS_MOCK_DATA[i].ID;
        order.date = ORDERS_MOCK_DATA[i].CreationDate;
        order.status = ORDERS_MOCK_DATA[i].Status;
        order.items = ORDERS_MOCK_DATA[i].Items;
        result.push(order);
      }
    }
    return result;
  }

  getOrdersCompleted(): Order[] {
    let result = [];
    for (let i = 0; i < ORDERS_MOCK_DATA.length; i++) {
      if (ORDERS_MOCK_DATA[i].Status == OrderStatus.Complete) {
        let order = new Order();
        order.id = ORDERS_MOCK_DATA[i].ID;
        order.date = ORDERS_MOCK_DATA[i].CreationDate;
        order.status = ORDERS_MOCK_DATA[i].Status;
        order.items = ORDERS_MOCK_DATA[i].Items;
        result.push(order);
      }
    }
    return result;
  }

  getOrdersIncompleted(): Order[] {
    let result = [];
    for (let i = 0; i < ORDERS_MOCK_DATA.length; i++) {
      if (ORDERS_MOCK_DATA[i].Status == OrderStatus.Incomplete) {
        let order = new Order();
        order.id = ORDERS_MOCK_DATA[i].ID;
        order.date = ORDERS_MOCK_DATA[i].CreationDate;
        order.status = ORDERS_MOCK_DATA[i].Status;
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
        order.status = ORDERS_MOCK_DATA[i].Status;
        order.items = ORDERS_MOCK_DATA[i].Items;
        return order;
      }
    }
    return null;
  }

}
