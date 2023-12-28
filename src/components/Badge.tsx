interface BadgeProps {
  label: string;
  rounded?: boolean;
  cross?: boolean;
  badgeIcon?: boolean;
  paddingX?: 'sm' | 'lg';
  color?: 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'violet' | 'purple' | 'pink' | 'black' | 'orange';
  handleClick?: (e: any) => void;
}

export const Badge = ({
                        label = 'Badge',
                        rounded = false,
                        cross = false,
                        badgeIcon = false,
                        paddingX = 'sm',
                        color = 'gray',
                        handleClick
                      }: BadgeProps) => {
  const baseStyles: string = 'flex gap-1 items-center';
  const paddingStyles: { [key: string]: string } = {
    sm: 'px-[10px]',
    lg: 'px-4'
  }
  const roundedStyles: string = rounded ? 'rounded-full' : 'rounded-[4px]';
  const colorStyles: { [key: string]: string } = {
    gray: 'bg-gray-200 text-gray-700',
    red: 'bg-red-200 text-red-900',
    yellow: 'bg-amber-100 text-amber-900',
    green: 'bg-emerald-100 text-emerald-800',
    blue: 'bg-blue-200 text-blue-800',
    violet: 'bg-violet-100 text-violet-800',
    purple: 'bg-purple-200 text-purple-800',
    pink: 'bg-pink-100 text-pink-900',
    black: 'bg-gray-800 text-gray-300',
    orange: 'bg-orange-100 text-orange-900'
  }
  const badgeStyles: { [key: string]: string } = {
    gray: 'bg-gray-400',
    red: 'bg-red-400',
    yellow: 'bg-amber-300',
    green: 'bg-emerald-300',
    blue: 'bg-blue-400',
    violet: 'bg-violet-300',
    purple: 'bg-purple-400',
    pink: 'bg-pink-300',
    black: 'bg-gray-300',
    orange: 'bg-orange-300'
  }

  return (
    <div className={`${baseStyles} ${colorStyles[color]} ${roundedStyles} ${paddingStyles[paddingX]}`}>
      {badgeIcon && <div className={`w-1.5 h-1.5 rounded-full mr-1 ${badgeStyles[color]}`}/>}
      <span>{label}</span>
      {cross && <button
        onClick={handleClick}
        className='w-full h-full'
        aria-label='Remove option'
        type='button'
      >
        <CrossSvg fill={`${badgeStyles[color]}`}/>
      </button>}
    </div>
  )
}

const CrossSvg = ({fill}: { fill: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
         className={`${'fill' + fill.slice(2)} w-4 h-4 -mr-2 cursor-pointer`}>
      <path
        d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z"/>
    </svg>
  )
}