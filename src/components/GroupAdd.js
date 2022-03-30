import { Box,Radio,RadioGroup,Stack,Input, Button, Flex,MenuButton,Menu,Spacer,MenuItem,MenuGroup,MenuList, Checkbox } from "@chakra-ui/react";
import { PlusSquareIcon,ChevronDownIcon,CalendarIcon,AtSignIcon,SearchIcon,TimeIcon,InfoOutlineIcon } from "@chakra-ui/icons";
import { useState,useRef } from "react";

export const GroupAdd = ({eventList,addGroupItem}) => {
  const [type,setType] = useState('search');
  const inputEl = useRef(null);
  const [groupTitle,setGroupTitle] = useState('');
  const [caution,setCaution] = useState('　');
  const handleAddGroupItem = () => {
    console.log(`${type},${inputEl.current.value}`);
    if(inputEl.current.value === "") return;
    if(inputEl.current.value.length > 14) return;
    let addedEventList = eventList;
    if(type === 'search'){
      addedEventList = [...eventList].filter((event)=> event.summary.indexOf(inputEl.current.value) !== -1);
    }
    if(type === 'at'){
      addedEventList = [...eventList].filter((event)=>{
        if(event.location){
          return event.location.indexOf(inputEl.current.value) !== -1;
        }
      });
    }
    // ここに今後場所等についての挙動を追加
    console.log(addedEventList);
    if(addedEventList.length === 0) return setCaution('条件に合うイベントが見つかりません');
    addGroupItem(type,inputEl.current.value,addedEventList);
    inputEl.current.value = "";
    setGroupTitle('');
  };
  const predictGroup = () => {
    console.log(`predictGroup:${type},${inputEl.current.value}`);
    setGroupTitle(inputEl.current.value);
    let addedEventList = eventList;
    if(type === 'search'){
      addedEventList = [...eventList].filter((event)=> event.summary.indexOf(inputEl.current.value) !== -1);
    }
    if(type === 'at'){
      addedEventList = [...eventList].filter((event) => {
        if(event.location){
          return event.location.indexOf(inputEl.current.value) !== -1;
        }
      })
    }
    if(type === 'weekend'){
      addedEventList = [...eventList].filter((event)=> {
        let weekendFlag = 0;
        let t = event.startDateTime;
        while(t.getTime() < event.endDateTime.getTime()){
          if(t.getDay() === 0 || t.getDay() === 6){
            weekendFlag = 1;
            break;
          }
          t.setMinutes(t.getMinutes() + 5);
        }
        return weekendFlag === 1;
      })
    }
    // ここに今後場所等についての挙動を追加
    console.log(addedEventList);
    if(addedEventList.length === 0) setCaution('条件に合うイベントが見つかりません');
    else if(inputEl.current.value.length > 14) setCaution('文字数が多すぎます');
    else setCaution('');
  };

let predictEventList = [...eventList];
  if(type === 'search'){
    predictEventList = [...eventList].filter((event)=> event.summary.indexOf(groupTitle) !== -1);
  }
  if(type === 'at'){
    predictEventList = [...eventList].filter((event)=> {
      if(event.location){
        return event.location.indexOf(groupTitle) !== -1
      }
    });
    }
  // ここに今後場所などについての挙動を追加
  const PredictiveGroup = ({eventList,groupTitle}) => {
    const totalHours = eventList.reduce((sum,event) => sum + event.time,0);
    let menuScheme = 'grey';
    if (type === 'search') menuScheme = 'blue';
    else if (type === "at") menuScheme = 'red';
    else if (type === "time") menuScheme = 'purple';
    else if (type === "weekend") menuScheme = 'yellow';
    const TitleIcon = ({groupType}) => {
      if (groupType === 'search')  return <SearchIcon mt='1' />;
      else if (groupType === "at") return <AtSignIcon mt='1' />;
      else if (groupType === "time") return <TimeIcon mt='1' />;
      else if (groupType === "weekend") return <CalendarIcon mt='1' />;
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
              <MenuItem key={index} value={index}>{event.start.dateTime.split("T")[0]}　"{event.summary}"</MenuItem>
          ))}
          </MenuGroup>
        </MenuList>
      );
    };
    return(
      <Box display={(groupTitle ==='')? 'none':'display'} >
      <Menu closeOnSelect={false}>
        <MenuButton variant='outline' colorScheme={menuScheme} as={Button} rightIcon={<ChevronDownIcon />} mt='-2' ml='3' mr='3'>
          <GroupTitle groupType={type} groupTitle={groupTitle} />
        </MenuButton>
        <EventList eventList={eventList} />
      </Menu>
      <Flex ml='10%' fontSize='xl' color={'grey'}>個数　{eventList.length}</Flex>
      <Flex ml='10%'fontSize='xl' mr={'10'} color='grey'>総時間　{totalHours}<Spacer /></Flex>
      </Box>
      );
  };
  return (
    <>
      <Box maxW='lg' borderWidth='1px' borderRadius='lg' m='1' mt='5' bgColor='orange.50'>
      <Box bg='brown' w='100%' p='2' color='white' fontSize='2xl' pl='5'>
        ＋ イベントグループを追加
      </Box>
        <RadioGroup defaultValue='1' p='1' pt='3' pb={'4'} onChange={setType} value={type}>
          <Stack spacing={5} direction='row' justifyContent='center'>
            <Radio colorScheme='blue' value='search' checked>
              検索
            </Radio>
            <Radio colorScheme='yellow' value='at'>
              場所
            </Radio>
            {/* <Radio colorScheme='yellow' value='time' isDisabled>
              夜間のみ
            </Radio>
            <Radio colorScheme='red' value='weekend'>
              土日のみ
            </Radio> */}
            <Checkbox colorScheme='purple' isDisabled>
              夜間のみ
            </Checkbox>
            <Checkbox colorScheme={'red'} isDisabled>
              土日のみ
            </Checkbox>
          </Stack>
        </RadioGroup>
        <Flex>
          <Input ml='3' mb='3' pl='4' pr='4' variant='filled' placeholder='Search...' ref={inputEl} onChange={predictGroup} />
          <Button colorScheme='red' m='2' mt='0' mb='5' onClick={handleAddGroupItem}><PlusSquareIcon fontSize={"2xl"} /></Button>
        </Flex>
        <PredictiveGroup  eventList={predictEventList} groupTitle={groupTitle} />
        <Flex pb={'5'} color='tomato' fontWeight={'bold'}><Spacer />{caution}<Spacer/></Flex>
      </Box>
    </>
  )
};