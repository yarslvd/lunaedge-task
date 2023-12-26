interface InputProps {
  name: string;
  placeholder?: string;
  register?: any;
  validationSchema?: any;
}

export const Input = ({name, placeholder, register, validationSchema }: InputProps) => {
  return (
    <div className='w-full'>
      <input
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
        {...register(name, validationSchema)}
        className='w-full border border-stone-400 rounded-lg px-3 py-2 hover:outline hover:outline-2 hover:outline-indigo-700
        hover:border-transparentfocus:outline focus:outline-2 focus:outline-indigo-700 focus:text-black focus:font-medium
        focus:border-transparent'
      />
    </div>
  )
}