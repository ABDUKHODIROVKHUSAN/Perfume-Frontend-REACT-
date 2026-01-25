import { OrderStatus } from "../enums/order.enum";
import { Perfume } from "./perfume";

export interface OrderItem {
    _id: string;
    itemQuantity:number;
    itemPrice: number;
    orderId: string;
    perfumeId: string;
    createAt:Date;
    updatedAt:Date;
}

export interface Order{
    _id: string;
    orderTotal: number;
    orderDelivery: number;
    ordetStatus: OrderStatus;
    memberId: string;
    createAt: Date;
    updatedAt: Date;
    // From aggregations
    orderItems:[];
    perfumeDate: Perfume[];
}

export interface OrderItemInput {
    itemQuantity: number,
    itemPrice: number,
    perfumeId:string,
    orderId?:string;
}

export interface OrderInquiry {
    page:number,
    limit:number,
    orderStatus: OrderStatus;
}

export interface OrderUpdateInput {
    orderId: string;
    orderStatus: OrderStatus;
}