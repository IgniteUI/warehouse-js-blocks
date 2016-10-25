import { MOCK } from "./mock";

export function choice(arrData) {
    return arrData[Math.floor(Math.random() * arrData.length)];
}

export class Item {
    id: number;
    description: string;
    completed: boolean;

    constructor(id: number, description: string, completed: boolean) {
        this.id = id;
        this.description = description;
        this.completed = completed;
    }
}

export class Order {
    id: number;
    number: string;
    company: string;
    date: string;
    items: Item[] = [];
    completed: boolean = false;
    canceled: boolean = false;

    constructor(id: number, number: string, company: string, date: string, items: Item[], canceled: boolean, completed: boolean) {
        this.id = id;
        this.number = number;
        this.company = company;
        this.date = date;
        this.items = items;
        this.canceled = canceled;
        this.completed = completed;
    }

    get canBeCompleted() {
        return this.items.every(item => item.completed);
    }
}

export let ORDERS = [];


function populate() {
    let ORDERS = [];

    for (let i = 0; i < 20; i++) {

        let sample = choice(MOCK);
        let order = new Order(
            i,
            sample.number,
            sample.company,
            sample.date,
            [],
            Math.floor(Math.random() * 7) % 2 == 0,
            false
        );

        for (let j = 0; j < sample.product.length; j++) {
            order.items.push(new Item(j, sample.product[j], false));
        }
        if (i % 3 == 0) {
            order.completed = true;
            order.items.forEach(item => item.completed = true);
        }
        ORDERS.push(order);
    }
    return ORDERS;
}

ORDERS = populate();