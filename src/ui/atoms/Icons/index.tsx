import NuraleSolid from './NuraleLogo/solid';
import NuraleGradient from './NuraleLogo/gradient';
import Nurale from './NuraleLogo/nurale';
import { Add, LeftArrow, RightArrow, Close, Edit, Delete, Confirm, MagnifyingGlass } from './Pages';
import Account from './Navbar/account';
import Bell from './Navbar/bell';
import {
  Setting,
  Logout,
  Home,
  Client,
  Supplier,
  Resources,
  Billing,
  Sublist,
  WhiteMode,
  Skill,
  Clock,
} from './Sidebar';
import { SVGProps } from 'react';

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
  | 'Account'
  | 'Add'
  | 'LeftArrow'
  | 'RightArrow'
  | 'Close'
  | 'Clock'
  | 'Edit'
  | 'Delete'
  | 'Confirm'
  | 'MagnifyingGlass';

interface Props extends SVGProps<SVGSVGElement> {
  name: icons;
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  isOpen?: boolean;
  rotation?: string;
}

const Icons = ({ name, size, width, height, color, isOpen, rotation, ...rest }: Props) => {
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
    Add,
    LeftArrow,
    RightArrow,
    Close,
    Clock,
    Edit,
    Delete,
    Confirm,
    MagnifyingGlass,
  };

  const Icon = index[name];

  return (
    <Icon
      size={size}
      width={width}
      height={height}
      color={color ? color : ''}
      isOpen={isOpen}
      rotation={rotation}
      {...rest}
    />
  );
};

export default Icons;
