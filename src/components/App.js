import { Group } from "./Group";
import { InputDate } from "./InputDate";
import { Flex,Button, Spacer, Box } from '@chakra-ui/react';
import {DownloadIcon} from '@chakra-ui/icons';
import { GroupAdd } from "./GroupAdd";
// import { App_calc } from "../apis/calendar.js";

function App() {
  const total = 3000;
  return (
    <>
      <Box fontSize='3xl' color='purple' p='10px' backgroundSize='cover' backgroundPosition='center' backgroundImage='url(img/title.jpg)'>
        SimpleCalendarManager
        </Box>
      <Box width='100%' minHeight='100vh' paddingBottom='300px'>
      <InputDate />
      {/* <App_calc /> */}
      <Group
        groupType='search'
        groupTitle='work'
        // eventList={eventList}
        additionalRowType='perHour'
      />
      <Group
        groupType='time'
        groupTitle='daytime'
        // eventList={eventList}
        additionalRowType='perDay'
      />
      <Group
        groupType='at'
        groupTitle='central'
        // eventList={eventList}
        additionalRowType='free'
      />
      <GroupAdd />
      </Box>
      <Flex width='100%' pt='1' pb='1' pl='3' fontSize='2xl' justifyContent='center' fontWeight='bold' bgColor='green.700' color='white' position='fixed' bottom='0'>
        合計　{total}円
        <Spacer />
        <Button colorScheme='white' variant='outline' mr='4'>
          <DownloadIcon />
        </Button>
      </Flex>
    </>
  );
}

export default App;
