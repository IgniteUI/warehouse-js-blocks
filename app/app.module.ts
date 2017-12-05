import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { OrderService } from "./order-service/order-service";
import {
    IgxAvatarModule,
    IgxBadgeModule,
    IgxCarouselModule,
    IgxCheckboxModule,
    IgxFilterModule,
    IgxListModule,
    IgxNavbarModule,
    IgxSnackbarModule,
    IgxTabBarModule,
    IgxSliderModule,
    IgxProgressBarModule,
    IgxRippleModule,
    IgxButtonModule
} from 'igniteui-js-blocks/index.umd';

import { BoardComponent } from "./board-component/board-component";
import { OrderDetailComponent } from "./order-component/order-component";
import { NewOrderComponent } from "./neworder-component/neworder-component";
import { ScanComponent } from "./scan-component/scan-component";
import { SplashScreenComponent } from "./splashscreen-component/splashscreen.component";

// import { IgxComponentsModule, IgxDirectivesModule } from "igniteui-js-blocks/main";

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    OrderDetailComponent,
    NewOrderComponent,
    ScanComponent,
    SplashScreenComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    IgxFilterModule,
    IgxSnackbarModule,
    IgxNavbarModule,
    IgxTabBarModule,
    IgxListModule,
    IgxListModule,
    IgxAvatarModule,
    IgxBadgeModule,
    IgxCarouselModule,
    IgxCheckboxModule,
    IgxSliderModule,
    IgxProgressBarModule,
    IgxRippleModule,
    IgxButtonModule,
    RouterModule.forRoot([
      {
        path: '',
        component: BoardComponent,
        pathMatch: 'full'
      },
      {
        path: 'splash',
        component: SplashScreenComponent,
        pathMatch: 'full'
      },
      {
        path: 'detail/:id',
        component: OrderDetailComponent,
        pathMatch: 'full'
      },
      {
        path: 'new',
        component: NewOrderComponent,
        pathMatch: 'full'
      },
      {
        path: 'scan',
        component: ScanComponent,
        pathMatch: 'full'
      }
    ])
  ],
  providers: [OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
