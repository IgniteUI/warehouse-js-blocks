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
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var app_component_1 = require('./app.component');
var order_service_1 = require("./order-service/order-service");
var board_component_1 = require("./board-component/board-component");
var order_component_1 = require("./order-component/order-component");
var neworder_component_1 = require("./neworder-component/neworder-component");
var scan_component_1 = require("./scan-component/scan-component");
var main_1 = require("zero-blocks/main");
var main_2 = require("zero-blocks/main");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                board_component_1.BoardComponent,
                order_component_1.OrderDetailComponent,
                neworder_component_1.NewOrderComponent,
                scan_component_1.ScanComponent,
                main_2.IgInput
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                main_1.IgRippleModule,
                main_1.ButtonModule,
                main_2.ListModule,
                main_2.IgLayout,
                main_2.FilterModule,
                main_1.TabBarModule,
                main_1.CheckboxModule,
                main_2.NavbarModule,
                main_2.AvatarModule,
                router_1.RouterModule.forRoot([
                    {
                        path: '',
                        component: board_component_1.BoardComponent
                    },
                    {
                        path: 'detail/:id',
                        component: order_component_1.OrderDetailComponent
                    },
                    {
                        path: 'new',
                        component: neworder_component_1.NewOrderComponent
                    },
                    {
                        path: 'scan',
                        component: scan_component_1.ScanComponent
                    }
                ])
            ],
            providers: [order_service_1.OrderService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map