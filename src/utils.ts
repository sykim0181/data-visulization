import dayjs from "dayjs";
import { Payment, PaymentApiResponse, Status, statusMessages } from "./types";

export async function fetchPaymentData(
  year: number,
  month?: number,
): Promise<Payment> {
  try {
    const url = "https://coding-test.adpopcorn.com/api/v1/report/demo/GetDemoData";
    let body: {
      search_year: number;
      search_month?: number;
    } = {
      search_year: year,
    };

    if (month) {
      body = {
        ...body,
        search_month: month
      };
    }
    
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body)
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch Payment Data");
    }
  
    const data = (await response.json()) as PaymentApiResponse;
    console.log(data);

    if (data.Result === false) {
      throw new Error(`${data.ResultMsg}(${data.ResultCode})`);
    }

    return data.Payment;
  } catch (error: any) {
    throw new Error(error);
  }
}

export function getDateFromAspNetFormat(date: string): string {
  const re = /-?\d+/;
  const m = re.exec(date);
  if (m === null) {
    return "";
  }
  const timestamp = parseInt(m[0], 10);
  const newDate = new Date(timestamp);
  return dayjs(newDate).format("YYYY.MM.DD");
}

export function getStatusMessage(status: Status) {
  return statusMessages[status];
}
