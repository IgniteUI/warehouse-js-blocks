import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IgRippleModule, ButtonModule, IgInput } from "../node_modules/zero-blocks/main";
import { OrderService } from "./order.component";
import { Order, Item } from "./order";


@Component({
    selector: 'new-order',
    moduleId: module.id,
    templateUrl: 'neworder.html',
    providers: [OrderService]
})
export class NewOrderComponent implements OnInit {
    items: Item[] = [];
    order: Order;

    constructor(private orderService: OrderService, private router: Router) {}

    ngOnInit() {
        this.order = new Order('', '', '', [], false);
    }

    addItem(event) {
        if (!event.target.value) { return; }
        let desc = event.target.value;
        event.target.value = '';
        let newItem;
        if (this.items) {
            newItem = new Item(this.items.length.toString(), desc, false);
        } else {
            newItem = new Item('1', desc, false);
        }
        this.items.push(newItem);
    }

    removeItem(event, id) {
        event.preventDefault();
        this.items.splice(id, 1);
    }

    onSubmit() {
        if (this.items.length < 1) {
            return;
        }
        this.order.items = this.items;
        this.orderService.createOrder(this.order)
            .then(res => {
                if (res) {
                    this.router.navigate(['']);
                }
            });
    }
}