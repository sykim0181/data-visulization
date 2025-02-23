import { Dayjs } from "dayjs";
import { createContext } from "react";

const DateContext = createContext<
  { 
    date: Dayjs | null; 
    setDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  } | null
>(null);

export default DateContext;