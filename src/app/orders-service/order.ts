import { OrderStatus } from "./orderStatus";

export class Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: object[];

  private progressValid: boolean = false;
  private progress: number;

  public getProgress(): number {
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

  public invalidateProgress() {
    this.progressValid = false;
  }

  public clone(): Order {
    const result = new Order();
    result.id = this.id;
    result.date = this.date;
    result.status = this.status;
    result.items = [];

    for (const item of this.items) {
      result.items.push(
        { ID: item["ID"], Name: item["Name"], Description: item["Description"], Price: item["Price"], Quantity: item["Quantity"],
          Image: item["Image"], Found: item["Found"], Aisle: item["Aisle"], Bin: item["Bin"]}
      );
    }

    result.progressValid = this.progressValid;
    result.progress = this.progress;
    return result;
  }

}
