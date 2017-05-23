import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { IgRippleModule, ButtonModule, IgInput } from "igniteui-js-blocks/main";
import { IgxComponentsModule, IgxDirectivesModule } from "igniteui-js-blocks/main";
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
        this.order = new Order(0, '', '', '', [], false, false);
        this.sub = this.route
            .queryParams
            .subscribe(params => {
                this.isScanned = params['isScanned'] || false;
            });
        if (this.isScanned) {
            this.order.number = '111-11-424-12321';
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

    navigateBack() {
        this.router.navigateByUrl('/');
    }

    onSubmit() {
        this.order.items = this.items;
        this.orderService.createOrder(this.order)
            .then(res => {
                if (res) {
                    this.router.navigate(['/']);
                }
            });
    }
}