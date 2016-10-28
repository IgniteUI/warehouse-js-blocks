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
var common_1 = require("@angular/common");
var AppComponent = (function () {
    function AppComponent(location) {
        this.location = location;
    }
    Object.defineProperty(AppComponent.prototype, "currentRoute", {
        get: function () {
            return this.location.path();
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.goBack = function () {
        this.location.back();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            moduleId: module.id,
            templateUrl: 'app.component.html'
        }), 
        __metadata('design:paramtypes', [common_1.Location])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map