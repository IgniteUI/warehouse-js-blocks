import { IgxFilterOptions, IgxSnackbar } from 'igniteui-js-blocks/index.umd';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
    lastProcessedOrder: number;

    @ViewChild(IgxSnackbar) snackbar: IgxSnackbar;
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

    getAll() {
        this.getOrders();
        this.getCanceledOrders();
        this.getCompletedOrders();
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
        this.orderService.setCancel(id);
        this.lastProcessedOrder = id;
        this.getAll();
        this.snackbar.message = "Order canceled";
        this.snackbar.show();
    }

    revertOrder() {
        this.orderService.getOrder(this.lastProcessedOrder).then(order => {
            order.canceled = false;
            order.completed = false;
        }).then(() => {
            this.snackbar.hide();
            this.getAll();
        });
    }

    complete(id: number, event) {
        this.orderService.setCompleted(id);
        this.lastProcessedOrder = id;
        this.getAll();
        this.snackbar.message = "Order completed";
        this.snackbar.show();
    }

    changeLabel(ev) {
        this.selected = ev.tab.label;
    }

    ngOnInit() {
        this.getAll();
    }
}
