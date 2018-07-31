import { Component, OnInit, ViewChild } from "@angular/core";
import { Location } from '@angular/common';

import { TranslateService } from "@ngx-translate/core";

import { ConnectedPositioningStrategy, CloseScrollStrategy, HorizontalAlignment, VerticalAlignment } from "igniteui-angular";
import { IgxDropDownComponent, IgxToastComponent } from "igniteui-angular";

import { OrdersService } from "../orders-service/orders.service";
import { OrderStatus } from "../orders-service/orderStatus";

@Component({
  selector: "app-addorder",
  templateUrl: "./addorder.component.html",
  styleUrls: ["./addorder.component.css"]
})
export class AddOrderComponent implements OnInit {

    @ViewChild("toastComp")
    private toastComp: IgxToastComponent;

    @ViewChild(IgxDropDownComponent)
    private igxDropDown: IgxDropDownComponent;

    private toastMessage: string;
    private ordersAvailable = [];
    private selectedOrder = null;

    constructor(private ordersService: OrdersService,
        private translate: TranslateService,
        private location: Location) {

        // internationalization
        translate.addLangs(["en", "jp"]);
        translate.setDefaultLang("en");
        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|jp/) ? browserLang : "en");
        //translate.use("jp");
    }

    ngOnInit() {
        this.ordersAvailable = this.ordersService.getOrdersAvailable();
    }

    backButtonClicked() {
        this.location.back();
    }

    private _positionSettings = {
        horizontalStartPoint: HorizontalAlignment.Left,
        verticalStartPoint: VerticalAlignment.Bottom
    };

    private _overlaySettings = {
        closeOnOutsideClick: true,
        modal: false,
        positionStrategy: new ConnectedPositioningStrategy(this._positionSettings),
        scrollStrategy: new CloseScrollStrategy()
    };

    public toggleDropDown(eventArgs) {
        this._overlaySettings.positionStrategy.settings.target = eventArgs.target;
        this.igxDropDown.toggle(this._overlaySettings);
    }

    get selectOrderButtonCaption(): string {
        if (this.ordersAvailable == null || this.ordersAvailable.length == 0) {
            return this.translate.instant("lblNoOrders");
        } else {
            if (this.selectedOrder == null) {
                return this.translate.instant("lblSelectOrder");
            } else {
                return this.selectedOrder;
            }
        }
    }

    public onSelectionHandler(eventArgs) {
        this.selectedOrder = eventArgs.newSelection.element.nativeElement.innerText.trim();
    }

    public btnAddOrderHandler() {
        this.ordersService.updateOrderStatus(this.selectedOrder, OrderStatus.Active);
        this.selectedOrder = null;
        this.ordersAvailable = this.ordersService.getOrdersAvailable();
        this.toastMessage = this.translate.instant("lblOrderSuccessful");
        this.toastComp.show();
    }

}