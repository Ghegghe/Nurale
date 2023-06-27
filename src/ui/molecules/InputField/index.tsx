import { InputHTMLAttributes } from 'react';
import { InputComponent, LabelComponent } from '../../atoms';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  error?: string | undefined;
}

function InputField({ label, type, name, placeholder, error, ...rest }: Props) {
  return (
    <div {...rest}>
      <LabelComponent children={label} />
      <InputComponent
        placeholder={placeholder}
        type={type}
        name={name}
        style={{
          border: '1px solid rgba(81, 70, 137, 0.7)',
          borderRadius: '10px',
          padding: '10px',
          fontSize: '20px',
          color: 'rgba(4, 30, 66, 1)',
        }}
      />
    </div>
  );
}

export default InputField;
