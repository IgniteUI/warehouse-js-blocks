import { Component, OnDestroy, OnInit } from "@angular/core";
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
export class OrderComponent implements OnInit, OnDestroy {

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
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|jp/) ? browserLang : "en");
    //translate.use("jp");
  }

  get itemsDisabled(): boolean {
    return (!this.order || (this.order.status === OrderStatus.Complete || this.order.status === OrderStatus.Incomplete));
  }

  get orderCompletionDisabled(): boolean {
    for (let i = 0; i < this.order.items.length; i++) {
      if (!this.order.items[i]["Found"]) {
        return true;
      }
    }
    return false;
  }

  get pageTitle(): string {
    if (this.order) {
      switch (this.order.status) {
        case OrderStatus.Active: return this.translate.instant("lblActive");
        case OrderStatus.Complete: return this.translate.instant("lblCompleteOrder");
        case OrderStatus.Incomplete: return this.translate.instant("lblIncompleteOrder");
      }
    }
    return "Unknown Order";
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      params => {
        this.orderId = params["orderId"];
        this.order = this.ordersService.getOrder(this.orderId);
        if (this.order) {
          this.order.invalidateProgress();
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  backButtonClicked() {
    if (this.order) {
      if (this.order.status === OrderStatus.Complete || this.order.status === OrderStatus.Incomplete) {
        this.messagesService.addMessage(MessageTarget.Board, "switchTab:Archive");
        this.router.navigate(['/board']);
        return;
      }
    }
    this.location.back();
  }

  toggleListItem(itemId) {
    for (let i = 0; i < this.order.items.length; i++) {
      if (this.order.items[i]["ID"] === itemId) {
        if (this.order.items[i]["Expanded"] === undefined) {
          this.order.items[i]["Expanded"] = true;
        } else {
          this.order.items[i]["Expanded"] = !this.order.items[i]["Expanded"];
        }
        break;
      }
    }
  }

  convertExpandedStateToIcon(itemId) {
    for (let i = 0; i < this.order.items.length; i++) {
      if (this.order.items[i]["ID"] === itemId) {
        return this.order.items[i]["Expanded"] === true ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
      }
    }
  }

  convertBooleanToDisplay(inputValue) {
    return inputValue === true ? 'block' : 'none';
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
