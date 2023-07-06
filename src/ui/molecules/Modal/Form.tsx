import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { ButtonComponent, Icons } from '../../atoms';

interface Props {
  label: string;
  children: ReactNode;
  onCancel: (Props: any) => void;
  onSubmit: (Props: any) => void;
}

function Form({ label, children, onCancel, onSubmit }: Props) {
  return (
    <Flex
      flexDirection='column'
      background='white'
      position='absolute'
      height='100%'
      zIndex={0}
      top={0}
      left={0}
      width='100%'
    >
      {/* sopra tabella */}
      <Flex
        flexDirection={'row'}
        fontSize={28}
        fontWeight={700}
        height={'32px'}
        margin={'8px 0 8px 0'}
        color={'rgba(239, 66, 111, 1)'}
      >
        {label}
      </Flex>
      {/* tabella */}
      <div
        style={{
          border: '1px solid rgba(81, 70, 137, 0.7)',
          borderRadius: '10px',
          margin: '15px 0 15px 0',
          height: '100%',
          fontSize: '20px',
          padding: '15px 20px',
        }}
      >
        {children}
      </div>
      {/* sotto tabella */}
      <Flex flexDirection={'row'} alignItems={'center'} margin='0 15px 0 auto'>
        <ButtonComponent
          onClick={onCancel}
          style={{
            color: 'rgba(81, 70, 137, 1)',
            background: 'rgba(81, 70, 137, 0.3)',
            fontSize: '22px',
            fontWeight: '700',
            width: '145px',
          }}
        >
          <Icons name='Close' size={28} color='rgba(81, 70, 137, 1)' /> Annulla
        </ButtonComponent>
        <ButtonComponent
          onClick={onSubmit}
          style={{
            color: 'white',
            background: 'rgba(239, 66, 111, 1)',
            fontSize: '22px',
            fontWeight: '700',
            width: '145px',
            marginLeft: '28px',
          }}
        >
          <Icons name='Confirm' size={28} color='white' /> Conferma
        </ButtonComponent>
      </Flex>
    </Flex>
  );
}

export default Form;
