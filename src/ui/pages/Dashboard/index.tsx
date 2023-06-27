import { Flex } from '@chakra-ui/react';
import { Navbar } from '../../molecules/Layout/Navbar';
import '../styles/dashboard.css';

const DashboardPage = () => {
  return (
    <Flex style={{ flexDirection: 'column', width: '100%' }}>
      <Navbar label='HOME' />
      <div>Ciao</div>
    </Flex>
  );
};

export default DashboardPage;
