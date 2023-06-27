interface Props {
  size: number;
}

function NuraleLogoGradient({ size }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill='none'
      viewBox='0 0 73 73'
    >
      <path
        fill='url(#paint0_linear_25_308)'
        d='M42.38 39.49l3.703-6.408L35.296 22.26H24.367L9.451 47.928A29.125 29.125 0 017.137 36.5c0-16.27 13.172-29.441 29.441-29.441 7.725 0 14.774 2.99 20.007 7.867l3.24-5.589C53.559 3.997 45.442.757 36.578.757 16.82.723.8 16.743.8 36.5c0 9.363 3.596 17.871 9.47 24.244l1.602-2.777 17.942-31.043L42.381 39.49z'
      ></path>
      <path
        fill='url(#paint1_linear_25_308)'
        d='M62.53 11.9l-1.815 3.133-.214.392-1.281 2.243-16.163 28.017-12.709-12.71-3.702 6.409 11.392 11.392h10.288l15.166-26.273c1.637 3.667 2.527 7.69 2.527 11.961 0 16.27-13.172 29.442-29.441 29.442-7.974 0-15.166-3.169-20.47-8.295l-3.24 5.625a35.677 35.677 0 0023.71 9.006c19.758 0 35.778-16.02 35.778-35.778 0-9.505-3.738-18.156-9.826-24.564z'
      ></path>
      <defs>
        <linearGradient
          id='paint0_linear_25_308'
          x1='7.033'
          x2='66.055'
          y1='30.738'
          y2='30.738'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#EF426F'></stop>
          <stop offset='1' stopColor='#514689'></stop>
        </linearGradient>
        <linearGradient
          id='paint1_linear_25_308'
          x1='7.033'
          x2='66.012'
          y1='42.082'
          y2='42.082'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#EF426F'></stop>
          <stop offset='1' stopColor='#514689'></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default NuraleLogoGradient;
