import { Component } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app',
  moduleId: module.id,
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(private location: Location) {}

  get currentRoute() {
    return this.location.path();
  }

  goBack() {
    this.location.back();
  }
}
