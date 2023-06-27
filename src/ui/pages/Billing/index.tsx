import { Flex } from '@chakra-ui/react';
import { Navbar } from '../../molecules/Layout/Navbar';
import '../styles/dashboard.css';

const BillingPage = () => {
  return (
    <Flex style={{ flexDirection: 'column', width: '100%' }}>
      <Navbar label='BILLING' />
      <div>Ciao</div>
    </Flex>
  );
};

export default BillingPage;
