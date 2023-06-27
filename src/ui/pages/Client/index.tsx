import { Flex } from '@chakra-ui/react';
import { Navbar } from '../../molecules/Layout/Navbar';
import '../styles/dashboard.css';

const ClientPage = () => {
  return (
    <Flex style={{ flexDirection: 'column', width: '100%' }}>
      <Navbar label='CLIENTS' />
      <div>Ciao</div>
    </Flex>
  );
};

export default ClientPage;
