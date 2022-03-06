import { Group } from "./Group";
import { InputDate } from "./InputDate";
import { Flex,Button, Spacer, Box } from '@chakra-ui/react';
import {DownloadIcon} from '@chakra-ui/icons';
import { GroupAdd } from "./GroupAdd";
import {Events} from "./Events";
import {useEvent} from "../hooks/useEvent.js";
import {useGroup} from "../hooks/useGroup";
import { AppCalc } from "../apis/calendar.js";

function App() {
  const {addGroupItem,deleteGroupItem,toggleEventCheck,showGroupList,calculateTotalMoney,calculateTotalSalary,toggleAdditionalRowType} = useGroup();
  const {createNewEventList,showEventList} = useEvent();
  const eventList = showEventList();
  if(showGroupList().length === 0){
  // addGroupItem('search','work',[...eventList].splice(0,5));
  addGroupItem('time','daytime',[...eventList].splice(1,4));
  // addGroupItem('at','central',[...eventList].splice(2,3));
  }
  if(showGroupList().length === 1){
    addGroupItem('search','work',[...eventList].splice(0,5))
  }if(showGroupList().length === 2){
    addGroupItem('at','central',[...eventList].splice(2,3))
  }
  const groupList = showGroupList();
//   const groupList = [
//     {
//       id:1,
//       groupType:'search',
//       groupTitle: 'work',
//       eventList:[eventList[0],eventList[3],eventList[5]],
//       additionalRowType: 'perHour',
//     },{
//       id:2,
//       groupType:'time',
//       groupTitle: 'daytime',
//       eventList:[eventList[0],eventList[1],eventList[2]],
//       additionalRowType: 'perDay',
//     },{
//       id:3,
//       groupType:'at',
//       groupTitle: 'central',
//       eventList:[eventList[0],eventList[1],eventList[2]],
//       additionalRowType: 'free',
//     }
// ];
  return (
    <>
      <Box fontSize='3xl' color='purple' p='10px' fontWeight={'bold'}>
        SimpleCalendarManager
      </Box>
      <Box width='100%' minHeight='100vh' paddingBottom='300px'>
      {/* <InputDate /> */}
      <Events eventList={eventList} />
      {/* <AppCalc /> */}
      <GroupAdd eventList={eventList} addGroupItem={addGroupItem} />
      {groupList.map((value,index) => (
        <Group 
        id={value.id}
        key={index}
        group={value}
        toggleEventCheck={toggleEventCheck}
        deleteGroupItem={deleteGroupItem}
        calculateTotalMoney={calculateTotalMoney}
        calculateTotalSalary={calculateTotalSalary}
        toggleAdditionalRowType={toggleAdditionalRowType}
         />
      ))}
      </Box>
      <Flex zIndex={'1000'} width='100%' pt='1' pb='1' pl='10' fontSize='2xl' justifyContent='center' fontWeight='bold' bgColor='green.700' color='white' position='fixed' bottom='0'>
        合計　{groupList.reduce((sum,group) => sum + group.totalMoney,0).toLocaleString()}円
        <Spacer />
        <Button colorScheme='white' variant='outline' mr='4'>
          <DownloadIcon />
        </Button>
      </Flex>
    </>
  );
}

export default App;
