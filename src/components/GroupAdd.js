import { Box,Radio,RadioGroup,Stack,Input, Button, Flex } from "@chakra-ui/react";
import { PlusSquareIcon, } from "@chakra-ui/icons";
import { useGroup } from "../hooks/useGroup";
import { useState,useRef } from "react";

export const GroupAdd = ({eventList}) => {
  const {addGroupItem} = useGroup();
  const [type,setType] = useState('search');
  const inputEl = useRef(null);
  const handleAddGroupItem = () => {
    console.log(`${type},${inputEl}`);
    if(inputEl.current.value === "") return;
    addGroupItem(type,inputEl,eventList[0]);
    inputEl.current.value = "";
  };
  return (
    <>
      <Box maxW='lg' borderWidth='1px' borderRadius='lg' m='1' mt='5' bgColor='orange.50'>
      <Box bg='brown' w='100%' p='2' color='white' fontSize='2xl' pl='5'>
        ＋ イベントグループを追加
      </Box>
        <RadioGroup defaultValue='1' p='1'pt='3' pb='4' onChange={setType} value={type}>
          <Stack spacing={5} direction='row' justifyContent='center'>
            <Radio colorScheme='blue' value='search'>
              検索
            </Radio>
            <Radio colorScheme='purple' value='time'>
              時間帯
            </Radio>
            <Radio colorScheme='yellow' value='at'>
              場所
            </Radio>
            <Radio colorScheme='red' value='calendar'>
              期間
            </Radio>
          </Stack>
        </RadioGroup>
        <Flex>
          <Input ml='2' mb='3' pl='4' pr='4' variant='filled' placeholder='Search...' ref={inputEl} />
          <Button colorScheme='red' m='2' mt='0' mb='5' onClick={handleAddGroupItem}><PlusSquareIcon fontSize={"2xl"} /></Button>
        </Flex>
      </Box>
    </>
  )
};