import { HTMLAttributes } from 'react';
import { SelectComponent } from '../../atoms';
import '../../../index.css';

interface Props extends HTMLAttributes<HTMLDivElement> {
  label: string;
  type?: string;
  name: string;
  inputFontSize: string;
  placeholder?: string;
  error?: string | undefined;
  options: any[];
}

function SelectField({
  label,
  type = 'text',
  name,
  inputFontSize,
  placeholder,
  error,
  options,
  ...rest
}: Props) {
  return (
    <div {...rest}>
      <span style={{ paddingBottom: '10px', paddingLeft: '5px' }}>{label}</span>
      <SelectComponent
        placeholder={placeholder}
        type={type}
        name={name}
        options={options}
        style={{
          border: '1px solid',
          borderRadius: '10px',
          padding: '10px',
          fontSize: inputFontSize,
          color: 'rgba(4, 30, 66, 1)',
          width: '100%',
          borderColor: 'rgba(81, 70, 137, 0.7)',
        }}
      />
      <span
        style={{
          paddingTop: '10px',
          height: '18px',
          fontSize: inputFontSize,
          fontWeight: '500',
          color: 'red',
        }}
      >
        {error}
      </span>
    </div>
  );
}

export default SelectField;
