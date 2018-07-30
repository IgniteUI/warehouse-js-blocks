import { Component, OnInit, HostListener, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

import { MessagesService } from "../messages-service/messages.service";
import { MessageTarget } from "../messages-service/messageTarget";
import { OrdersService } from "../orders-service/orders.service";

import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { IgxBottomNavComponent } from "igniteui-angular";
import { IgxToastComponent } from "igniteui-angular";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.css"]
})
export class BoardComponent implements OnInit, AfterViewInit {

  @ViewChild("toastComp") toastComp: IgxToastComponent;
  @ViewChild("mainTabBar") mainTabBar: IgxBottomNavComponent;
  searchCriteriaValue: string = "";
  ordersActive = [];
  ordersCompleted = [];
  ordersIncompleted = [];
  componentMessages: string[];
  toastMessage: string = "";

  constructor(private ordersService: OrdersService,
              private translate: TranslateService,
              private route: ActivatedRoute,
              private router: Router,
              private messagesService: MessagesService,
              private cdr: ChangeDetectorRef) {

    // internationalization
    translate.addLangs(["en", "jp"]);
    translate.setDefaultLang("en");
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|jp/) ? browserLang : "en");
    //translate.use("jp");
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
        let msgStr = this.componentMessages[i].substr(10);
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
        let requestedTabStr = this.componentMessages[i].substr(10);
        if (requestedTabStr == "Active") {
          let aTab = this.mainTabBar.tabs.toArray()[0];
          aTab.select();
        } else
        if (requestedTabStr == "Archive") {
          let aTab = this.mainTabBar.tabs.toArray()[1];
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
    if (evt.item) {
      let orderId = this.ordersActive[evt.item.index].id;
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

  addOrderClicked() {
    this.router.navigateByUrl("/addorder");
  }

}
