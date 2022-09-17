import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import Eye from '../../icons/Eye'
import Password from '../../icons/Password'
import Login from '../../icons/Login'
import Link from 'next/link'
import Certificate from '../../icons/Certificate'
import { AuthService } from '../../services/AuthService'
import { LocalStorageHandler } from '../../utils/localStorageService'
import { useRouter } from 'next/router'
import {Context} from '../../utils/context'

type FormValues = {
  email: string;
  password: string;
  certificate: any;

};

const Authorization = () => {
  const [showPassword, setShowPassword] = useState(true)
  const [enterType, setEnterType] = useState(true)
  const router = useRouter()
  let userData;
  

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    AuthService.signInUser(data)
    .then(response=>{
        console.log(response)
        userData = response.data
        LocalStorageHandler.setUserToken(response.data.access_token)
        window.location.href='/admin'
        // console.log(response.data.access_token);
        // router.push('/admin')
    })
  }

  return (
    
      <section className='authorization'>
        <h1>Авторизация</h1>
  
        <div className="authorization__login-type">
          <button className={enterType ? 'c-btn c-btn__white' : 'c-btn c-btn__primary'} onClick={() => setEnterType(false)}>Вход по ЭЦП</button>
          <button className={!enterType ? 'c-btn c-btn__white' : 'c-btn c-btn__primary'} onClick={() => setEnterType(true)}>Вход по логину</button>
        </div>
  
  
        <form className='authorization__form' action="" onSubmit={handleSubmit(onSubmit)}>
          {enterType ?
            <>
              <div className='authorization__login'>
                <input type='text' placeholder="Ваш логин"{...register("email")} />
                <span><Login /></span>
              </div>
              <div className='authorization__password'>
                <input type={showPassword ? 'password' : 'text'} placeholder="Ваш пароль"{...register("password")} />
                <span><Password /></span>
                <span className='authorization__password--eye' onClick={() => setShowPassword(!showPassword)}><Eye /></span>
              </div>
            </> :
            <div className='restore__file'>
              <p ><Certificate/>Загрузите сертификат</p>
              <input type='file'  {...register("certificate")}/>
            </div>}
            <button className='c-btn c-btn__primary c-btn__enter' type="submit">Войти</button>
          </form>
  
  
        <p><Link href='/restore'>Забыли пароль?</Link></p>
  
      </section>
   
  )
}

export default Authorization