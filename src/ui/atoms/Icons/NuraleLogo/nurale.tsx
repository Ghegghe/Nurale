interface Props {
  width: number;
  height: number;
  color: string;
}

function Nurale({ width, height, color }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      fill='none'
      viewBox='0 0 214 52'
    >
      <path
        fill={color}
        d='M26.834 30.542c0-6.052-3.346-9.292-8.366-9.292-5.162 0-8.508 3.276-8.508 9.292v20.79H.454V13.668H9.96v4.699c2.456-3.204 6.514-5.233 11.356-5.233 8.758 0 15.023 5.696 15.023 16.09v22.073h-9.505V30.542zM79.878 51.332h-9.576v-4.77c-2.386 3.204-6.515 5.233-11.214 5.233-8.758 0-15.095-5.696-15.095-16.02V13.703h9.505v20.72c0 6.051 3.347 9.291 8.366 9.291 5.162 0 8.438-3.275 8.438-9.292V13.668h9.576v37.664zM97.892 51.332h-9.505V13.668h9.505v5.838c2.385-3.88 6.301-6.372 11.534-6.372v10.003h-2.528c-5.624 0-9.042 2.172-9.042 9.434v18.761h.036zM129.504 13.062c6.052 0 10.182 2.848 12.425 5.981v-5.375h9.576v37.629h-9.576v-5.518c-2.243 3.275-6.515 6.123-12.496 6.123-9.505 0-17.123-7.832-17.123-19.58 0-11.712 7.618-19.26 17.194-19.26zm2.457 8.366c-5.091 0-9.933 3.81-9.933 10.93 0 7.12 4.806 11.214 9.933 11.214 5.233 0 10.003-3.952 10.003-11.072 0-7.12-4.77-11.072-10.003-11.072zM159.978.424h9.505v50.908h-9.505V.424zM194.652 51.938c-10.929 0-18.903-7.619-18.903-19.438 0-11.89 7.761-19.438 18.903-19.438 10.858 0 18.548 7.405 18.548 18.62 0 1.21-.071 2.456-.285 3.666h-27.519c.463 5.554 4.272 8.686 9.043 8.686 4.094 0 6.301-2.029 7.547-4.556h10.253c-2.029 6.942-8.295 12.46-17.587 12.46zm-9.184-22.962h17.871c-.143-4.949-4.059-8.082-8.971-8.082-4.522 0-8.153 2.92-8.9 8.082z'
      ></path>
    </svg>
  );
}

export default Nurale;