import { Box,Radio,RadioGroup,Stack,Input, Button, Flex } from "@chakra-ui/react";
import { PlusSquareIcon, } from "@chakra-ui/icons";

export const GroupAdd = ({inputEl}) => {
  return (
    <>
      <Box maxW='lg' borderWidth='1px' borderRadius='lg' m='1' mt='5' bgColor='orange.50'>
      <Box bg='brown' w='100%' p='2' color='white' fontSize='2xl' pl='5'>
        ＋ イベントグループを追加
      </Box>
        <RadioGroup defaultValue='1' p='1'pt='3' pb='4'>
          <Stack spacing={5} direction='row' justifyContent='center'>
            <Radio colorScheme='blue' value='1'>
              検索
            </Radio>
            <Radio colorScheme='purple' value='2'>
              時間帯
            </Radio>
            <Radio colorScheme='yellow' value='3'>
              場所
            </Radio>
            <Radio colorScheme='red' value='4'>
              期間
            </Radio>
          </Stack>
        </RadioGroup>
        <Flex>
          <Input ml='2' mb='3' pl='4' pr='4' variant='filled' placeholder='Search...' />
          <Button colorScheme='red' m='2' mt='0' mb='5'><PlusSquareIcon fontSize={"2xl"} /></Button>
        </Flex>
      </Box>
    </>
  )
};