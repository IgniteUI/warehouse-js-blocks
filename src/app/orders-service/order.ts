import { OrderStatus } from "./orderStatus";

export class Order {
    id: string;
    date: string;
    //progress: number;
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
                this.progress = found * 100 / this.items.length;
                console.log("found:" + found + " total:" + this.items.length + " res:" + this.progress);
            }
            this.progressValid = true;
        }
        return this.progress;
    }
}