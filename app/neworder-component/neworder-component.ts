import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IgRippleModule, ButtonModule, IgInput } from "../../node_modules/zero-blocks/main";
import { OrderService } from "../order-service/order-service";
import { Order, Item } from "../order-service/order";


@Component({
    selector: 'new-order',
    moduleId: module.id,
    templateUrl: 'neworder-component.html',
})
export class NewOrderComponent implements OnInit {
    items: Item[] = [];
    order: Order;
    sub: any;
    isScanned = false;

    constructor(
        private orderService: OrderService,
        private router: Router,
        private route: ActivatedRoute) {}

    ngOnInit() {
        this.order = new Order('', '', '', [], false, false);
        this.sub = this.route
            .queryParams
            .subscribe(params => {
                this.isScanned = params['isScanned'] || false;
            });
        if (this.isScanned) {
            this.order.number = '111-11-424-12321';
            for (let i = 1; i < 4; i++) {
                this.items.push(new Item(i.toString(), i.toString(), false));
            }
        }
    }

    cancel($event) {
        this.isScanned = false;
        this.order.number = '';
        this.router.navigate(['/new']);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onSubmit() {
        this.order.items = this.items;
        this.orderService.createOrder(this.order)
            .then(res => {
                if (res) {
                    this.router.navigate(['']);
                }
            });
    }
}