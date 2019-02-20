import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule, HttpClient } from "@angular/common/http";

import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { IgxButtonModule } from "igniteui-angular";
import { IgxBottomNavModule } from "igniteui-angular";
import { IgxCheckboxModule } from "igniteui-angular";
import { IgxDropDownModule } from "igniteui-angular";
import { IgxIconModule } from "igniteui-angular";
import { IgxInputGroupModule } from "igniteui-angular";
import { IgxListModule } from "igniteui-angular";
import { IgxNavbarModule } from "igniteui-angular";
import { IgxProgressBarModule } from "igniteui-angular";
import { IgxSnackbarModule } from "igniteui-angular";
import { IgxToastModule } from "igniteui-angular";

import { AddOrderComponent } from "./addorder/addorder.component";
import { AppComponent } from "./app.component";
import { BoardComponent } from "./board/board.component";
import { OnboardingComponent } from "./onboarding/onboarding.component";
import { OrderComponent } from "./order/order.component";

import { MessagesService } from "./messages-service/messages.service";
import { OrdersService } from "./orders-service/orders.service";

import "hammerjs";

const appRoutes: Routes = [
  { path: "addorder", component: AddOrderComponent},
  { path: "board", component: BoardComponent },
  { path: "onboarding", component: OnboardingComponent },
  { path: "order/:orderId", component: OrderComponent },
  { path: "", redirectTo: "/onboarding", pathMatch: "full" },
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AddOrderComponent,
    AppComponent,
    BoardComponent,
    OnboardingComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    IgxButtonModule,
    IgxBottomNavModule,
    IgxCheckboxModule,
    IgxDropDownModule,
    IgxIconModule,
    IgxInputGroupModule,
    IgxListModule,
    IgxNavbarModule,
    IgxProgressBarModule,
    IgxSnackbarModule,
    IgxToastModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    MessagesService,
    OrdersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
