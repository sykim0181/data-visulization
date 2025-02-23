import { useQuery } from "@tanstack/react-query";
import { fetchPaymentData } from "../utils";

interface usePaymentQueryProps {
  year: number;
  month?: number;
}

const usePaymentQuery = (props: usePaymentQueryProps) => {
  const { year, month } = props;

  const { 
    data, 
    isFetching, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['payment', `${year}/${month}`],
    queryFn: () => fetchPaymentData(year, month),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  return {
    data, 
    isFetching, 
    isError,
    error
  };
};

export default usePaymentQuery;