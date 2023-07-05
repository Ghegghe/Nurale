import { HTMLAttributes, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons, Switch } from '../../../atoms';
import { icons } from '../../../atoms/Icons';
import { SwitchElement } from '../../../../utils';

interface Props extends HTMLAttributes<HTMLDivElement> {
  label: string;
  link: string | null;
  image: icons;
  size?: number;
  subList?: {
    label: string;
    link: string;
  }[];
  sidebarIsOpen: boolean;
  setSidebarIsOpen: any;
  switchElement?: SwitchElement;
}

function ListElement({
  label,
  link,
  image,
  size = 25,
  subList,
  sidebarIsOpen,
  setSidebarIsOpen,
  switchElement,
  ...rest
}: Props) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const isInSubList = (subList: any[]) => {
    for (let i = 0; i < subList.length; i++) {
      if (location.pathname === subList[i].link) return true;
    }
    return false;
  };
  return (
    <div
      style={{
        marginBottom: '20px',
        display: 'grid',
        gridTemplateColumns: sidebarIsOpen ? 'repeat(2,1fr)' : 'repeat(3,1fr)',
      }}
      {...rest}
    >
      {sidebarIsOpen ? null : <div></div>}
      <div
        className='sidebarElement pointer'
        onClick={
          link !== null
            ? () => navigate(link)
            : subList
            ? !sidebarIsOpen
              ? () => {
                  setSidebarIsOpen(!sidebarIsOpen);
                  isOpen ? () => {} : setIsOpen(!isOpen);
                }
              : () => setIsOpen(!isOpen)
            : switchElement
            ? () => {
                console.log(switchElement.state);
                switchElement.state = !switchElement.state;
              }
            : () => {}
        }
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: sidebarIsOpen ? '200px' : '',
        }}
      >
        <Icons
          name={image}
          size={size}
          color={
            location.pathname === link || (subList && isInSubList(subList))
              ? 'rgba(239, 66, 111, 1)'
              : 'rgba(4, 30, 66, 1)'
          }
        />
        {sidebarIsOpen ? (
          <>
            <div
              style={{
                marginLeft: '8px',
                fontSize: '18px',
                alignSelf: 'center',
                color:
                  location.pathname === link || (subList && isInSubList(subList))
                    ? 'rgba(239, 66, 111, 1)'
                    : 'rgba(4, 30, 66, 1)',
              }}
            >
              {label}
            </div>
            {subList ? (
              <div style={{ alignSelf: 'center', marginLeft: 'auto' }}>
                <Icons name='Sublist' size={13} color='rgba(4, 30, 66, 1)' isOpen={isOpen} />
              </div>
            ) : switchElement ? (
              <div style={{ alignSelf: 'center', marginLeft: 'auto' }}>
                <Switch
                  onColor={switchElement.onColor}
                  offColor={switchElement.offColor}
                  onBGColor={switchElement.onBGColor}
                  offBGColor={switchElement.offBGColor}
                  innerSize={switchElement.innerSize}
                  strokeSize={switchElement.strokeSize}
                  width={switchElement.width}
                  state={switchElement.state}
                />
              </div>
            ) : null}
          </>
        ) : null}
      </div>
      <div
        className={
          location.pathname === link || (subList && isInSubList(subList)) ? 'sidebarIsThisPage' : ''
        }
      ></div>
      {subList && sidebarIsOpen ? (
        <>
          <div
            style={{
              display: isOpen ? 'flex' : 'none',
              flexDirection: 'column',
              paddingLeft: '20px',
              marginLeft: '15px',
              marginTop: '5px',
              borderLeft: '2px solid rgba(123, 97, 255, 0.05)',
            }}
          >
            {subList.map((list) => (
              <div
                key={list.link}
                onClick={() => navigate(list.link)}
                className='sidebarElement pointer'
                style={{
                  fontSize: '18px',
                  marginTop: '5px',
                  color:
                    location.pathname === list.link
                      ? 'rgba(239, 66, 111, 1)'
                      : 'rgba(4, 30, 66, 1)',
                }}
              >
                {list.label}
              </div>
            ))}
          </div>
          <div></div>
        </>
      ) : null}
    </div>
  );
}

export default ListElement;
