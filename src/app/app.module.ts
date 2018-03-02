import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { IgxButtonModule } from "igniteui-angular/main";
import { IgxIconModule } from "igniteui-angular/main";
import { IgxInputModule  } from "igniteui-angular/main";
import { IgxLabelModule } from "igniteui-angular/main";
import { IgxListModule } from "igniteui-angular/main";
import { IgxProgressBarModule } from "igniteui-angular/main";
import { IgxTabBarModule } from "igniteui-angular/main";

import { AppComponent } from "./app.component";
import { BoardComponent } from "./board/board.component";
import { OnboardingComponent } from "./onboarding/onboarding.component";
import { OrdersService } from "./orders-service/orders.service"

import "hammerjs";

const appRoutes: Routes = [
  { path: "board", component: BoardComponent },
  { path: "onboarding", component: OnboardingComponent },
  { path: "", redirectTo: "/onboarding", pathMatch: "full" },
];

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    OnboardingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    IgxButtonModule,
    IgxIconModule,
    IgxInputModule,
    IgxLabelModule,
    IgxListModule,
    IgxProgressBarModule,
    IgxTabBarModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false})
  ],
  providers: [
    OrdersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
