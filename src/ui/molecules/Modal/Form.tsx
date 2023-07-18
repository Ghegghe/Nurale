import { Flex, Thead } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { ButtonComponent, Icons } from '../../atoms';
import { THEMES } from '../../../utils';
import { useTranslation } from 'react-i18next';

interface Props {
  label: string;
  children: ReactNode;
  onCancel: (Props: any) => void;
  onSubmit: (Props: any) => void;
}

function Form({ label, children, onCancel, onSubmit }: Props) {
  const { t } = useTranslation();
  return (
    <Flex
      flexDirection='column'
      background={THEMES.color.sWhite}
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
        fontSize={THEMES.text.fontSize.px28}
        fontWeight={THEMES.text.fontWeight.w700}
        height={'32px'}
        margin={'8px 0 8px 5px'}
        color={THEMES.color.sDarkPink}
      >
        {label}
      </Flex>
      {/* tabella */}
      <div
        style={{
          border: `1px solid ${THEMES.color.a70Indigo}`,
          borderRadius: THEMES.border.radius.px10,
          margin: '15px 0 15px 0',
          height: '100%',
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
            color: THEMES.color.sIndigo,
            background: THEMES.color.a30Indigo,
            fontSize: THEMES.text.fontSize.px20,
            fontWeight: THEMES.text.fontWeight.w700,
            width: '145px',
          }}
        >
          <Icons name='Close' size={28} color={THEMES.color.sIndigo} />{' '}
          {t('utilities.buttons.cancel')}
        </ButtonComponent>
        <ButtonComponent
          onClick={onSubmit}
          style={{
            color: THEMES.color.sWhite,
            background: THEMES.color.sDarkPink,
            fontSize: THEMES.text.fontSize.px20,
            fontWeight: THEMES.text.fontWeight.w700,
            width: '145px',
            marginLeft: '28px',
          }}
        >
          <Icons name='Confirm' size={28} color={THEMES.color.sWhite} />{' '}
          {t('utilities.buttons.confirm')}
        </ButtonComponent>
      </Flex>
    </Flex>
  );
}

export default Form;
