import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  Button,
  Input,
  MenuItem,
  Textarea,
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
} from "@chakra-ui/icons";
import { useRef } from "react";
export const Group = ({
  toggleEventCheck,
  deleteGroupItem,
  group,
  calculateTotalMoney,
}) => {
  const inputWage = useRef(null);
  // const {toggleEventCheck,createNewEventList,showEventList} = useEvent();
  const handleDeleteGroupItem = () => {
    console.log("handleDeleteGroupItem(id):" + group.id);
    return deleteGroupItem(group.id);
  }

  const handleCalculateTotalMoney = (groupId) => {
    console.log('inputWage:' + inputWage.current.value);
    calculateTotalMoney(groupId,inputWage.current.value);
    console.log(group.totalMoney);
  }
  const handleToggleEventCheck = (index) => {
    console.log(`id:${group.id} eventList[0].id:${group.eventList[index].id}`);
    // toggleEventCheck(id,eventList[index].id)
    return toggleEventCheck(group.id,group.eventList[index].id);
  }
  // createNewEventList(eventListOrigin);
  // let eventList = showEventList();
  let menuScheme = 'grey';
  if (group.groupType === 'search') menuScheme = 'blue';
  else if (group.groupType === "time") menuScheme = 'purple';
  else if (group.groupType === "calendar") menuScheme = 'yellow';
  else if (group.groupType === "at") menuScheme = 'red';

  const TitleIcon = ({groupType}) => {
    if (groupType === 'search')  return <SearchIcon mt='1' />;
    else if (groupType === "time") return <TimeIcon mt='1' />;
    else if (groupType === "calendar") return <CalendarIcon mt='1' />;
    else if (groupType === "at") return <AtSignIcon mt='1' />;
    else return <InfoOutlineIcon mt='1' />;
  };
  const GroupTitle = ({groupType, groupTitle}) => {
    return (
      <Flex minWidth='300px' fontSize='2xl' pl='10%' >
        <TitleIcon groupType={groupType} />
        　{groupTitle}
      </Flex>
    );
  };
  const EventList = ({eventList}) => {
    return (
      <MenuList type="checkbox">
        <MenuGroup title='Events' type='checkbox'>
          {eventList.map((event,index) => (
            <MenuItem key={index} value={index} onClick={() => handleToggleEventCheck(index)}>{(group.inVisibleEventId.indexOf(event.id) === -1)? <CheckIcon /> : ' ' }<Spacer />{event.title}</MenuItem>
        ))}
        </MenuGroup>
      </MenuList>
    );
  };

  // const EventList = () => {
  //   return (
  //     <MenuList>
  //       <MenuOptionGroup title='Events' type='checkbox'>
  //          {eventList.map((value,index) => (
  //            <MenuItemOption key={index} value={index} isChecked={value.check? true: false} onClick={toggleEventCheck}>{value.title}</MenuItemOption>
  //            ))}
  //        </MenuOptionGroup>
  //      </MenuList>

  //   )
  // }
  const AdditionalRow = ({group}) => {
    console.log(`additionalRowType:`);
    console.log(group.additionalRowType);
    if (group.additionalRowType === "perHour") {
      return (
        <Flex fontSize='xl' ml='10%'>
          時給　<Input fontSize='xl' size='sm' type="number" maxWidth='100px' mr='10px' 
                onInput={() => handleCalculateTotalMoney(group.id)} ref={inputWage} />円
        </Flex>
      );
    }
    if (group.additionalRowType === "perDay") {
      return (
        <Flex fontSize='xl' ml='10%'>
          日給　<Input fontSize='xl' size='sm' type="number" maxWidth='100px' mr='10px' />円
        </Flex>
      );
    } if (group.additionalRowType === "free") {
      return (
        <Flex fontSize='xl' ml='10%' lineHeight={'80px'}>
          フリー　<Textarea size='sm' maxWidth='150px' mr='10px' h={'50px'} />
        </Flex>
      );
    }
    else {
      return null;
    }
  };
  return (
    <>
      <Menu closeOnSelect={false}>
        <MenuButton  colorScheme={menuScheme} as={Button} rightIcon={<ChevronDownIcon />} mt='10' ml='3' mr='3'>
          <GroupTitle groupType={group.groupType} groupTitle={group.groupTitle} />
        </MenuButton>
        <EventList eventList={group.eventList} group={group} />
      </Menu>
      <Flex ml='10%' fontSize='xl'>個数　{group.eventList.filter(event => group.inVisibleEventId.indexOf(event.id) === -1).length}　/{group.eventList.length}</Flex>
      <Flex ml='10%'fontSize='xl' mr={'10'}>総時間　{group.eventList.filter(event => group.inVisibleEventId.indexOf(event.id) === -1).reduce((sum,event) => sum+event.time,0)}<Spacer /><Button variant={'ghost'}onClick={handleDeleteGroupItem}><DeleteIcon color={'grey'}/></Button></Flex>
      <AdditionalRow group={group} />
    </>
  );
};
