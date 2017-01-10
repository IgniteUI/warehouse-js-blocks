import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IgxComponentsModule, IgxDirectivesModule, IgxFilterOptions } from "igniteui-js-blocks/main";
import { OrderService } from "../order-service/order-service";
import { Order } from "../order-service/order";


@Component({
    selector: 'board',
    moduleId: module.id,
    templateUrl: 'board-component.html',
})
export class BoardComponent implements OnInit {

    orders: Order[];
    canceled_orders: Order[];
    completed_orders: Order[];
    search_val: string;
    selected: string = 'Active';

    constructor(
        private router: Router,
        private orderService: OrderService,
    ) {}

    get fOptions() {
        let fo = new IgxFilterOptions();
        fo.key = "number";
        fo.inputValue = this.search_val;
        return fo;
    }

    getOrders() {
        this.orderService.getOrdersAsync()
            .then(orders => this.orders = orders);
    }

    getCanceledOrders() {
        this.orderService.getCanceledOrders()
            .then(orders => this.canceled_orders = orders);
    }

    getCompletedOrders() {
        this.orderService.getCompletedOrders()
            .then(orders => this.completed_orders = orders);
    }

    goto(order: Order) {
        let link = ['/detail', order.id];
        setTimeout(() => {
            this.router.navigate(link);
        }, 250);
    }

    cancel(id: number, event) {
        console.log(event);
        // event.gesture.preventDefault();
        this.orderService.setCancel(id);
        this.getOrders();
        this.getCompletedOrders();
        this.getCanceledOrders();
    }

    complete(id: number, event) {
        // event.gesture.preventDefault();
        this.orderService.setCompleted(id);
        this.getOrders();
        this.getCompletedOrders();
        this.getCanceledOrders();
    }

    changeLabel(ev) {
        this.selected = ev.tab.label;
    }

    ngOnInit() {
        this.getOrders();
        this.getCompletedOrders();
        this.getCanceledOrders();
    }
}