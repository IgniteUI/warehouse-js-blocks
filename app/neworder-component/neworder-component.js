"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var order_service_1 = require("../order-service/order-service");
var order_1 = require("../order-service/order");
var NewOrderComponent = (function () {
    function NewOrderComponent(orderService, router, route) {
        this.orderService = orderService;
        this.router = router;
        this.route = route;
        this.items = [];
        this.isScanned = false;
    }
    NewOrderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.order = new order_1.Order(0, '', '', '', [], false, false);
        this.sub = this.route
            .queryParams
            .subscribe(function (params) {
            _this.isScanned = params['isScanned'] || false;
        });
        if (this.isScanned) {
            this.order.number = '111-11-424-12321';
        }
    };
    NewOrderComponent.prototype.cancel = function ($event) {
        this.isScanned = false;
        this.order.number = '';
        this.router.navigate(['/new']);
    };
    NewOrderComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    NewOrderComponent.prototype.onSubmit = function () {
        var _this = this;
        this.order.items = this.items;
        this.orderService.createOrder(this.order)
            .then(function (res) {
            if (res) {
                _this.router.navigate(['/']);
            }
        });
    };
    NewOrderComponent = __decorate([
        core_1.Component({
            selector: 'new-order',
            moduleId: module.id,
            templateUrl: 'neworder-component.html',
        }), 
        __metadata('design:paramtypes', [order_service_1.OrderService, router_1.Router, router_1.ActivatedRoute])
    ], NewOrderComponent);
    return NewOrderComponent;
}());
exports.NewOrderComponent = NewOrderComponent;
//# sourceMappingURL=neworder-component.js.map