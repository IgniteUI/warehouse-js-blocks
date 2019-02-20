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

    public toastMessage: string;
    public ordersAvailable = [];
    public selectedOrderId = null;

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

    constructor(private ordersService: OrdersService,
        private translate: TranslateService,
        private location: Location) {

        // internationalization
        translate.addLangs(["en", "jp"]);
        translate.setDefaultLang("en");
        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|jp/) ? browserLang : "en");
        //translate.use("jp");
    }

    ngOnInit() {
        this.ordersAvailable = this.ordersService.getOrdersAvailable();
    }

    backButtonClicked() {
        this.location.back();
    }

    public toggleDropDown(eventArgs) {
        this._overlaySettings.positionStrategy.settings.target = eventArgs.target;
        this.igxDropDown.toggle(this._overlaySettings);
    }

    get selectOrderButtonCaption(): string {
        if (this.ordersAvailable == null || this.ordersAvailable.length === 0) {
            return this.translate.instant("lblNoOrders");
        } else {
            if (this.selectedOrderId == null) {
                return this.translate.instant("lblSelectOrder");
            } else {
                return this.selectedOrderId;
            }
        }
    }

    public onSelectionHandler(eventArgs) {
        this.selectedOrderId = eventArgs.newSelection.element.nativeElement.innerText.trim();
    }

    public btnAddOrderHandler() {
        this.ordersService.updateOrderStatus(this.selectedOrderId, OrderStatus.Active);
        this.selectedOrderId = null;
        this.ordersAvailable = this.ordersService.getOrdersAvailable();
        this.toastMessage = this.translate.instant("lblOrderSuccessful");
        this.toastComp.show();
    }

}
