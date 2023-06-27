interface Props {
  size: number;
  color: string;
}
function Account({ size, color }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill='none'
      viewBox='0 0 40 40'
    >
      <ellipse
        cx='20'
        cy='16.667'
        stroke={color}
        strokeLinecap='round'
        strokeWidth='3'
        rx='5'
        ry='5'
      ></ellipse>
      <circle cx='20' cy='20' r='15' stroke={color} strokeWidth='3'></circle>
      <path
        fill={color}
        d='M29.634 31.377a.477.477 0 00.223-.592c-.643-1.61-1.881-3.03-3.555-4.063C24.494 25.605 22.28 25 20 25s-4.494.605-6.302 1.722c-1.674 1.034-2.912 2.452-3.555 4.063-.09.224.01.476.223.592a20.019 20.019 0 0019.268 0z'
      ></path>
    </svg>
  );
}

export default Account;
