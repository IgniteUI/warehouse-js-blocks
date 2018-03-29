import { Component, OnInit } from "@angular/core";
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { MessagesService } from "../messages-service/messages.service";
import { MessageTarget } from "../messages-service/messageTarget";
import { Order } from "../orders-service/order";
import { OrderStatus } from "../orders-service/orderStatus";
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

  constructor(private ordersService: OrdersService,
              private translate: TranslateService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private messagesService: MessagesService) {

    // internationalization
    translate.addLangs(["en", "jp"]);
    translate.setDefaultLang("en");
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|jp/) ? browserLang : "en");
    //translate.use("jp");
  }

  get itemsDisabled(): boolean {
    return (!this.order || (this.order.status == OrderStatus.Complete || this.order.status == OrderStatus.Incomplete));
  }

  get orderCompletionDisabled(): boolean {
    for (let i = 0; i < this.order.items.length; i++) {
      if (!this.order.items[i]["Found"]) return true;
    }
    return false;
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
    let theContainer = document.getElementById("cont_" + orderId + "_" + itemId);
    if (theContainer) {
      if (theContainer.style.display == "none") {
        theContainer.style.display = "block";
      } else {
        theContainer.style.display = "none";
      }
    }
  }

  btnSentToActiveHandler() {
    if (this.order) {
      this.order.status = OrderStatus.Active;
      this.messagesService.addMessage(MessageTarget.Board, "showToast:" + this.translate.instant("lblOrderToActive"));
      this.router.navigate(['/board']);
    }
  }

  btnDeleteHandler() {
    if (this.order) {
      this.ordersService.deleteOrder(this.order.id);
      this.messagesService.addMessage(MessageTarget.Board, "showToast:" + this.translate.instant("lblOrderToDeleted"));
      this.router.navigate(['/board']);
    }
  }


  btnCompleteHandler() {
    if (this.order) {
      this.order.status = OrderStatus.Complete;
      this.messagesService.addMessage(MessageTarget.Board, "switchTab:Archive");
      this.messagesService.addMessage(MessageTarget.Board, "showToast:" + this.translate.instant("lblOrderToCompleted"));
      this.router.navigate(['/board']);
    }
  }

  btnMarkAsIncompleteHandler() {
    if (this.order) {
      this.order.status = OrderStatus.Incomplete;
      this.messagesService.addMessage(MessageTarget.Board, "showToast:" + this.translate.instant("lblOrderToIncomplete"));
      this.router.navigate(['/board']);
    }
    return false;
  }

}
