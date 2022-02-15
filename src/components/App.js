import { Group } from "./Group";
import { InputDate } from "./InputDate";
import { Flex,Button, Spacer, Box } from '@chakra-ui/react';
import {DownloadIcon} from '@chakra-ui/icons';
import { GroupAdd } from "./GroupAdd";
import {Events} from "./Events";
// import { App_calc } from "../apis/calendar.js";

function App() {
  const total = 3000;
  const eventList = [
    {
      title: "working at the cram sch..",
      time: '12/10'
    },
    {
      title: "medical training",
      time: '12/11'
    },
    {
      title: "sleep",
      time: '12/12'
    },
    {
      title: "sleep",
      time: '12/13'
    },
    {
      title: "交通整理",
      time: '12/14'
    },
    {
      title: "sleep",
      time: '12/13'
    },
    {
      title: "sleep",
      time: '12/13'
    },
    {
      title: "sleep",
      time: '12/13'
    },
    {
      title: "sleep",
      time: '12/13'
    }
  ];
  return (
    <>
      <Box fontSize='3xl' color='purple' p='10px' fontWeight={'bold'}>
        SimpleCalendarManager
      </Box>
      <Box width='100%' minHeight='100vh' paddingBottom='300px'>
      {/* <InputDate /> */}
      <Events eventList={eventList} />
      {/* <App_calc /> */}
      <GroupAdd />
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
      </Box>
      <Flex zIndex={'1000'} width='100%' pt='1' pb='1' pl='10' fontSize='2xl' justifyContent='center' fontWeight='bold' bgColor='green.700' color='white' position='fixed' bottom='0'>
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
