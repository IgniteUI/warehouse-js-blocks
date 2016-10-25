import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IgRippleModule, ButtonModule, ListModule } from "../../node_modules/zero-blocks/main";
import { IgInput, FilterOptions } from "../../node_modules/zero-blocks/main";
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
        private orderService: OrderService
    ) {}

    get fOptions() {
        let fo = new FilterOptions();
        fo.key = "number";
        fo.inputValue = this.search_val;
        return fo;
    }

    toggle(event: Event) {

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

    changeLabel(ev) {
        this.selected = ev.tab.label;
    }

    ngOnInit() {
        this.getOrders();
        this.getCompletedOrders();
        this.getCanceledOrders();
    }
}