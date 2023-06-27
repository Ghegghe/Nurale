import NuraleSolid from './NuraleLogo/solid';
import NuraleGradient from './NuraleLogo/gradient';
import Nurale from './NuraleLogo/nurale';
import Setting from './Sidebar/setting';
import Logout from './Sidebar/logout';
import Home from './Sidebar/home';
import Client from './Sidebar/client';
import Supplier from './Sidebar/supplier';
import Resources from './Sidebar/resources';
import Skill from './Sidebar/skill';
import Billing from './Sidebar/billing';
import Sublist from './Sidebar/sublist';
import WhiteMode from './Sidebar/whiteMode';
import Bell from './Navbar/bell';
import Account from './Navbar/account';

export type icons =
  | 'NuraleSolid'
  | 'NuraleGradient'
  | 'Nurale'
  | 'Setting'
  | 'Logout'
  | 'Home'
  | 'Client'
  | 'Supplier'
  | 'Resources'
  | 'Skill'
  | 'Billing'
  | 'Sublist'
  | 'WhiteMode'
  | 'Bell'
  | 'Account';

interface Props {
  name: icons;
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  isOpen?: boolean;
}

const Icons = ({ name, size, width, height, color, isOpen }: Props) => {
  const index = {
    NuraleSolid,
    NuraleGradient,
    Nurale,
    Setting,
    Logout,
    Home,
    Client,
    Supplier,
    Resources,
    Skill,
    Billing,
    Sublist,
    WhiteMode,
    Bell,
    Account,
  };

  const Icon = index[name];

  return (
    <Icon size={size} width={width} height={height} color={color ? color : ''} isOpen={isOpen} />
  );
};

export default Icons;
