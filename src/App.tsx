import {useEffect, useState} from "react";
import {FieldErrors, SubmitHandler, useForm} from "react-hook-form";
import {toast, ToastContainer} from 'react-toastify';
import axios from "axios";

import 'react-toastify/dist/ReactToastify.css';

import {Select} from "./components/Select";
import {Input} from "./components/Input";
import {Button} from "./components/Button";

type Inputs = {
  firstName: string
  lastName: string
}

function App() {
  const [pokemons, setPokemons] = useState<{ value: string, label: string }[]>([]);
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Inputs>();

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=30').then((res) => constructList(res.data.results));
  }, []);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
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
    console.log(errors);
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
    <div className='flex flex-col justify-center items-center mt-64'>
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
        <Select label='Select your team' options={pokemons} multiple/>
        <Button size='lg'>Confirm</Button>
      </form>
      <ToastContainer
        position="top-center"
        closeOnClick
        autoClose={2000}
      />
    </div>
  )
}

export default App
