import { DatePicker, DatePickerProps, Typography } from "antd";
import dayjs from "dayjs";

import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const dateTimeFormat = "YYYY-MM-DD[T]H:mm:ss[Z]";
const dateFormat = "YYYY-MM-DD";

export const ResolutionDateInput = ({
  handleUpdate,
  currentVal,
}: {
  handleUpdate: (key: string, value: any) => void;
  currentVal: any;
}) => {
  const handleChange: DatePickerProps["onChange"] = (date, dateString) => {
    handleUpdate("resolution_date", dateString || null);
  };
  return (
    <>
      <Typography.Title level={5} style={{ margin: 0 }}>
        Due Date
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
