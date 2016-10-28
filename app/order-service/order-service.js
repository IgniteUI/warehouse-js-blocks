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
var order_1 = require("./order");
var mock_1 = require("./mock");
var OrderService = (function () {
    function OrderService() {
    }
    OrderService.prototype.getOrders = function () {
        var orders = order_1.ORDERS.filter(function (order) { return order && !order.canceled && !order.completed; });
        return Promise.resolve(orders);
    };
    OrderService.prototype._getOrder = function (id) {
        return Promise.resolve(order_1.ORDERS[id]);
    };
    OrderService.prototype.getCanceledOrders = function () {
        var canceled = order_1.ORDERS.filter(function (order) { return order && order.canceled; });
        return Promise.resolve(canceled);
    };
    OrderService.prototype.getCompletedOrders = function () {
        var completed = order_1.ORDERS.filter(function (order) { return (order && !order.canceled && order.completed); });
        return Promise.resolve(completed);
    };
    OrderService.prototype.getOrdersAsync = function () {
        var _this = this;
        return new Promise(function (resolve) {
            return setTimeout(resolve, 100);
        })
            .then(function () { return _this.getOrders(); });
    };
    OrderService.prototype.getOrder = function (id) {
        var _this = this;
        return new Promise(function (resolve) {
            return setTimeout(resolve, 100);
        })
            .then(function () { return _this._getOrder(id); });
    };
    OrderService.prototype.setCancel = function (id) {
        this._getOrder(id).then(function (order) { return order.canceled = true; });
    };
    OrderService.prototype.setCompleted = function (id) {
        this._getOrder(id).then(function (order) {
            order.completed = true;
            order.items.forEach(function (item) { return item.completed = true; });
        });
    };
    OrderService.prototype.createOrder = function (order) {
        var mock = order_1.choice(mock_1.MOCK);
        order.id = order_1.ORDERS.length;
        order.date = new Date().toDateString();
        order.company = mock.company;
        mock.product.forEach(function (product, idx) { return order.items.push(new order_1.Item(idx, product, false)); });
        order_1.ORDERS.push(order);
        return Promise.resolve(true);
    };
    OrderService.prototype.deleteOrder = function (id) {
        order_1.ORDERS[id] = null;
        return Promise.resolve(true);
    };
    OrderService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], OrderService);
    return OrderService;
}());
exports.OrderService = OrderService;
//# sourceMappingURL=order-service.js.map