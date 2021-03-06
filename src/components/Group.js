import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  Button,
  Input,
  MenuItem,
  Spacer,
} from "@chakra-ui/react";
import {
  SearchIcon,
  TimeIcon,
  CalendarIcon,
  AtSignIcon,
  InfoOutlineIcon,
  ChevronDownIcon,
  DeleteIcon,
  CheckIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { useRef } from "react";
export const Group = ({
  toggleEventCheck,
  deleteGroupItem,
  group,
  calculateTotalMoney,
  calculateTotalSalary,
  toggleAdditionalRowType,
}) => {
  const inputWage = useRef(0);
  const inputSalary = useRef(0);
  // const {toggleEventCheck,createNewEventList,showEventList} = useEvent();
  const handleDeleteGroupItem = () => {
    console.log("handleDeleteGroupItem(id):" + group.id);
    return deleteGroupItem(group.id);
  }

  const handleCalculateTotalMoney = (groupId) => {
    console.log('inputWage:' + inputWage.current.value);
    inputSalary.current.value = 0;
    calculateTotalMoney(groupId,inputWage.current.value);
    console.log(group.totalMoney);
    return;
  }
  const handleCalculateTotalSalary = () => {
    inputWage.current.value = 0;
    calculateTotalSalary(group.id,inputSalary.current.value);
    return;
  }
  const handleToggleEventCheck = (index) => {
    console.log(`id:${group.id} eventList[0].id:${group.eventList[index].id}`);
    toggleEventCheck(group.id,group.eventList[index].id);
    calculateTotalMoney(group.id,inputWage.current.value);
    return ;
  }
  let menuScheme = 'grey';
  if (group.groupType === 'search') menuScheme = 'blue';
  // else if (group.groupType === "time") menuScheme = 'purple';
  // else if (group.groupType === "weekend") menuScheme = 'red';
  else if (group.groupType === "at") menuScheme = 'yellow';
  else if (group.groupType === "all") menuScheme = 'green';
  if(group.weekendOnly) menuScheme = 'pink';
  if(group.nightOnly) menuScheme = 'purple';
  if(group.weekendOnly && group.nightOnly) menuScheme = 'red';

  const TitleIcon = ({groupType}) => {
    if (groupType === 'search')  return <SearchIcon mt='1' />;
    // else if (groupType === "time") return <TimeIcon mt='1' />;
    // else if (groupType === "weekend") return <CalendarIcon mt='1' />;
    else if (groupType === "at") return <AtSignIcon mt='1' />;
    else return <InfoOutlineIcon mt='1' />;
  };
  const GroupTitle = ({groupType, groupTitle}) => {
    return (
      <Flex minWidth='300px' fontSize='2xl' pl='10%' >
        <TitleIcon groupType={groupType} />
        ???{groupTitle}
      </Flex>
    );
  };
  const EventList = ({eventList}) => {
    return (
      <MenuList type="checkbox">
        <MenuGroup title='Events' type='checkbox'>
          {eventList.map((event,index) => (
            <MenuItem key={index} value={index} onClick={() => handleToggleEventCheck(index)}>{(group.inVisibleEventId.indexOf(event.id) === -1)? <CheckIcon /> : '???' }???{event.start.dateTime.split("T")[0].slice(5)}<Spacer />???"{event.summary}"</MenuItem>
        ))}
        </MenuGroup>
      </MenuList>
    );
  };
  const PerHourComponent = ({group}) => {
    let display = 'flex';
    if(group.additionalRowType === 'perDay'){
      display = 'none';
    }
    return(
        <Flex fontSize='xl' ml='10%' display={display}>
          <Button fontSize={'xl'} colorScheme={menuScheme} variant='outline' mt={'-1'} mr='5' onClick={() => toggleAdditionalRowType(group.id)}>
            <EditIcon />??????
          </Button>
          <Input fontSize='xl' size='sm' type="number" maxWidth='100px' mr='10px' 
                onBlur={() => handleCalculateTotalMoney(group.id)} ref={inputWage} defaultValue={inputWage.current.value} />???
        </Flex>
    )
  };
  const PerDayComponent = ({group}) => {
    let display = 'none';
    if(group.additionalRowType === 'perDay'){
      display = 'flex';
    }
    return (
        <Flex fontSize='xl' ml='10%' display={display}>
        <Button fontSize={'xl'} colorScheme={menuScheme} variant='solid' mt={'-1'} mr='5' onClick={() => toggleAdditionalRowType(group.id)}>
          <EditIcon />??????
        </Button>
        <Input fontSize='xl' size='sm' type="number" maxWidth='150px' mr='10px'
                 onBlur={handleCalculateTotalSalary} ref={inputSalary} defaultValue={inputSalary.current.value} />???
        </Flex>
  );
};
  return (
    <>
      <Menu closeOnSelect={false}>
        <MenuButton  colorScheme={menuScheme} as={Button} rightIcon={<ChevronDownIcon />} mt='10' ml='3' mr='3'>
          <GroupTitle groupType={group.groupType} groupTitle={group.groupTitle} />
        </MenuButton>
        <EventList eventList={group.eventList} group={group} />
      </Menu>
      <Flex ml='10%' fontSize='xl'>?????????{group.eventList.filter(event => group.inVisibleEventId.indexOf(event.id) === -1).length}???/???{group.eventList.length}</Flex>
      <Flex minH={'10'} ml='10%'fontSize='xl' mr={'10'}>????????????{Math.round(group.eventList.filter(event => group.inVisibleEventId.indexOf(event.id) === -1).reduce((sum,event) => sum+event.time,0)*10)/10}<Spacer />{group.groupType==='all' ? '' :<Button variant={'ghost'}onClick={handleDeleteGroupItem}><DeleteIcon color={'grey'}/></Button>}</Flex>
      <PerHourComponent group={group} />
      <PerDayComponent group={group} />
    </>
  );
};
