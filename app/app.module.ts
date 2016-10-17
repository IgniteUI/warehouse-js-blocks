import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { OrderDetailComponent, OrderService } from "./order.component";
import { BoardComponent } from "./board";
import { NewOrderComponent } from "./neworder";

import { IgRippleModule, ButtonModule, TabBarModule, CheckboxModule } from "../node_modules/zero-blocks/main";
import { IgInput, ListModule, IgLayout, FilterModule } from "../node_modules/zero-blocks/main";


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    OrderDetailComponent,
    NewOrderComponent,
    IgInput
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IgRippleModule,
    ButtonModule,
    ListModule,
    IgLayout,
    FilterModule,
    TabBarModule,
    CheckboxModule,
    RouterModule.forRoot([
      {
        path: '',
        component: BoardComponent
      },
      {
        path: 'detail/:id',
        component: OrderDetailComponent
      },
      {
        path: 'new',
        component: NewOrderComponent
      }
    ])
  ],
  providers: [OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
