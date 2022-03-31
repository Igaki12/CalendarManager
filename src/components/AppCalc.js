import { Search2Icon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import chakraUiVisuallyHidden from "@chakra-ui/visually-hidden";
import ApiCalendar from "react-google-calendar-api";
import { getEvents } from "../apis/calendar";

export function isSigned(){
  return ApiCalendar.sign;
}

export function AppCalc(props) {

  console.log("sign", ApiCalendar.sign)

  return (
      <Button fontSize={'2xl'} ml='2' colorScheme={'teal'} mt='-1' onClick={()=> getEvents(props)}>
        <Search2Icon />
      </Button>
  );
}
