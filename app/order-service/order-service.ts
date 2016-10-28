import { Component, Injectable, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { Location } from '@angular/common';
import { Order, ORDERS, choice, Item } from "./order";
import { MOCK } from "./mock";

@Injectable()
export class OrderService {

    getOrders(): Promise<Order[]> {
        let orders = ORDERS.filter(order => order && !order.canceled && !order.completed);
        return Promise.resolve(orders);
    }

    _getOrder(id: number): Promise<Order> {
        return Promise.resolve(ORDERS[id]);
    }

    getCanceledOrders(): Promise<Order[]> {
        let canceled = ORDERS.filter(order => order && order.canceled);
        return Promise.resolve(canceled);
    }

    getCompletedOrders(): Promise<Order[]> {
        let completed = ORDERS.filter(order => (order && !order.canceled && order.completed));
        return Promise.resolve(completed);
    }

    getOrdersAsync(): Promise<Order[]> {
        return new Promise<Order[]>(resolve =>
            setTimeout(resolve, 100))
            .then(() => this.getOrders());
    }

    getOrder(id: number): Promise<Order> {
        return new Promise<Order>(resolve =>
            setTimeout(resolve, 100))
            .then(() => this._getOrder(id));
    }

    setCancel(id: number) {
        this._getOrder(id).then(order => order.canceled = true);
    }

    setCompleted(id: number) {
        this._getOrder(id).then(order => {
            order.completed = true;
            order.items.forEach(item => item.completed = true);
        });
    }

    createOrder(order: Order) {
        let mock = choice(MOCK);
        order.id = ORDERS.length;
        order.date = new Date().toDateString();
        order.company = mock.company;
        mock.product.forEach((product, idx) => order.items.push(new Item(idx, product, false)));
        ORDERS.push(order);
        return Promise.resolve(true);
    }

    deleteOrder(id: number) {
        ORDERS[id] = null;
        return Promise.resolve(true);
    }
}

