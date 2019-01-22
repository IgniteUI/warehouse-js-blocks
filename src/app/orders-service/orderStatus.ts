export enum OrderStatus {
    Active = 0, // these orders are in progress and are shown in the 'ACTIVE' list
    Incomplete = 1, // these orders are currently on hold and are shown in the 'ARCHIVE' list
    Complete = 2, // these orders are completed and are shown in the 'ARCHIVE' list
    Available = 3 // these orders are waiting for assignment can be added in the 'ACTIVE' list using the 'PLUS' button
}
