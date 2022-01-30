import { Input } from "@chakra-ui/react";
export const InputDate = (startDate, endDate) => {
  return (
    <>
      <Input type="date" />
      <br />
      ～<Input type="date" />
    </>
  );
};
