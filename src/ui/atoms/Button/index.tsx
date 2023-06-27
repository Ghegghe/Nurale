import { Button, ButtonProps, forwardRef } from '@chakra-ui/react';

type Props = ButtonProps;

const ButtonComponent = forwardRef<Props, 'button'>((props, ref) => {
  if (props.style && !props.style?.fontFamily) props.style.fontFamily = 'inherit';
  return <Button ref={ref} {...props} />;
});

export default ButtonComponent;
