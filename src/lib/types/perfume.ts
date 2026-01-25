
import {
    PerfumeCollection as PerfumeCollection,
    PerfumeStatus as PerfumeStatus,
    PerfumeSize as PerfumeSize,
    PerfumeBrand as PerfumeBrand
} from "../enums/perfume.enum";

export interface Perfume {
    image: string;
    price: number;
    _id: string;
    name:string;
    perfumeStatus: PerfumeStatus;
    perfumeCollection: PerfumeCollection;
    perfumeRanking:number;
    perfumeName: string;
    perfumePrice: number;
    perfumeLeftCount: number;
    perfumeSize: PerfumeSize;
    PerfumeBrand: PerfumeBrand;
    perfumeDesc?: string;
    perfumeImages: string[];
    perfumeViews: number;
}

export interface PerfumeInput {
    perfumeStatus?: PerfumeStatus;
    perfumeCollection: PerfumeCollection;
    perfumeName: string;
    perfumePrice: number;
    perfumeLeftCount: number;
    perfumeSize?: PerfumeSize;
    PerfumeBrand?: PerfumeBrand;
    perfumeDesc?: string;
    perfumeImages: string[];
    perfumeViews: number;
}

export interface PerfumeUpdateInput {
    _id: string
    ;
    perfumeStatus?: PerfumeStatus;
    perfumeCollection?: PerfumeCollection;
    perfumeName?: string;
    perfumePrice?: number;
    perfumeLeftCount?: number;
    perfumeSize?: PerfumeSize;
    PerfumeBrand?: PerfumeBrand;
    perfumeDesc?: string;
    perfumeImages?: string[];
    perfumeViews?: number;
}

export interface PerfumeInquiry {
    order: string;
    page: number;
    limit: number;
    perfumeCollection?: PerfumeCollection;
    search?: string;
}