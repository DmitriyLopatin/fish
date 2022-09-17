import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import AddUser from '../../icons/AddUser'
import Arrow from '../../icons/Arrow'
import Eye from '../../icons/Eye'
import EyeClosed from '../../icons/EyeClosed'
import { AuthService } from '../../services/AuthService'


interface RolesTypes {
  id: number,
  first_name: string,
  description: string,
  status: string,
  map(arg0: (item: RolesTypes) => JSX.Element): React.ReactNode
}
type FormValues = {
  role_id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  iin_bin: string;
  email: string;
  password: string;
  confirm_password:string
}


const AdminAddNewUser = () => {

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormValues>({mode: 'onBlur'})

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit: SubmitHandler<FormValues> = (newUserData) => {
    AuthService.addUser(newUserData)
    .then(response=>console.log(response.data))
      window.location.href='/admin/add-new-user/response'
    // console.log(newUserData)
    reset();
  }

  const [showPassword, setShowPassword] = useState(true)

  const [showPasswordAgain, setShowPasswordAgain] = useState(true)

  const [role, setRole] = useState<RolesTypes>()

  useEffect(() => {
    AuthService.getRolesList()
      .then(response =>{
        setRole(response.data),
        console.log(response.data)
      }
      )
  }, [])

  return (
    <section className='adminAddNewUser'>
      <h1>
        <Link href="/admin"><span><Arrow /></span></Link>
        <span>ДОБАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ</span>
      </h1>
      <form className='adminAddNewUser__form' action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            <p>Роль</p>
            {errors.role_id && <p className="adminAddNewUser__form--required">{errors.role_id.message}</p>}
          </label>
          <select  {...register("role_id",{
            required:"Роль не выбранна",
          })}>
            <option value='' >Выберите роль</option>
            {role && role.map((item: RolesTypes) =>
              <option value={item.id}>{item.description}</option>)}
          </select>
        </div>
        <div>
          <label>
            <p>Имя</p>
            {errors.first_name && <p className="adminAddNewUser__form--required">{errors.first_name.message}</p>}
          </label>
          <input type="text" placeholder='Введите Ваше имя'{...register("first_name", { required: "Это поле должно быть заполнено" })} />
        </div>
        <div>
          <label>
            <p>Фамилия</p>
            {errors.last_name && <p className="adminAddNewUser__form--required">{errors.last_name.message}</p>}
          </label>
          <input type="text" placeholder='Введите Вашу фамилию'{...register("last_name", { required: "Это поле должно быть заполнено" })} />
        </div>
        <div>
          <label>
            <p>Отчество</p>
            {errors.middle_name && <p className="adminAddNewUser__form--required">{errors.middle_name.message}</p>}
          </label>
          <input type="text" placeholder='Введите Ваше отчество'{...register("middle_name", { required: "Это поле должно быть заполнено" })} />
        </div>
        <div>
          <label>
            <p>ИИН</p>
            {errors.iin_bin && <p className="adminAddNewUser__form--required">{errors.iin_bin.message}</p>}
          </label>
          <input type="number"  placeholder='Введите Ваш ИИН'{...register("iin_bin", { 
            required: "Это поле должно быть заполнено",
            minLength:{
              value:12,
              message:"ИИН должен содержать 12 символов"
            },
            maxLength:{
              value:12,
              message:"ИИН должен содержать 12 символов"
            },
            })} />
        </div>
        <div>
          <label>
            <p>Электронная почта</p>
            {errors.email && <p className="adminAddNewUser__form--required">{errors.email.message}</p>}
          </label>
          <input
              placeholder='Введите адресс электронной почты'
              {...register("email", {
                required: "Это поле должно быть заполнено",
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Введенный email не корректен"
                }
              })} />
        </div>

        <div className='adminAddNewUser__form--password'>
          <label>
            <p>Пароль</p>
            {errors.password && <p className="adminAddNewUser__form--required">{errors.password.message}</p>}
          </label>
          <input type={showPassword ? 'password' : 'text'} placeholder='Придумайте пароль (минимум 8 символов)' {...register("password", { 
            required: "Это поле должно быть заполнено",
            minLength:{
              value:8,
              message:'Пароль должен содержать минимум 8 символов'
            }           
            })} />
          <span className='authorization__password--eye' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <Eye /> : <EyeClosed />}</span>
        </div>

        <div className='adminAddNewUser__form--password'>
          <label>
            <p>Повтор пароля</p>
            {errors.confirm_password && <p className="adminAddNewUser__form--required">{errors.confirm_password.message}</p>}
          </label>
          <input type={showPasswordAgain ? 'password' : 'text'} placeholder='Повторите пароль' {...register("confirm_password", { required: "Это поле должно быть заполнено", validate: val => val === password.current || 'Пароли не совпадают' })} />
          <span className='authorization__password--eye' onClick={() => setShowPasswordAgain(!showPasswordAgain)}>{showPasswordAgain ? <Eye /> : <EyeClosed />}</span>
        </div>
        <button className='c-btn c-btn__addUser'>Добавить <AddUser /></button>
      </form>
    </section>
  )
}

export default AdminAddNewUser