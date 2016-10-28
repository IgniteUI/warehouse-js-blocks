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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var order_service_1 = require("../order-service/order-service");
var OrderDetailComponent = (function () {
    function OrderDetailComponent(orderService, route, router, location) {
        this.orderService = orderService;
        this.route = route;
        this.router = router;
        this.location = location;
    }
    OrderDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            _this.orderService.getOrder(id)
                .then(function (order) { return _this.order = order; });
        });
    };
    OrderDetailComponent.prototype.cancelOrder = function (id) {
        this.orderService.setCancel(id);
        this.router.navigate(['/']);
    };
    OrderDetailComponent.prototype.completeOrder = function (id) {
        this.orderService.setCompleted(id);
        this.router.navigate(['/']);
    };
    OrderDetailComponent.prototype.deleteOrder = function (id) {
        this.orderService.deleteOrder(id);
        this.router.navigate(['/']);
    };
    OrderDetailComponent = __decorate([
        core_1.Component({
            selector: 'order-detail',
            moduleId: module.id,
            templateUrl: 'order-component.html'
        }), 
        __metadata('design:paramtypes', [order_service_1.OrderService, router_1.ActivatedRoute, router_1.Router, common_1.Location])
    ], OrderDetailComponent);
    return OrderDetailComponent;
}());
exports.OrderDetailComponent = OrderDetailComponent;
//# sourceMappingURL=order-component.js.map