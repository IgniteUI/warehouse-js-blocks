import { Component, OnInit } from "@angular/core";
import { OrdersService } from "../orders-service/orders.service";

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

  constructor(private ordersService: OrdersService) {
    this.orders = ordersService.getOrdersAll();
    this.ordersCompleted = ordersService.getOrdersCompleted();
    this.ordersIncompleted = ordersService.getOrdersIncompleted();
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
