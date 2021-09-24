import { FormControl, Input, VStack } from '@chakra-ui/react';
import React from 'react';


const OrdenForm: React.FC = () => {
  return (
    <form>
      <VStack spacing="2">
        <FormControl>
        </FormControl>
        <FormControl>
          <Input />
        </FormControl>
      </VStack>
    </form>
  )
};

export default OrdenForm;
