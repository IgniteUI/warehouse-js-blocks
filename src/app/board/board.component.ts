import { Component, OnInit, HostListener } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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

  constructor(private ordersService: OrdersService, private translate: TranslateService, private route: ActivatedRoute, private router: Router) {
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
    this.onResize(null);
  }

  searchButtonClicked() {
    if (!this.searchCriteriaValue) {
      this.orders = this.ordersService.getOrdersAll();
    } else {
      this.orders = this.ordersService.getOrdersById(this.searchCriteriaValue);
    }
  }

  listItemClicked(evt) {
    if (evt.item) {
      let orderId = this.orders[evt.item.index].id;
      //console.log("@@@ selected order: " + orderId);
      this.router.navigate(['/order', orderId]);
    }
  }

  @HostListener("window:resize", ["$event"])
  onResize(evt) {
    let theActiveIgxList = document.getElementById("activeIgxList");
    if (theActiveIgxList) {
      let newHeight = (window.innerHeight - 226) + "px";
      theActiveIgxList.style.height = newHeight;
    }
    let theArchiveIgxList = document.getElementById("archiveIgxList");
    if (theArchiveIgxList) {
      let newHeight = (window.innerHeight - 139) + "px";
      theArchiveIgxList.style.height = newHeight;
    }
  }

}
