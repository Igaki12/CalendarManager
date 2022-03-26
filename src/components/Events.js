import { Box, Button, Flex, Input, Spacer,NumberInput,NumberInputField,NumberInputStepper,NumberIncrementStepper,NumberDecrementStepper } from "@chakra-ui/react";
import { EditIcon, Search2Icon } from "@chakra-ui/icons";
import { AppCalc } from "../apis/calendar";
import { useRef } from "react";

export const Events = ({createNewEventList,eventData,deleteAllGroupItem }) => {
  let thisDate = new Date();
  thisDate.setDate(thisDate.getDate() - 30);
  const today = `${('0000' + (thisDate).getFullYear()).slice(-4)}-${('00' + ((thisDate).getMonth() + 1)).slice(-2)}-${('00' + ((thisDate).getDate())).slice(-2)}`;
  const startDate = useRef({value: today});
  const range = useRef({value: 30});
  return (
    <>
    <Box fontSize={'xl'}
    textAlign='right'
    borderRadius='lg'
    bgColor={"green.50"}
    borderWidth='1px'
    borderStyle={'double'}
    m='1'
    maxW={'lg'}
    >
      <Box bg='green.900' w='100%' p='2' color='white' fontSize='2xl' pl='5' textAlign={'left'}>
        <EditIcon mr={'1'} /> カレンダーの予定を取得
      </Box>
      <Box p={'2'}>
        <Input type={'date'} fontSize='2xl' variant={'filled'} defaultValue={today} textAlign="center" ref={startDate} />
        <Flex justifyContent={'right'} m='3'>
          から
          <NumberInput mt={'-1'} mr='2' ml='2' defaultValue={30} id="searchingRange">
            <NumberInputField width='150px' fontSize='2xl' textAlign={"center"} ref={range}/>
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>日間
          <AppCalc
            eventList={eventData}
            createNewEventList={createNewEventList}
            eventData={eventData}
            deleteAllGroupItem={deleteAllGroupItem}
            startDate={startDate.current.value}
            range={range.current.value}
            />
          </Flex>
      </Box>
    </Box>
    <Box
    maxW='300px'
    borderWidth='1px'
    borderRadius='lg'
    overflow='auto'
    color='white'
    bgColor={"green.900"}
    fontWeight='bold'
    ml='50' mr='50' mt='3' mb='0' p={"1"}
    textAlign='center'
    >
      取得イベント数:{eventData.length}件
    </Box>
    <Box
    maxW='300px'
    borderWidth='1px'
    borderRadius='lg'
    minH={100}
    maxH='200'
    overflow='auto'
    m={2} mt='1' ml='50' mr='50' pl='1' pr='1'
    >
      {eventData.map((value,index) => (
        <Flex key={index} color={"grey.900"} bgColor={"green.50"} mt='1' mb='1' pl='5' pr='5'>{value.start.dateTime.split("T")[0].slice(5)}<Spacer />{value.summary}</Flex>
      ))}
    </Box>
    </>
  )
};