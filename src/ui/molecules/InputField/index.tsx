import { InputHTMLAttributes } from 'react';
import { InputComponent, LabelComponent } from '../../atoms';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  error?: string | undefined;
  isPassword?: boolean;
}

function InputField({
  label,
  type = 'text',
  name,
  placeholder,
  error,
  isPassword,
  ...rest
}: Props) {
  return (
    <div {...rest}>
      <span style={{ paddingBottom: '10px' }}>{label}</span>
      <InputComponent
        placeholder={placeholder}
        type={type}
        name={name}
        isPassword={isPassword}
        style={{
          border: '1px solid rgba(81, 70, 137, 0.7)',
          borderRadius: '10px',
          padding: '10px',
          fontSize: '20px',
          color: 'rgba(4, 30, 66, 1)',
          width: '100%',
        }}
      />
      <span
        style={{
          paddingTop: '10px',
          height: '18px',
          fontSize: '18px',
          fontWeight: '500',
          color: 'red',
        }}
      >
        {error}
      </span>
    </div>
  );
}

export default InputField;
