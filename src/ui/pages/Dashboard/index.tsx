import { Flex } from '@chakra-ui/react';
import { Navbar } from '../../molecules/Layout/Navbar';
import '../styles/dashboard.css';
import { useTranslation } from 'react-i18next';

const DashboardPage = () => {
  const { t } = useTranslation();
  return (
    <Flex style={{ flexDirection: 'column', width: '100%' }}>
      <Navbar label={t('navbar.home')} />
      <div>Ciao</div>
    </Flex>
  );
};

export default DashboardPage;
