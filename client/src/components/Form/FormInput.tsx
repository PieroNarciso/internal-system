import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';

interface FormInputProps {
  label?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string | number;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = (props) => {
  return (
    <FormControl isRequired={props.required}>
      {props.label && <FormLabel>{props.label}</FormLabel>}
      <Input
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        type={props.type ? props.type : 'text'}
        required={props.required}
      />
    </FormControl>
  );
};

export default FormInput;
