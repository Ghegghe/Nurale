import { useState } from 'react';
import { Icons } from '../../../atoms';
import { removeTokenCookies } from '../../../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../utils';

interface Props {
  label: string;
}

export const Navbar = ({ label }: Props) => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div
        className='navbar'
        style={{
          fontSize: '22px',
          display: 'flex',
          flexDirection: 'row',
          borderRadius: '0 0 20px 0',
          boxShadow: '0 2px 6px 0 rgba(81, 70, 137, 0.30)',
          zIndex: 100,
        }}
      >
        <span style={{ margin: 'auto auto auto 22px', color: 'white' }}>{label}</span>
        <div style={{ margin: 'auto 0 auto auto', display: 'flex', flexDirection: 'row' }}>
          <div className='pointer' style={{ marginRight: '20px' }}>
            <Icons name='Bell' size={40} color='rgba(81, 70, 137, 0.7)' />
          </div>
          <div
            className='pointer'
            style={{ marginRight: '20px' }}
            onClick={() => setIsAccountOpen(!isAccountOpen)}
          >
            <Icons
              name='Account'
              size={40}
              color={isAccountOpen ? 'rgba(239, 66, 111, 1)' : 'rgba(81, 70, 137, 0.7)'}
            />
          </div>
        </div>
      </div>
      {isAccountOpen ? (
        <div
          style={{
            width: '285px',
            borderRadius: '8px',
            boxShadow: '-2px 2px 4px 0px rgba(81, 70, 137, 0.30)',
            position: 'absolute',
            background: 'white',
            right: 0,
            top: '52px',
            padding: '20px',
            marginTop: 'auto ',
            zIndex: '50',
          }}
        >
          <div className='sidebarElement pointer' style={{ display: 'flex', flexDirection: 'row' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '20px',
                background: 'rgba(239, 66, 111, 1)',
                color: 'white',
                display: 'flex',
              }}
            >
              <span style={{ margin: 'auto' }}>AM</span>
            </div>
            <span style={{ margin: 'auto auto auto 10px' }}>Andrea Moschella</span>
          </div>

          <hr className='hrgray' style={{ margin: '16px 0 16px 0' }} />

          <div
            className='sidebarElement pointer'
            style={{ display: 'flex', flexDirection: 'row' }}
            onClick={() => {
              removeTokenCookies();
              navigate(ROUTES.login);
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icons name='Logout' size={28} />
            </div>
            <span style={{ margin: 'auto auto auto 10px' }}>Log out</span>
          </div>
        </div>
      ) : null}
    </>
  );
};
