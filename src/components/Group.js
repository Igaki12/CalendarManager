import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  Button,
  Input,
  MenuItemOption
} from "@chakra-ui/react";
import {
  SearchIcon,
  TimeIcon,
  CalendarIcon,
  AtSignIcon,
  InfoOutlineIcon,
  ChevronDownIcon
} from "@chakra-ui/icons";
export const Group = ({
  groupType,
  groupTitle,
  // eventList,
  additionalRowType
}) => {
  const eventList = [
    {
      title: "working at the cram school",
      time: 10
    },
    {
      title: "medical training",
      time: 5
    },
    {
      title: "sleep",
      time: 8
    }
  ];
  let menuScheme = 'grey';
  if (groupType === 'search') menuScheme = 'blue';
  else if (groupType === "time") menuScheme = 'purple';
  else if (groupType === "calendar") menuScheme = 'yellow';
  else if (groupType === "at") menuScheme = 'red';

  const TitleIcon = ({groupType}) => {
    if (groupType === 'search')  return <SearchIcon />;
    else if (groupType === "time") return <TimeIcon />;
    else if (groupType === "calendar") return <CalendarIcon />;
    else if (groupType === "at") return <AtSignIcon />;
    else return <InfoOutlineIcon />;
  };
  const GroupTitle = ({groupType, groupTitle}) => {
    return (
      <Flex minWidth='300px' fontSize='2xl' pl='10%' >
        <TitleIcon groupType={groupType} />
        　{groupTitle}
      </Flex>
    );
  };
  // const EventList = (eventList) => {
  //   return (
  //     <MenuList minWidth="240px" type="checkbox">
  //       {eventList.map((value,index) => (
  //         <MenuItem key={index}>{value.title}</MenuItem>
  //       ))}
  //     </MenuList>
  //   );
  // };

  const EventList = () => {
    return (
      <MenuList>
        <MenuOptionGroup title='Events' type='checkbox'>
           {eventList.map((value,index) => (
             <MenuItemOption key={index} value={index}>{value.title}</MenuItemOption>
             ))}
         </MenuOptionGroup>
       </MenuList>

    )
  }
  const AdditionalRow = ({additionalRowType}) => {
    if (additionalRowType === "perHour") {
      return (
        <Flex fontSize='2xl' ml='10%'>
          時給　<Input fontSize='2xl' size='sm' type="number" maxWidth='100px' mr='10px' />円
        </Flex>
      );
    }
    if (additionalRowType === "perDay") {
      return (
        <Flex fontSize='2xl' ml='10%'>
          日給　<Input fontSize='2xl' size='sm' type="number" maxWidth='100px' mr='10px' />円
        </Flex>
      );
    } if (additionalRowType === "free") {
      return (
        <Flex fontSize='2xl' ml='10%'>
          フリー　<Input fontSize='2xl' size='sm' maxWidth='150px' mr='10px' />
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
      <Flex ml='10%' fontSize='2xl'>個数　{eventList.length}</Flex>
      <Flex ml='10%'fontSize='2xl'>総時間　{eventHours(eventList)}</Flex>
      <AdditionalRow additionalRowType={additionalRowType} />
    </>
  );
};
