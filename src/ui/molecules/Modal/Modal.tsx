import { ReactNode } from 'react';

interface Props {
  isOpen: boolean;
  onOutsudeClick?: (Props?: any) => any;
  children?: ReactNode;
}

function Modal({ isOpen, onOutsudeClick, children }: Props) {
  return (
    <div
      style={{
        display: isOpen ? 'flex' : 'none',
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        zIndex: '150',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: 'rgba(81, 70, 137, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        onClick={() => onOutsudeClick}
        style={{
          width: '100vw',
          height: '100vh',
          zIndex: '151',
          position: 'absolute',
        }}
      />
      <div
        style={{
          zIndex: '152',
          background: 'white',
          borderRadius: '20px',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
