import { ViewGroup } from "../enums/view.enum";

export interface View {
  _id: string;
  viewGroup: ViewGroup;
  memberId: string;
  viewRefId: string;
  createdAt: string; // ISO date from backend
  updatedAt: string;
}

export interface ViewInput {
  memberId: string;
  viewRefId: string;
  viewGroup: ViewGroup;
}
