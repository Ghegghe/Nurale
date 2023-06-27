import { useEffect, useState } from 'react';
import { SwitchElement } from '../../../utils';

function Switch({
  offColor,
  onColor,
  offBGColor,
  onBGColor,
  innerSize,
  strokeSize,
  width,
  state = false,
  rtl = false,
}: SwitchElement) {
  useEffect(() => {
    setIsOn(!isOn);
  }, [state]);
  const [isOn, setIsOn] = useState(state);
  return (
    <div
      onClick={() => setIsOn(!isOn)}
      style={{
        width: `${width <= innerSize ? innerSize + strokeSize : width}px`,
        height: `${innerSize + strokeSize * 2}px`,
        borderRadius: `${(innerSize + strokeSize) / 2}px`,
        background: isOn ? onBGColor : offBGColor,
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <div
        style={{
          width: `${innerSize}px`,
          height: `${innerSize}px`,
          borderRadius: `${innerSize / 2}px`,
          background: isOn ? onColor : offColor,
          margin: `${strokeSize}px`,
          marginLeft: isOn !== rtl ? 'auto' : `${strokeSize}px`,
        }}
      ></div>
    </div>
  );
}

export default Switch;
