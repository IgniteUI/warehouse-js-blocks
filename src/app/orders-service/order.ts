import { OrderStatus } from "./orderStatus";

export class Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: object[];

  private progressValid: boolean = false;
  private progress: number;

  getProgress(): number {
    if (!this.progressValid) {
      let found: number = 0;
      this.progress = 0;
      if (this.items && this.items.length > 0) {
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i]["Found"] === true) {
            found++;
          }
        }
        this.progress = Math.round(found * 100 / this.items.length);
      }
      this.progressValid = true;
    }
    return this.progress;
  }
}