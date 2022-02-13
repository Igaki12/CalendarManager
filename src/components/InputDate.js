import { Box, Input } from "@chakra-ui/react";
import { getEvents } from "../apis/calendar"
export const InputDate = (startDate, endDate) => {
  return (
    <Box pl='5' maxWidth='400'>
      <Input type="date" ml='-2' />
      <br />
      ～
      <Input type="date" ml='-2' />
    </Box>
  );
};
