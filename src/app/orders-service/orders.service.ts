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
      order.id = ORDERS_MOCK_DATA[i].id;
      order.date = ORDERS_MOCK_DATA[i].date;
      order.progress = ORDERS_MOCK_DATA[i].progress;
      order.completed = ORDERS_MOCK_DATA[i].completed;
      result.push(order);
    }
    return result;
  }

  getOrdersById(idPattern: string): Order[] {
    let result = [];
    for (let i = 0; i < ORDERS_MOCK_DATA.length; i++) {
      if (ORDERS_MOCK_DATA[i].id.indexOf(idPattern) >= 0) {
        let order = new Order();
        order.id = ORDERS_MOCK_DATA[i].id;
        order.date = ORDERS_MOCK_DATA[i].date;
        order.progress = ORDERS_MOCK_DATA[i].progress;
        order.completed = ORDERS_MOCK_DATA[i].completed;
        result.push(order);
      }
    }
    return result;
  }

  getOrdersCompleted(): Order[] {
    let result = [];
    for (let i = 0; i < ORDERS_MOCK_DATA.length; i++) {
      if (ORDERS_MOCK_DATA[i].completed) {
        let order = new Order();
        order.id = ORDERS_MOCK_DATA[i].id;
        order.date = ORDERS_MOCK_DATA[i].date;
        order.progress = ORDERS_MOCK_DATA[i].progress;
        order.completed = ORDERS_MOCK_DATA[i].completed;
        result.push(order);
      }
    }
    return result;
  }

  getOrdersIncompleted(): Order[] {
    let result = [];
    for (let i = 0; i < ORDERS_MOCK_DATA.length; i++) {
      if (!ORDERS_MOCK_DATA[i].completed) {
        let order = new Order();
        order.id = ORDERS_MOCK_DATA[i].id;
        order.date = ORDERS_MOCK_DATA[i].date;
        order.progress = ORDERS_MOCK_DATA[i].progress;
        order.completed = ORDERS_MOCK_DATA[i].completed;
        result.push(order);
      }
    }
    return result;
  }

}
