import { Component, OnInit, HostListener, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

import { MessagesService } from "../messages-service/messages.service";
import { MessageTarget } from "../messages-service/messageTarget";
import { OrdersService } from "../orders-service/orders.service";
import { OrderStatus } from "../orders-service/orderStatus";

import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { IgxBottomNavComponent, IgxListPanState, IgxSnackbarComponent, IgxToastComponent } from "igniteui-angular";
import { Order } from "../orders-service/order";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.css"]
})
export class BoardComponent implements OnInit, AfterViewInit {

  @ViewChild("toastComp")
  toastComp: IgxToastComponent;

  @ViewChild("mainTabBar")
  mainTabBar: IgxBottomNavComponent;

  @ViewChild("snackbar1")
  snackbar1: IgxSnackbarComponent;

  searchCriteriaValue = "";
  ordersActive = [];
  ordersCompleted = [];
  ordersIncompleted = [];
  componentMessages: string[];
  toastMessage = "";
  snackBarActionMessage = "";
  activeIgxListHeight = 0;
  archiveIgxListHeight = 0;

  // for undo operation
  undoOrder: Order = null;
  undoOrderIndex: number;

  constructor(private ordersService: OrdersService,
              private translate: TranslateService,
              private route: ActivatedRoute,
              private router: Router,
              private messagesService: MessagesService,
              private cdr: ChangeDetectorRef) {

    // internationalization
    translate.addLangs(["en", "jp"]);
    translate.setDefaultLang("en");
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|jp/) ? browserLang : "en");
    // translate.use("jp");
  }

  ngOnInit() {
    // load orders
    this.ordersActive = this.ordersService.getOrdersActive();
    this.ordersCompleted = this.ordersService.getOrdersCompleted();
    this.ordersIncompleted = this.ordersService.getOrdersIncompleted();

    // initial resize of the IgxLists
    this.onResize(null);

    // obtain messages for this component
    this.componentMessages = this.messagesService.obtainMessages(MessageTarget.Board);

    // show a toast message if there is such request
    for (let i = 0; i < this.componentMessages.length; i++) {
      if (this.componentMessages[i].startsWith("showToast:")) {
        const msgStr = this.componentMessages[i].substr(10);
        this.toastMessage = msgStr;
        this.toastComp.show();
        this.componentMessages.splice(i, 1);
      }
    }
  }

  ngAfterViewInit() {
    // switch selected tab if there is such request
    for (let i = 0; i < this.componentMessages.length; i++) {
      if (this.componentMessages[i].startsWith("switchTab:")) {
        const requestedTabStr = this.componentMessages[i].substr(10);
        if (requestedTabStr === "Active") {
          const aTab = this.mainTabBar.tabs.toArray()[0];
          aTab.select();
        } else
        if (requestedTabStr === "Archive") {
          const aTab = this.mainTabBar.tabs.toArray()[1];
          aTab.select();
        }
        this.cdr.detectChanges();
        this.componentMessages.splice(i, 1);
      }
    }
  }

  clearSearchInputClicked() {
    this.searchCriteriaValue = "";
    this.searchBoxKeyDown(null);
  }

  activeListItemClicked(evt) {
    if (evt.item && evt.direction === IgxListPanState.NONE) {
      const orderId = this.ordersActive[evt.item.index].id;
      this.router.navigate(['/order', orderId]);
    }
  }

  archiveListItemClicked(evt) {
    if (evt.item) {
      let orderId = "";
      let idx = evt.item.index;
      if (idx <= this.ordersCompleted.length) {
        orderId = this.ordersCompleted[idx - 1].id; // excluding 1 header (complete)
      } else {
        idx = idx - this.ordersCompleted.length;
        orderId = this.ordersIncompleted[idx - 2].id; // excluding 2 headers (complete and incomplete)
      }
      this.router.navigate(['/order', orderId]);
    }
  }

  searchBoxKeyDown(event) {
    if (!this.searchCriteriaValue) {
      this.ordersActive = this.ordersService.getOrdersActive();
    } else {
      this.ordersActive = this.ordersService.getOrdersActiveById(this.searchCriteriaValue.toUpperCase());
    }
  }

  // used to resize the IgxLists when resizing the browser window
  @HostListener("window:resize", ["$event"])
  onResize(evt) {
    this.activeIgxListHeight = window.innerHeight - 226;
    this.archiveIgxListHeight = window.innerHeight - 139;
  }

  addOrderClicked() {
    this.router.navigateByUrl("/addorder");
  }

  public onLeftPanHandler(args) {
    args.keepItem = true;

    // cloning order befor it is changed
    this.undoOrder = this.ordersActive[args.item.index].clone();
    this.undoOrderIndex = args.item.index;

    // remove from active list
    const extractedOrder = this.ordersActive.splice(args.item.index, 1)[0];

    // update the order by setting all order's items as found
    for (const orderItem of extractedOrder.items) {
      if (!orderItem.Found) {
        orderItem.Found = true;
      }
    }

    // set order's state to complete
    extractedOrder.status = OrderStatus.Complete;

    // add order to completed list
    this.ordersCompleted.push(extractedOrder);

    // update order status in the data source service
    this.ordersService.updateOrderStatus(extractedOrder.id, OrderStatus.Complete);

    // show an information snackbar with UNDO option
    this.snackBarActionMessage = this.translate.instant("lblMovedToCompleted");
    this.snackbar1.show();
  }

  public onRightPanHandler(args) {
    args.keepItem = true;

    // cloning order befor it is changed
    this.undoOrder = this.ordersActive[args.item.index].clone();
    this.undoOrderIndex = args.item.index;

    // remove from active list
    const extractedOrder = this.ordersActive.splice(args.item.index, 1)[0];

    // set order's state to complete
    extractedOrder.status = OrderStatus.Incomplete;

    // add order to incompleted list
    this.ordersIncompleted.push(extractedOrder);

    // update order status in the data source service
    this.ordersService.updateOrderStatus(extractedOrder.id, OrderStatus.Incomplete);

    // show an information snackbar with UNDO option
    this.snackBarActionMessage = this.translate.instant("lblMovedToIncompleted");
    this.snackbar1.show();
  }

  public performUndo() {
    this.snackbar1.hide();
    if (this.undoOrder != null) {
      // search for order with this id in both local completed list and local incompleted list and remove it
      if (this.ordersCompleted[this.ordersCompleted.length - 1].id === this.undoOrder.id) {
        this.ordersCompleted.pop();
      } else if (this.ordersIncompleted[this.ordersIncompleted.length - 1].id === this.undoOrder.id) {
        this.ordersIncompleted.pop();
      }

      // insert back the removed order in the active list
      this.ordersActive.splice(this.undoOrderIndex, 0, this.undoOrder);

      // update order status in the data source service
      this.ordersService.updateOrderStatus(this.undoOrder.id, OrderStatus.Active);

      this.undoOrder = null;
      this.undoOrderIndex = 0;
    }
  }

}
