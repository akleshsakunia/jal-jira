import { DatePicker, DatePickerProps, Select, Typography } from "antd";
import dayjs from "dayjs";

import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const dateTimeFormat = "YYYY-MM-DD[T]H:mm:ss[Z]";
const dateFormat = "YYYY-MM-DD";

export const StartDateInput = ({
  handleUpdate,
  currentVal,
}: {
  handleUpdate: (key: string, value: any) => void;
  currentVal: any;
}) => {
  const handleChange: DatePickerProps["onChange"] = (date, dateString) => {
    handleUpdate("start_date", dateString || null);
  };
  return (
    <>
      <Typography.Title level={5} style={{ margin: 0 }}>
        Start Date
      </Typography.Title>
      <DatePicker
        style={{ width: "80%" }}
        onChange={handleChange}
        defaultValue={currentVal && dayjs(currentVal, dateFormat)}
        format={dateFormat}
      />
    </>
  );
};
