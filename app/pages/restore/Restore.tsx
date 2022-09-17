import Link from 'next/link';
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Email from '../../icons/Email';
import Login from '../../icons/Login'

type FormValues = {
    login: string;
    email: string
  
  };

const Restore = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ mode: 'onBlur' })

    const onSubmit: SubmitHandler<FormValues> = (data) => {
      console.log(data)
    }
  return (
    <section className='authorization'>
        <h1>Восстановление учетной записи</h1>
        <form action="" onSubmit={handleSubmit(onSubmit)}>

        <div className='authorization__login'>
          <input type='text' placeholder="Введите ИИН/логин"{...register("login")} />
          <span><Login /></span>
        </div>
        <div className='authorization__password'>
          <input type='text' placeholder="Ваш электронный адрес"{...register("email")} />
          <span><Email/></span>
        </div>
        <p className='restore__info'>Информация для восстановления пароля будет выслана вам на почту.</p>
        <button className='c-btn c-btn__primary c-btn__enter' type="submit">Отправить</button>
      </form>
      
      <p><Link href='/'>Войти</Link></p>
    </section>
  )
}

export default Restore