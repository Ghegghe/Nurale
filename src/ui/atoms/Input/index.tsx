import {
  Button,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  forwardRef,
} from '@chakra-ui/react';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import { CSSProperties, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import '../../../index.css';

interface Props extends InputProps {
  name: string;
  type: string;
  isPassword?: boolean;
  style?: CSSProperties;
}

const InputComponent = forwardRef<Props, 'input'>(
  ({ name, isPassword, type, style, ...rest }: Props) => {
    const { register } = useFormContext();
    const [show, setShow] = useState(false);

    if (style && !style?.fontFamily) style.fontFamily = 'inherit';

    return (
      <InputGroup>
        <Input
          style={style}
          {...rest}
          {...register(name)}
          type={isPassword && !show ? 'password' : 'text'}
        />
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
  },
);

export default InputComponent;
