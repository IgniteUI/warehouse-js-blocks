import { Component, OnInit } from "@angular/core";

import { OrdersService } from "../orders-service/orders.service";

import { TranslateService, LangChangeEvent } from "@ngx-translate/core";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.css"]
})
export class BoardComponent implements OnInit {

  searchCriteriaValue: string = "";
  orders = [];
  ordersCompleted = [];
  ordersIncompleted = [];

  constructor(private ordersService: OrdersService, private translate: TranslateService) {
    this.orders = ordersService.getOrdersAll();
    this.ordersCompleted = ordersService.getOrdersCompleted();
    this.ordersIncompleted = ordersService.getOrdersIncompleted();

    // internationalization
    translate.addLangs(["en", "jp"]);
    translate.setDefaultLang("en");
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|jp/) ? browserLang : "en");
    //translate.use("jp");
  }

  ngOnInit() {
  }

  searchButtonClicked() {
    if (!this.searchCriteriaValue) {
      this.orders = this.ordersService.getOrdersAll();
    } else {
      this.orders = this.ordersService.getOrdersById(this.searchCriteriaValue);
    }
  }

}
