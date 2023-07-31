import { Input, InputProps, forwardRef } from '@chakra-ui/react';
import { CSSProperties, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import '../../../index.css';

interface Props extends InputProps {
  name: string;
  type: string;
  options: any[];
  style?: CSSProperties;
}

const SelectComponent = forwardRef<Props, 'input'>(
  ({ name, type, options, style, ...rest }: Props) => {
    const { register, setValue, control } = useFormContext();
    const [show, setShow] = useState(false);
    const {
      field: { value, onChange },
    } = useController({ control, name });

    if (style && !style?.fontFamily) style.fontFamily = 'inherit';

    return (
      <div style={{ position: 'relative' }}>
        <ul
          className='scrollbarSelect'
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            width: style?.width,
            maxHeight: '150px',
            border: style?.border,
            borderRadius: style?.borderRadius,
            borderColor: style?.borderColor,
            zIndex: 10,
            background: 'white',
          }}
        >
          <li
            onClick={() => setShow(!show)}
            style={{
              display: 'flex',
              borderColor: style?.borderColor,
            }}
          >
            <Input
              style={{
                height: '100%',
                width: '100%',
                fontFamily: style?.fontFamily,
                padding: style?.padding,
                border: 'none',
                fontSize: style?.fontSize,
                color: style?.color,
                background: style?.background,
                borderTopLeftRadius: style?.borderRadius,
                borderTopRightRadius: style?.borderRadius,
                borderBottomLeftRadius: show ? 0 : style?.borderRadius,
                borderBottomRightRadius: show ? 0 : style?.borderRadius,
              }}
              {...rest}
              {...register(name)}
              type='text'
              readOnly
              value={value}
              onChange={onChange}
            />
          </li>
          {options.map((options) => (
            <li
              key={options.id}
              onClick={() => {
                setValue(name, options.id);
                setShow(false);
              }}
              style={{
                display: show ? 'flex' : 'none',
                borderTop: style?.border,
                borderColor: style?.borderColor,
              }}
            >
              <span style={{ padding: style?.padding }}>{options.description}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  },
);

export default SelectComponent;
