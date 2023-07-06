import { HTMLAttributes } from 'react';
import { InputComponent } from '../../atoms';

interface Props extends HTMLAttributes<HTMLDivElement> {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  error?: string | undefined;
  isPassword?: boolean;
  isDisabled?: boolean;
}

function InputField({
  label,
  type = 'text',
  name,
  placeholder,
  error,
  isPassword,
  isDisabled = false,
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
        disabled={isDisabled}
        style={{
          border: '1px solid',
          borderRadius: '10px',
          padding: '10px',
          fontSize: '20px',
          color: isDisabled ? 'rgba(81, 70, 137, 0.3)' : 'rgba(4, 30, 66, 1)',
          width: '100%',
          background: isDisabled ? 'rgba(123, 97, 255, 0.05)' : '',
          borderColor: isDisabled ? 'rgba(81, 70, 137, 0.3)' : 'rgba(81, 70, 137, 0.7)',
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
