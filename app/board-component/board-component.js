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
var main_1 = require("zero-blocks/main");
var order_service_1 = require("../order-service/order-service");
var BoardComponent = (function () {
    function BoardComponent(router, orderService) {
        this.router = router;
        this.orderService = orderService;
        this.selected = 'Active';
    }
    Object.defineProperty(BoardComponent.prototype, "fOptions", {
        get: function () {
            var fo = new main_1.FilterOptions();
            fo.key = "number";
            fo.inputValue = this.search_val;
            return fo;
        },
        enumerable: true,
        configurable: true
    });
    BoardComponent.prototype.getOrders = function () {
        var _this = this;
        this.orderService.getOrdersAsync()
            .then(function (orders) { return _this.orders = orders; });
    };
    BoardComponent.prototype.getCanceledOrders = function () {
        var _this = this;
        this.orderService.getCanceledOrders()
            .then(function (orders) { return _this.canceled_orders = orders; });
    };
    BoardComponent.prototype.getCompletedOrders = function () {
        var _this = this;
        this.orderService.getCompletedOrders()
            .then(function (orders) { return _this.completed_orders = orders; });
    };
    BoardComponent.prototype.goto = function (order) {
        var _this = this;
        var link = ['/detail', order.id];
        setTimeout(function () {
            _this.router.navigate(link);
        }, 250);
    };
    BoardComponent.prototype.changeLabel = function (ev) {
        this.selected = ev.tab.label;
    };
    BoardComponent.prototype.ngOnInit = function () {
        this.getOrders();
        this.getCompletedOrders();
        this.getCanceledOrders();
    };
    BoardComponent = __decorate([
        core_1.Component({
            selector: 'board',
            moduleId: module.id,
            templateUrl: 'board-component.html',
        }), 
        __metadata('design:paramtypes', [router_1.Router, order_service_1.OrderService])
    ], BoardComponent);
    return BoardComponent;
}());
exports.BoardComponent = BoardComponent;
//# sourceMappingURL=board-component.js.map