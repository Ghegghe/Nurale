interface Props {
  size: number;
  color: string;
}
function WhiteMode({ size, color }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill='none'
      viewBox='0 0 24 24'
    >
      <circle cx='12' cy='12' r='3' stroke={color} strokeWidth='2'></circle>
      <path
        stroke={color}
        strokeLinecap='round'
        strokeWidth='2'
        d='M12 5V3M12 21v-2M16.95 7.05l1.414-1.414M5.636 18.364L7.05 16.95M19 12h2M3 12h2M16.95 16.95l1.414 1.414M5.636 5.636L7.05 7.05'
      ></path>
    </svg>
  );
}

export default WhiteMode;
