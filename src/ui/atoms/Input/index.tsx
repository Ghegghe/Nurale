import { Input, InputProps, forwardRef } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
interface Props extends InputProps {
  name: string;
}

const InputComponent = forwardRef<Props, 'input'>(({ name, ...rest }: Props) => {
  const { register } = useFormContext();
  if (rest.style && !rest.style?.fontFamily) rest.style.fontFamily = 'inherit';
  return <Input {...rest} {...register(name)} />;
});

export default InputComponent;
