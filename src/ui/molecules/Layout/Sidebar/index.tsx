import HideSidebar from '../../../atoms/Icons/Sidebar/hideSidebar';
import { useEffect, useState } from 'react';
import { Icons } from '../../../atoms';
import { SIDEBAR } from '../../../../utils/constant/sidebar';
import ListElement from './ListElement';
import { ROUTES } from '../../../../utils';

const Sidebar = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

  useEffect(() => {}, [location.pathname]);

  return (
    <div
      style={{
        width: sidebarIsOpen ? '260px' : '60px',
        height: '100%',
        zIndex: '100',
        display: 'flex',
        flexDirection: 'column',
      }}
      className='sidebar'
    >
      <HideSidebar
        onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
        isOpen={sidebarIsOpen}
        size={25}
        style={{
          marginLeft: sidebarIsOpen ? '250px' : '50px',
          marginTop: '80px',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '15px',
          marginBottom: '65px',
        }}
      >
        <hr
          style={{
            margin: '0 0 35px 0px',
            width: sidebarIsOpen ? '205px' : '50px',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Icons name='NuraleGradient' size={40} />
          {sidebarIsOpen ? (
            <div style={{ paddingLeft: '26px', alignSelf: 'center' }}>
              <Icons name='Nurale' height={29} width={120} color='#041E42' />
            </div>
          ) : null}
        </div>
      </div>
      {/* menu */}
      <div
        className='scrollbar-y'
        style={{
          fontWeight: 600,
          direction: 'rtl',
          display: 'grid',
          gridTemplateColumns: '1fr',
        }}
      >
        <div style={{ direction: 'ltr', width: sidebarIsOpen ? '225px' : 'auto', marginLeft: '0' }}>
          {SIDEBAR.map((sidebar) => (
            <ListElement
              key={sidebar.link}
              label={sidebar.label}
              image={sidebar.image}
              link={sidebar.link}
              subList={sidebar.subList}
              sidebarIsOpen={sidebarIsOpen}
              setSidebarIsOpen={setSidebarIsOpen}
            />
          ))}
        </div>
      </div>
      {/* menu sotto */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 'auto',
          fontWeight: 500,
        }}
      >
        <hr
          style={{
            margin: '0 0 20px 0px',
            width: sidebarIsOpen ? '205px' : '50px',
          }}
        />
        <div style={{ marginLeft: sidebarIsOpen ? '35px' : '0' }}>
          <ListElement
            label='Impostazioni account'
            link={ROUTES.account}
            image='Setting'
            size={20}
            sidebarIsOpen={sidebarIsOpen}
            setSidebarIsOpen={setSidebarIsOpen}
          />
          <ListElement
            label='Log out'
            link={ROUTES.login}
            image='Logout'
            size={20}
            sidebarIsOpen={sidebarIsOpen}
            setSidebarIsOpen={setSidebarIsOpen}
          />
          <ListElement
            label='Modalità scura'
            link={null}
            image='WhiteMode'
            size={20}
            sidebarIsOpen={sidebarIsOpen}
            setSidebarIsOpen={setSidebarIsOpen}
            switchElement={{
              onColor: 'white',
              offColor: 'white',
              onBGColor: 'rgba(239, 66, 111, 1)',
              offBGColor: 'rgba(81, 70, 137, 0.5)',
              innerSize: 14,
              strokeSize: 2,
              width: 38,
              state: false,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
