import { Box, Flex, Spacer } from "@chakra-ui/react";

export const Events = ({ eventList }) => {
  return (
    <>
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
      該当イベント数:{eventList.length}件
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
      {eventList.map((value,index) => (
        <Flex key={index} color={"grey.900"} bgColor={"green.50"} mt='1' mb='1' pl='5' pr='5'>{value.title}<Spacer />{value.time}</Flex>
      ))}
    </Box>
    </>
  )
};