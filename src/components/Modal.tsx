import {useEffect} from "react";

interface DataTypes {
  firstName: string;
  lastName: string;
  pokemons: any[]
}

interface ModalProps {
  isOpen: boolean;
  toggle: () => void;
  data: {
    firstName: string;
    lastName: string;
    pokemons: any[]
  } | any;
  toast: any;
}

export const Modal = ({isOpen, toggle, data, toast}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const handleSave = () => {
    toast.success('Your team is chosen', {
      position: toast.POSITION.TOP_CENTER
    });
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed z-10 w-full h-full left-0 top-0 flex items-center justify-center"
          onClick={toggle}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white h-full md:h-[calc(70%)] w-full sm:w-[calc(80%)] xl:w-[calc(60%)] right-0 md:m-3 md:rounded-xl md:px-10 px-4 py-6 text-stone-800 shadow-lg flex flex-col gap-6"
          >
            <div className='flex justify-between'>
              <h1 className='text-2xl font-medium'>Your team</h1>
              <button onClick={toggle}>
                <CrossIcon />
              </button>
            </div>
            <div className='w-full h-full flex flex-col gap-3'>
              {
                data && data?.pokemons.map((el: any, index: number) => (
                  <div key={index} className='flex h-full md:gap-12 gap-4'>
                    <img src={el?.sprites?.front_default} alt={el.name}/>
                    <div className='flex flex-col justify-center'>
                      <span className='text-lg font-medium'>{el?.name.slice(0, 1).toUpperCase() + el?.name.slice(1)}</span>
                      <span>Base experience: {el.base_experience}</span>
                    </div>
                    <div className='flex flex-col justify-center gap-1'>
                      <div className='flex gap-1 items-center'>
                        <HPIcon/>
                        <span>HP: {el.stats[0].base_stat}</span>
                      </div>
                      <div className='flex gap-1 items-center'>
                        <AttackIcon />
                        <span>Attack: {el.stats[1].base_stat}</span>
                      </div>
                      <div className='flex gap-1 items-center'>
                        <DefenseIcon />
                        <span>Defense: {el.stats[2].base_stat}</span>
                      </div>
                    </div>
                    <div className='lg:flex flex-col justify-center gap-1 hidden'>
                      <div className='flex gap-1 items-center'>
                        <HeightIcon/>
                        <span>Height: {el.height}</span>
                      </div>
                      <div className='flex gap-1 items-center'>
                        <WeightIcon />
                        <span>Weight: {el.weight}</span>
                      </div>
                      <div className='flex gap-1 items-center'>
                        <SpeedIcon />
                        <span>Speed: {el.stats[5].base_stat}</span>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className='flex gap-3 justify-end'>
              <button onClick={toggle} className='font-medium px-4 text-lg'>Cancel</button>
              <button className='px-4 py-1 font-medium bg-violet-800 text-white rounded-md text-lg' onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const CrossIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
         className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
    </svg>
  )
}

const HPIcon = () => {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
    </svg>
  )
}

const SpeedIcon = () => {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" />
    </svg>
  )
}

const DefenseIcon = () => {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
    </svg>
  )
}

const HeightIcon = () => {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06l-2.47-2.47V21a.75.75 0 0 1-1.5 0V4.81L8.78 7.28a.75.75 0 0 1-1.06-1.06l3.75-3.75Z" clipRule="evenodd" />
    </svg>
  )
}

const WeightIcon = () => {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v.756a49.106 49.106 0 0 1 9.152 1 .75.75 0 0 1-.152 1.485h-1.918l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 18.75 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84l2.474-10.124H12.75v13.28c1.293.076 2.534.343 3.697.776a.75.75 0 0 1-.262 1.453h-8.37a.75.75 0 0 1-.262-1.453c1.162-.433 2.404-.7 3.697-.775V6.24H6.332l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 5.25 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84L4.168 6.241H2.25a.75.75 0 0 1-.152-1.485 49.105 49.105 0 0 1 9.152-1V3a.75.75 0 0 1 .75-.75Zm4.878 13.543 1.872-7.662 1.872 7.662h-3.744Zm-9.756 0L5.25 8.131l-1.872 7.662h3.744Z" clipRule="evenodd" />
    </svg>
  )
}

const AttackIcon = () => {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z" clipRule="evenodd" />
    </svg>
  )
}