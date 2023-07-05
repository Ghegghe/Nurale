import {
  Button,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  forwardRef,
} from '@chakra-ui/react';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
interface Props extends InputProps {
  name: string;
  isPassword?: boolean;
}

const InputComponent = forwardRef<Props, 'input'>(({ name, isPassword, ...rest }: Props) => {
  const { register } = useFormContext();
  const [show, setShow] = useState(false);

  if (rest.style && !rest.style?.fontFamily) rest.style.fontFamily = 'inherit';

  return (
    <InputGroup>
      <Input {...rest} {...register(name)} type={isPassword && !show ? 'password' : 'text'} />
      {isPassword ? (
        <InputRightElement style={{}}>
          <Button style={{ border: 'none', background: 'none' }} onClick={() => setShow(!show)}>
            {show ? (
              <ViewIcon width={'18px'} height={'18px'} />
            ) : (
              <ViewOffIcon width={'18px'} height={'18px'} />
            )}
          </Button>
        </InputRightElement>
      ) : null}
    </InputGroup>
  );
});

export default InputComponent;
