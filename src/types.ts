import { RowData } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    width?: string
  }
}

export type PaymentApiResponse = {
  Payment: Payment;
  Result: boolean;
  IsTest: boolean;
  ResultCode: number;
  ResultMsg: string;
};

export interface PaymentCommonAttribute {
  Revenue: number;
  Commission: number;
  Complete: number;
};

export type Payment = PaymentCommonAttribute & {
  Monthly: Monthly[];
};

export type Monthly = PaymentCommonAttribute & {
  Status: Status,
  Datetime: string,
  AppKey: number,
  App: App[];
};

export type App = PaymentCommonAttribute & {
  AppName: string;
  AppKey: number;
  Campaign: Campaign[];
}

export type Campaign = PaymentCommonAttribute & {
  CampaignName: string;
  Datetime: string;
  CampaignKey: string;
  AppKey: string;
}

export const statusMessages = {
  1: "출금 요청",
  2: "출금 거절",
  3: "출금 완료",
  4: "출금 취소",
  5: "출금 가능",
} as const;
export type Status = keyof typeof statusMessages;
