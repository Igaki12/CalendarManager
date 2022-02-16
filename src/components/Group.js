import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  Button,
  Input,
  MenuItemOption,
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
  DeleteIcon
} from "@chakra-ui/icons";
export const Group = ({
  groupType,
  groupTitle,
  // eventList,
  additionalRowType,
  toggleEventCheck,
  deleteGroupItem,
}) => {
  const eventList = [
    {
      id:1,
      title: "working at the cram school",
      time: 10,
      check:true
    },
    {
      id:2,
      title: "medical training",
      time: 5,
      check:false
    },
    {
      id:3,
      title: "sleep",
      time: 8,
      check:true
    }
  ];
  let menuScheme = 'grey';
  if (groupType === 'search') menuScheme = 'blue';
  else if (groupType === "time") menuScheme = 'purple';
  else if (groupType === "calendar") menuScheme = 'yellow';
  else if (groupType === "at") menuScheme = 'red';

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
        <MenuOptionGroup title='Events' type='checkbox'>
          {eventList.map((value,index) => (
            <MenuItemOption key={index} value={index} isChecked={value.check? true: false} onClick={toggleEventCheck}>{value.title}</MenuItemOption>
        ))}
        </MenuOptionGroup>
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
  const AdditionalRow = ({additionalRowType}) => {
    if (additionalRowType === "perHour") {
      return (
        <Flex fontSize='xl' ml='10%'>
          時給　<Input fontSize='xl' size='sm' type="number" maxWidth='100px' mr='10px' />円
        </Flex>
      );
    }
    if (additionalRowType === "perDay") {
      return (
        <Flex fontSize='xl' ml='10%'>
          日給　<Input fontSize='xl' size='sm' type="number" maxWidth='100px' mr='10px' />円
        </Flex>
      );
    } if (additionalRowType === "free") {
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
  let eventHours = (eventList) => {
    let total = 0;
    eventList.forEach((list) => {
      total += list.time;
    });
    return total;
  };
  return (
    <>
      <Menu closeOnSelect={false}>
        <MenuButton  colorScheme={menuScheme} as={Button} rightIcon={<ChevronDownIcon />} mt='10' ml='3' mr='3'>
          <GroupTitle groupType={groupType} groupTitle={groupTitle} />
        </MenuButton>
        <EventList eventList={eventList} />
      </Menu>
      <Flex ml='10%' fontSize='xl'>個数　{eventList.length}</Flex>
      <Flex ml='10%'fontSize='xl'>総時間　{eventHours(eventList)}</Flex>
      <Flex mr={'10'}>
        <AdditionalRow additionalRowType={additionalRowType} />
        <Spacer /><Button variant={'ghost'}><DeleteIcon color={'grey'} onClick={deleteGroupItem} /></Button>
      </Flex>
    </>
  );
};
