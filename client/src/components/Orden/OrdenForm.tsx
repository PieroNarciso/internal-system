import { FormControl, Input, StackProps, VStack } from '@chakra-ui/react';
import React from 'react';

interface OrdenFormProps extends Pick<StackProps, 'spacing'> {}

const OrdenForm: React.FC<OrdenFormProps> = ({ spacing, ...props }) => {
  return (
    <form>
      <VStack spacing={spacing ? spacing : '2'}>
        <FormControl></FormControl>
        <FormControl>
          <Input />
        </FormControl>
      </VStack>
    </form>
  );
};

export default OrdenForm;
