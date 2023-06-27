import { useState } from 'react';
import { Icons } from '../../../atoms';

interface Props {
  label: string;
}

export const Navbar = ({ label }: Props) => {
  const [isAccountOpen, setIsAccountOpen] = useState(true);

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
        }}
      >
        <span style={{ margin: 'auto auto auto 22px', color: 'white' }}>{label}</span>
        <div style={{ margin: 'auto 0 auto auto', display: 'flex', flexDirection: 'row' }}>
          <div style={{ marginRight: '20px' }}>
            <Icons name='Bell' size={40} color='rgba(81, 70, 137, 0.7)' />
          </div>
          <div style={{ marginRight: '20px' }} onClick={() => setIsAccountOpen(!isAccountOpen)}>
            <Icons name='Account' size={40} color='rgba(81, 70, 137, 0.7)' />
            {isAccountOpen ? (
              <div
                style={{
                  width: '285px',
                  borderRadius: '8px',
                  boxShadow: '-2px 2px 4px 0px rgba(81, 70, 137, 0.30)',
                  position: 'absolute',
                  background: 'white',
                  right: 0,
                  marginTop: 'auto',
                }}
              >
                <ul style={{ margin: '0', listStyle: 'none', padding: '0' }}>
                  <li>uno</li>
                  <li>due</li>
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
