import { Checkbox, CheckboxProps, forwardRef } from '@chakra-ui/react';

const CheckboxComponent = forwardRef<CheckboxProps, 'input'>((props, ref) => {
  if (props.style && !props.style?.fontFamily) props.style.fontFamily = 'inherit';
  return <Checkbox ref={ref} {...props} />;
});

export default CheckboxComponent;
