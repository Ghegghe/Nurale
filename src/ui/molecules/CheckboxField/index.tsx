import { InputHTMLAttributes } from 'react';
import { CheckboxComponent, LabelComponent } from '../../atoms';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string | undefined;
}

function CheckboxField({ label, name, error, ...rest }: Props) {
  return (
    <div {...rest}>
      <CheckboxComponent
        name={name}
        style={{
          border: '1px solid rgba(81, 70, 137, 0.7)',
          borderRadius: '5px',
          width: '20px',
          height: '20px',
          marginRight: '10px',
        }}
      />
      <LabelComponent children={label} />
    </div>
  );
}

export default CheckboxField;
