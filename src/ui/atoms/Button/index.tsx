import { Button, ButtonProps, forwardRef } from '@chakra-ui/react';

type Props = ButtonProps;

const ButtonComponent = forwardRef<Props, 'button'>((props, ref) => {
  if (props.style && !props.style?.fontFamily) props.style.fontFamily = 'inherit';
  if (props.style && !props.style?.border) props.style.border = 'none';
  if (props.style && !props.style?.borderRadius) props.style.borderRadius = '10px';
  if (props.style && !props.style?.padding) props.style.padding = '8px';
  return <Button ref={ref} {...props} />;
});

export default ButtonComponent;
