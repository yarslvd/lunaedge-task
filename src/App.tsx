import {useCallback, useEffect, useState} from "react";
import {FieldErrors, SubmitHandler, useForm} from "react-hook-form";
import {toast, ToastContainer} from 'react-toastify';
import axios from "axios";
import {debounce} from "lodash";

import 'react-toastify/dist/ReactToastify.css';

import {Select} from "./components/Select";
import {Input} from "./components/Input";
import {Button} from "./components/Button";
import {Modal} from "./components/Modal";
import useModal from "./hooks/useModal";

type Inputs = {
  firstName: string;
  lastName: string;
  pokemons: string[];
}

function App() {
  const [pokemons, setPokemons] = useState<{ value: string, label: string, data?: any }[]>([]);
  const [selectedPokemons, setSelectedPokemons] = useState<string[]>([]);
  const [submittedData, setSubmittedData] = useState({});

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Inputs>();

  const {isOpen, toggle} = useModal();

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=30').then((res) => constructList(res.data.results));
  }, []);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (selectedPokemons.length !== 4) {
      return toast.error("You have to select team of 4 pokemons", {
        position: toast.POSITION.TOP_CENTER
      });
    }
    data.pokemons = [];
    selectedPokemons.map((el, index) => {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${el}`).then((el) => {
        data.pokemons.push(el.data)
        if (index === 3) {
          setSubmittedData(data);
          toggle();
        }
      });
    });
  }

  const constructList = (data: { name: string, url: string }[]) => {
    const obj: { value: string, label: string }[] = [];
    data.map(el => {
      obj.push({value: el.name, label: el.name});
    });
    setPokemons(obj);
  }

  const onError = (errors: FieldErrors) => {
    if (errors) {
      const errArr = Object.values(errors);
      const err: any = errArr[0]?.message;
      toast.error(err, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }
  const debouncedSearch = useCallback(
    debounce(async (val: string) => {
      val = val.toLowerCase();
      try {
        if (val === '') {
          const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=30');
          constructList(response.data.results);
        } else {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${val}`);
          if (response?.data) {
            setPokemons([{value: response.data.name, label: response.data.name, data: response.data}]);
          } else setPokemons([]);
        }
      } catch (err: any) {
        console.error('Error fetching data!', err);
        if (err.response?.status === 404) setPokemons([]);
      }
    }, 500),
    []
  );

  const handleSearch = (val: string) => {
    debouncedSearch(val);
  }

  const validation = {
    minLength: {
      value: 2,
      message: "Please enter a minimum of 2 characters"
    },
    maxLength: {
      value: 12,
      message: "Please enter a less than 12 characters"
    },
    pattern: {
      value: /^[A-Za-z]+$/,
      message: 'Please enter letters only',
    },
    required: "Fill all required fields"
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='max-w-[400px] my-10'>
        <img src="https://cdn.pixabay.com/photo/2019/11/27/14/06/pokemon-4657023_960_720.png" alt="Pockemon Icon" className='w-32 h-32 m-auto'/>
        <h1 className='text-4xl text-center font-bold'>POKEMON TEAM PICKER</h1>
      </div>
      <form
        className='w-full max-w-[400px] flex flex-col gap-4'
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
      >
        <Input
          name='firstName'
          placeholder='First Name'
          register={register}
          validationSchema={validation}
        />
        <Input
          name='lastName'
          placeholder='Last Name'
          register={register}
          validationSchema={validation}
        />
        <Select
          label='Select your team'
          options={pokemons}
          onChange={handleSearch}
          setValue={setSelectedPokemons}
          multiple
          search
        />
        <Button size='lg'>Confirm</Button>
      </form>
      <ToastContainer
        position="top-center"
        closeOnClick
        autoClose={2000}
      />
      <Modal isOpen={isOpen} toggle={toggle} data={submittedData} toast={toast}/>
    </div>
  )
}

export default App
