import { Component, OnInit } from "@angular/core";
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Order } from "../orders-service/order";
import { OrdersService } from "../orders-service/orders.service";

import { TranslateService, LangChangeEvent } from "@ngx-translate/core";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"]
})
export class OrderComponent implements OnInit {

  orderId: string;
  order: Order;
  private subscription: any;
  //orders = [];

  constructor(private ordersService: OrdersService,
              private translate: TranslateService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) {
    
    //this.orders = ordersService.getOrdersAll();

    // internationalization
    translate.addLangs(["en", "jp"]);
    translate.setDefaultLang("en");
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|jp/) ? browserLang : "en");
    //translate.use("jp");
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      params => {
        this.orderId = params["orderId"];
        this.order = this.ordersService.getOrder(this.orderId);
      }
    );
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  backButtonClicked() {
    this.location.back();
  }

  toggleListItem(orderId, itemId) {
    //console.log(evt.item.index);
    //let orderId = this.orders[evt.item.index].id;
    //onsole.log("@@@ " + orderId + " " + itemId);

    let theContainer = document.getElementById("cont_" + orderId + "_" + itemId);
    if (theContainer) {
      //console.log(theContainer);

      //console.log(theContainer.style.display);

      if (theContainer.style.display == "none") {
        theContainer.style.display = "block";
      } else {
        theContainer.style.display = "none";
      }
    }


  }

}
