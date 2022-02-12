import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
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
  id,
  groupType,
  groupTitle,
  // eventList,
  additionalRowType
}) => {
  const eventList = [
    {
      title: "working in the cram school",
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
  const TitleIcon = (groupType) => {
    if (groupType === "search") return <SearchIcon />;
    else if (groupType === "time") return <TimeIcon />;
    else if (groupType === "calendar") return <CalendarIcon />;
    else if (groupType === "at") return <AtSignIcon />;
    else return <InfoOutlineIcon />;
  };
  const GroupTitle = ({id, groupType, groupTitle}) => {
    return (
      <Flex minWidth='200px' >
        {id}
        <TitleIcon groupType={groupType} />
        {groupTitle}
      </Flex>
    );
  };
  // const EventList = (eventList) => {
  //   return (
  //     <MenuList minWidth="240px" type="checkbox" defaultChecked>
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
             <MenuItemOption key={index} value={index} >{value.title}</MenuItemOption>
             ))}

         </MenuOptionGroup>
       </MenuList>

    )
  }
  const AdditionalRow = (additionalRowType) => {
    if (additionalRowType === "perHour") {
      return (
        <Flex>
          時給 <Input variant="filled" type="number" />
        </Flex>
      );
    }
    if (additionalRowType === "perDay") {
      return (
        <Flex>
          日給 <Input variant="filled" type="number" />
        </Flex>
      );
    } else {
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
    <br />
      <Menu closeOnSelect={false}>
        <MenuButton  colorScheme='blue' as={Button} rightIcon={<ChevronDownIcon />}>
          <GroupTitle id={id} groupType={groupType} groupTitle={groupTitle} />
        </MenuButton>
        <EventList eventList={eventList} />
      </Menu>
      <Flex>個数 {eventList.length}</Flex>
      <Flex>総時間 {eventHours(eventList)}</Flex>
      <AdditionalRow additionalRowType={additionalRowType} />
    </>
  );
};
