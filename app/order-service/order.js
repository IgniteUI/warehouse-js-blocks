"use strict";
var mock_1 = require("./mock");
function choice(arrData) {
    return arrData[Math.floor(Math.random() * arrData.length)];
}
exports.choice = choice;
var Item = (function () {
    function Item(id, description, completed) {
        this.id = id;
        this.description = description;
        this.completed = completed;
    }
    return Item;
}());
exports.Item = Item;
var Order = (function () {
    function Order(id, number, company, date, items, canceled, completed) {
        this.items = [];
        this.completed = false;
        this.canceled = false;
        this.id = id;
        this.number = number;
        this.company = company;
        this.date = date;
        this.items = items;
        this.canceled = canceled;
        this.completed = completed;
    }
    Object.defineProperty(Order.prototype, "canBeCompleted", {
        get: function () {
            return this.items.every(function (item) { return item.completed; });
        },
        enumerable: true,
        configurable: true
    });
    return Order;
}());
exports.Order = Order;
exports.ORDERS = [];
function populate() {
    var ORDERS = [];
    for (var i = 0; i < 24; i++) {
        var sample = choice(mock_1.MOCK);
        var order = new Order(i, sample.number, sample.company, sample.date, [], Math.floor(Math.random() * 7 + 1) % 2 == 0, false);
        for (var j = 0; j < sample.product.length; j++) {
            order.items.push(new Item(j, sample.product[j], false));
        }
        if (i % 6 == 0) {
            order.completed = true;
            order.canceled = false;
            order.items.forEach(function (item) { return item.completed = true; });
        }
        ORDERS.push(order);
    }
    return ORDERS;
}
exports.ORDERS = populate();
//# sourceMappingURL=order.js.map