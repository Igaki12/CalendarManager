import { Box,Radio,RadioGroup,Stack,Input } from "@chakra-ui/react"
export const GroupAdd = ({inputEl}) => {
  return (
    <>
      <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' m='1' mt='5'>
      <Box bg='brown' w='100%' p={2} color='white' fontSize='2xl'>
        ＋ イベントグループを追加
      </Box>
        <RadioGroup defaultValue='1' p='1'>
          <Stack spacing={5} direction='row'>
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
        <Input mb='3' pl='4' pr='4' variant='flushed' placeholder='Search...' />
      </Box>
    </>
  )
};