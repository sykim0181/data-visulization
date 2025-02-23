import { Alert, Button, FormControl } from "@mui/material";
import { DatePicker, DateView } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

import useDateContext from "../../hooks/useDateContext";

interface ReportDatePickerProps {
  views: DateView[];
}

const ReportDatePicker = (props: ReportDatePickerProps) => {
  const { views } = props;

  const { setDate } = useDateContext();

  const [pickedDate, setPickedDate] = useState<Dayjs | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const onClickButton = () => {
    if (pickedDate === null || !pickedDate.isValid()) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
      setDate(pickedDate);
    }
  }

  const onDatePickerChange = (newValue: Dayjs | null) => {
    setPickedDate(newValue);
  };

  return (
    <div style={{ position: 'relative' }}>
      <FormControl style={{ display: 'flex' }}>
        <DatePicker
          views={views}
          minDate={dayjs('2018-01')}
          maxDate={dayjs('2021-12')}
          value={pickedDate}
          onChange={onDatePickerChange}
        />
        <Button
          variant="contained"
          onClick={onClickButton}
          style={{ backgroundColor: 'black' }}
        >
          조회
        </Button>
      </FormControl>

      {showAlert && (
        <Alert 
          severity="error"
          style={{
            position: 'absolute',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          연도, 월을 선택해주세요.
        </Alert>
      )}
    </div>
  );
};

export default ReportDatePicker;
