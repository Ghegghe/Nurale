interface Props {
  size: number;
}

function RightArrow({ size }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill='none'
      viewBox='0 0 14 15'
    >
      <path
        fill='#fff'
        d='M13.5 6.634a1 1 0 010 1.732L2.25 14.861a1 1 0 01-1.5-.866V1.005a1 1 0 011.5-.866L13.5 6.634z'
      ></path>
    </svg>
  );
}

export default RightArrow;
