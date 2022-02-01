import { Input } from "@chakra-ui/react";
import { getEvents } from "../apis/calendar"
export const InputDate = (startDate, endDate) => {
  return (
    <>
      <Input type="date" onClick={getEvents()} />
      <br />
      ～<Input type="date" />
    </>
  );
};
