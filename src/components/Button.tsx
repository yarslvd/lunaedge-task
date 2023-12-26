interface ButtonProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  variant?: 'primary' | 'outlined' | 'text';
  disabled?: boolean
}

export const Button = ({children, size = 'base', variant = 'primary', disabled = false}: ButtonProps) => {
  const baseStyles: string = 'flex gap-1 items-center';
  const variantStyles: { [key: string]: string } = {
    primary: 'bg-indigo-800 text-white',
    outlined: 'bg-transparent border border-indigo-800 text-indigo-900',
    text: 'text-indigo-800',
  }
  const sizeVariant: { [key: string]: string } = {
    xs: 'h-5 px-1 text-md rounded-[4px]',
    sm: 'h-6 px-2 text-lg rounded-[6px]',
    base: 'h-8 px-3 text-xl rounded-md',
    lg: 'h-10 px-3 text-xl rounded-md',
    xl: 'h-12 px-4 text-xl rounded-md',
  }
  const hoverStyles: { [key: string]: string } = {
    primary: 'hover:bg-indigo-600 focus:bg-indigo-600 focus:outline-indigo-900',
    outlined: 'hover:border-indigo-600 hover:bg-indigo-100 focus:bg-indigo-100 focus:outline-indigo-900',
    text: 'hover:border-indigo-600 hover:bg-indigo-100 focus:bg-indigo-100 focus:outline-indigo-900',
  };
  const disabledStyles: string = 'disabled:bg-indigo-100 disabled:text-indigo-400';
  const svgStyles: string =
    (variant === 'outlined' || variant === 'text') && !disabled
      ? '#3730a3'
      : disabled
        ? '#818cf8'
        : '#fff';

  return (
    <button disabled={disabled}
            className={`${baseStyles} ${variantStyles[variant]} ${sizeVariant[size]} ${hoverStyles[variant]} ${disabledStyles}`}>
      <StarSvg fill={svgStyles}/>
      <span>{children}</span>
      <ArrowSvg fill={svgStyles}/>
    </button>
  )
}

const StarSvg = ({fill}: { fill: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={fill} className="w-5 h-5">
      <path fillRule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
            clipRule="evenodd"/>
    </svg>
  )
}

const ArrowSvg = ({fill}: { fill: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={fill}
         className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
    </svg>
  )
}