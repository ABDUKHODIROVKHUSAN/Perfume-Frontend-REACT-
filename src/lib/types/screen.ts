import { Member } from "./member";
import { Perfume } from "./perfume";
import { Order } from "./order";

// React App State

export interface AppRootState {
    homepage:HomePageState;
    perfumePage: perfumesPageState;
    ordersPage: OrdersPageState;
}
//HOMEPAGE
export interface HomePageState {
    comingSoon: Perfume[];
    popularPerfumes: Perfume[];
}

//perfume PAGE
export interface perfumesPageState {
    store: Member | null;
    perfumes:Perfume[];
    chosenperfume:Perfume | null;
    
}

//ORDERS PAGE
export interface OrdersPageState{
    pausedOrders:Order[];
    processOrders:Order[];
    finishedOrders:Order[];
}