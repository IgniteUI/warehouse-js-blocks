function uuid4() {
    let uuid = '', ii;
    for (ii = 0; ii < 32; ii++) {
        switch (ii) {
        case 8:
        case 20:
            uuid += '-';
            uuid += (Math.random() * 16 | 0).toString(16);
            break;
        case 12:
            uuid += '-';
            uuid += '4';
            break;
        case 16:
            uuid += '-';
            uuid += (Math.random() * 4 | 8).toString(16);
            break;
        default:
            uuid += (Math.random() * 16 | 0).toString(16);
        }
    }
    return uuid;
}

function createItem(lastId, text): Item {
    return new Item(`${lastId++}`, text, false);
}

function createOrder(id): Order {
    return new Order(`${id}`, uuid4(), new Date().toDateString(),
        [], Math.floor(Math.random() * 7) % 2 == 0);
}

export class Item {
    id: string;
    description: string;
    completed: boolean;

    constructor(id: string, description: string, completed: boolean) {
        this.id = id;
        this.description = description;
        this.completed = completed;
    }
}

export class Order {
    id: string;
    number: string;
    date: string;
    items: Item[] = [];
    canceled: boolean = false;

    constructor(id: string, number: string, date: string, items: Item[], canceled: boolean) {
        this.id = id;
        this.number = number;
        this.date = date;
        this.items = items;
        this.canceled = canceled;
    }

    get canBeCompleted() {
        return this.items.every(item => item.completed);
    }
}

export let ORDERS = [];

function populate() {
    let ORDERS = [];
    for (let i = 0; i < 15; i++) {
        let order = createOrder(i);
        for (let j = 0; j < 3; j++) {
            order.items.push(createItem(j, `Do the needful ${j}`));
        }
        ORDERS.push(order);
    }
    return ORDERS;
}

ORDERS = populate();