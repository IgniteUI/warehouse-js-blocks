import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Location } from "@angular/common";

import { Order } from "../order-service/order";
import { OrderService } from "../order-service/order-service";

@Component({
    selector: 'order-detail',
    moduleId: module.id,
    templateUrl: 'order-component.html'
})
export class OrderDetailComponent implements OnInit {

    order: Order;

    constructor(
        private orderService: OrderService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
    ) {}

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.orderService.getOrder(id)
                .then(order => this.order = order)
        });
    }

    completeOrder(id: number) {
        this.orderService.setComplete(id);
    }

    cancelOrder(id: number) {
        this.orderService.setCancel(id);
        this.router.navigate(['/']);
    }

    completeOrder(id: number) {
        this.orderService.setCompleted(id);
        this.router.navigate(['/']);
    }

    deleteOrder(id: number) {
        this.orderService.deleteOrder(id);
        this.router.navigate(['/']);
    }
}