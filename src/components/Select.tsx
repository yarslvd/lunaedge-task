import {useEffect, useRef, useState} from "react";

import {Badge} from "./Badge";

interface SelectProps {
  label: string;
  options?: {value: string, label: string}[];
  helpText?: string;
  optional?: boolean;
  disabled?: boolean;
  multiple?: boolean;
}

const optionsDefault = [
  {value: 'dog', label: 'Dog'},
  {value: 'cat', label: 'Cat'},
  {value: 'cow', label: 'Cow'},
  {value: 'elephant', label: 'Elephant'},
  {value: 'lion', label: 'Lion'},
  {value: 'tiger', label: 'Tiger'},
  {value: 'zebra', label: 'Zebra'},
  {value: 'giraffe', label: 'Giraffe'},
  {value: 'hippo', label: 'Hippo'},
  {value: 'rhino', label: 'Rhino'},
  {value: 'kangaroo', label: 'Kangaroo'},
  {value: 'panda', label: 'Panda'},
  {value: 'koala', label: 'Koala'},
  {value: 'monkey', label: 'Monkey'},
  {value: 'snake', label: 'Snake'},
  {value: 'crocodile', label: 'Crocodile'},
  {value: 'dolphin', label: 'Dolphin'},
  {value: 'penguin', label: 'Penguin'},
  {value: 'octopus', label: 'Octopus'},
  {value: 'seagull', label: 'Seagull'}
];

export const Select = ({
                         label = 'Label',
                         options = optionsDefault,
                         optional = false,
                         helpText = '',
                         disabled = false,
                         multiple = false
                       }: SelectProps) => {
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  //styles
  const baseStyles: string = 'relative w-full border border-stone-400 px-3 py-2 rounded-lg text-stone-800 appearance-none text-start';
  const focusStyles: string = 'focus:outline focus:outline-2 focus:outline-indigo-700 focus:text-black focus:font-medium focus:border-transparent';
  const hoverStyles: string = 'hover:outline hover:outline-2 hover:outline-indigo-700 hover:border-transparent';
  const disabledStyles: string = 'disabled:bg-indigo-100 disabled:border-indigo-200 disabled:text-indigo-300 disabled:hover:outline-none';
  const invalidStyles: string = 'invalid:border invalid:border-red-500';

  const findOption = (value: string) => {
    return currentOptions.includes(value);
  };

  const handleClearClick = () => {
    setCurrentOptions([]);
    setIsOpen(false);
  }

  const handleOutsideClick = (e: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleMultipleSelect = (e: any) => {
    const target: string = e?.target?.value || e;
    console.log(target)
    if (multiple) {
      const find = findOption(target);
      if (find) {
        const filter = currentOptions.filter((el) => el !== target);
        setCurrentOptions(filter);
      } else setCurrentOptions([...currentOptions, target]);
    }
    else {
      setCurrentOptions([e.target.value]);
      setIsOpen(false);
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="w-full min-w-[400px] flex flex-col gap-2">
      <div className="flex justify-between">
        <div className='flex items-center gap-1'>
          <label htmlFor="select" className="font-semibold">{label}</label>
          <InfoSvg/>
        </div>
        <span className='text-stone-500'>{optional && 'Optional'}</span>
      </div>
      <div className='relative w-full' ref={selectRef}>
        <button
          className={`${baseStyles} ${focusStyles} ${hoverStyles} ${disabledStyles} ${invalidStyles}`}
          aria-label='Select'
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <span className={`${currentOptions.length !== 0 && 'text-white'}`}>Select</span>
        </button>
        {multiple && currentOptions.length >= 1 ?
          <div
            className='absolute flex gap-1 w-full mr-auto overflow-x-auto scrollbar-hide max-w-[calc(100%-5rem)] z-10 left-2 top top-1/2 -translate-y-1/2'>
            {currentOptions.map((el, index) => (
              <Badge key={index} label={el.slice(0, 1).toUpperCase() + el.slice(1)} cross rounded handleClick={() => handleMultipleSelect(el)} />
            ))}
          </div> :
          <span className='absolute left-3 top top-1/2 -translate-y-1/2'>
            {currentOptions[0]}
          </span>
        }
        {
          currentOptions.length > 0 && <button
            className='absolute w-5 h-5 top-1/2 -translate-y-1/2 right-10 pointer'
            onClick={handleClearClick}
            aria-label='Clear option'
          >
            <CrossIcon/>
          </button>
        }
        {
          isOpen && <div className='absolute p-1 border border-stone-300 w-full z-10 bg-white rounded-lg max-h-60 mt-2'>
            <ul className='overflow-auto max-h-52 flex flex-col gap-1'>
              {options && options.map((el, index) => (
                <li key={index} className='flex'>
                  <input type="checkbox" name={el.value} id={el.value} value={el.label} className='appearance-none peer'
                         onChange={handleMultipleSelect} checked={findOption(el.label)}/>
                  <label htmlFor={el.value}
                         className={`w-full h-full peer-checked:bg-blue-200 p-2 select-none rounded-[4px] hover:bg-gray-200 ${
                           findOption(el.label) ? 'bg-blue-200' : ''
                         }`}
                  >
                    {el.label.slice(0, 1).toUpperCase() + el.label.slice(1)}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        }
        <div
          className='absolute w-5 h-5 top-1/2 -translate-y-1/2 right-3 pointer-events-none transition ease-in-out duration-200'
          style={isOpen ? {transform: 'rotate(180deg) translateY(50%)'} : {}}
        >
          <ArrowSvg/>
        </div>
      </div>
      {
        helpText && <span className='text-stone-500 text-md'>{helpText}</span>
      }
    </div>
  )
}

const ArrowSvg = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
         className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
    </svg>
  )
}

const InfoSvg = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
      <path fillRule="evenodd"
            d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM9 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6.75 8a.75.75 0 0 0 0 1.5h.75v1.75a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8.25 8h-1.5Z"
            clipRule="evenodd"/>
    </svg>
  )
}

const CrossIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
         className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
    </svg>
  )
}
