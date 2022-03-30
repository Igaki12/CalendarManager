import { Group } from "./Group";
import { Flex,Button, Spacer, Box } from '@chakra-ui/react';
import {DownloadIcon} from '@chakra-ui/icons';
import { GroupAdd } from "./GroupAdd";
import {Events} from "./Events";
import {useEvent} from "../hooks/useEvent.js";
import {useGroup} from "../hooks/useGroup";

function App() {
  const {addGroupItem,deleteGroupItem,toggleEventCheck,groupData,calculateTotalMoney,calculateTotalSalary,toggleAdditionalRowType,deleteAllGroupItem} = useGroup();
  const {createNewEventList,showEventList} = useEvent();
  let eventData = showEventList();
  const groupList = groupData;
  if(groupData.length === 0){
    eventData = showEventList();
    addGroupItem('all','All Events',[...eventData],false,false);
  }
  return (
    <>
      <Box fontSize='3xl' color='purple' p='10px' fontWeight={'bold'}>
        SimpleCalendarManager
      </Box>
      <Box width='100%' minHeight='100vh' paddingBottom='300px'>
      <Events eventList={eventData} createNewEventList={createNewEventList} eventData={eventData} deleteAllGroupItem={deleteAllGroupItem} />
      <GroupAdd eventList={eventData} addGroupItem={addGroupItem} />
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
        {/* <Group
        id={0}
        key={-1}
        group={AllGroups}
        toggleEventCheck={toggleEventCheck}
        deleteGroupItem={deleteGroupItem}
        calculateTotalMoney={calculateTotalMoney}
        calculateTotalSalary={calculateTotalSalary}
        toggleAdditionalRowType={toggleAdditionalRowType}
         /> */}
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
