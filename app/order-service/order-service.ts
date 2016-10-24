import { Component, Injectable, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { Location } from '@angular/common';
import { Order, ORDERS } from "./order";

@Injectable()
export class OrderService {

    getOrders(): Promise<Order[]> {
        let orders = ORDERS.filter((order) => {
            if(order.canceled == false && order.completed == false) {
                return true;
            } else {
                return false;
            }
        });
        return Promise.resolve(orders);
    }

    _getOrder(id: number): Promise<Order> {
        return Promise.resolve(ORDERS[id]);
    }

    getCanceledOrders(): Promise<Order[]> {
        let canceled = ORDERS.filter(order => order.canceled == true);
        return Promise.resolve(canceled);
    }

    getCompletedOrders(): Promise<Order[]> {
        let completed = ORDERS.filter(order => order.completed == true);
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

    setComplete(id: number) {
        this._getOrder(id).then(order => order.completed = true);
    }

    createOrder(order: Order) {
        order.id = ORDERS.length.toString();
        order.date = new Date().toDateString();
        ORDERS.push(order);
        return Promise.resolve(true);
    }
}

