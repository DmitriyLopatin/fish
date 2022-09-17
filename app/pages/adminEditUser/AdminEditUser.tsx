import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import AddUser from '../../icons/AddUser';
import Arrow from '../../icons/Arrow';
import Eye from '../../icons/Eye';
import EyeClosed from '../../icons/EyeClosed';
import { AuthService } from '../../services/AuthService';

type FormValues = {
  id: number
  role_id: number;
  first_name: string;
  last_name: string;
  middle_name: string;
  iin_bin: string;
  email: string;
  password: string;
  confirm_password: string
  role: {
    description: string
  }
}
interface RolesTypes {
  [x: string]: any;
  id: number,
  description: string,
  role_id:number
}


const AdminEditUser = () => {
  let router = useRouter()
  const id = Number(router.query.id)
  console.log(id)

  const preloadedValues = {
    first_name: router.query.first_name,
    last_name: router.query.last_name,
    iin_bin: router.query.iin_bin,
    email: router.query.email,
    id:router.query.id

  }


  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: preloadedValues
  })

  const password = useRef({});
  password.current = watch("password", "");


  const onSubmit: SubmitHandler<FormValues> = (editUserData) => {
    AuthService.editUser(id, editUserData)
      .then(response => console.log(editUserData))
    // window.location.href='/admin/add-new-user/response'
    // console.log(newUserData)
    reset();
  }

  const [showPassword, setShowPassword] = useState(true)
  const [role, setRole] = useState<RolesTypes>()
  const [userData, setUserData] = useState<FormValues>()
  const [showPasswordAgain, setShowPasswordAgain] = useState(true)


  useEffect(() => {
    AuthService.getUser(id)
      .then(response => {
        setUserData(response.data),
          console.log(response.data)
      }
      )
  }, [])
  useEffect(() => {
    AuthService.getRolesList()
      .then(response =>{
        setRole(response.data)
    console.log(response.data)})

  }, [])


  return (
    <section className='adminAddNewUser'>
      <h1>
        <Link href="/admin"><span><Arrow /></span></Link>
        <span>РЕДАКТИРОВАНИЕ ПОЛЬЗОВАТЕЛЯ</span>
      </h1>
      <form className='adminAddNewUser__form' action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            <p>Роль</p>
            {errors.role_id && <p className="adminAddNewUser__form--required">{errors.role_id.message}</p>}
          </label>
          <select  {...register("role_id", {
            required: "Роль не выбранна",
          })}>
            <option selected value={userData?.role_id}>{userData?.role.description}</option>
            {role && role.map((item: RolesTypes) => {
              if (item.id !== userData?.role_id) {
                  return <option value={item.id}>{item.description}</option>
              }
            }
            )}
          </select>
        </div>
        <div>
          <label>
            <p>Имя</p>
            {errors.first_name && <p className="adminAddNewUser__form--required">{errors.first_name.message}</p>}
          </label>
          <input type="text" {...register("first_name", { required: "Это поле должно быть заполнено" })} />
        </div>
        <div>
          <label>
            <p>Фамилия</p>
            {errors.last_name && <p className="adminAddNewUser__form--required">{errors.last_name.message}</p>}
          </label>
          <input type="text"  {...register("last_name", { required: "Это поле должно быть заполнено" })} />
        </div>
        <div>
          <label>
            <p>Отчество</p>
            {errors.middle_name && <p className="adminAddNewUser__form--required">{errors.middle_name.message}</p>}
          </label>
          <input type="text" />
        </div>
        <div>
          <label>
            <p>ИИН</p>
            {errors.iin_bin && <p className="adminAddNewUser__form--required">{errors.iin_bin.message}</p>}
          </label>
          <input type="number"  {...register("iin_bin", {
            required: "Это поле должно быть заполнено",
            // minLength:{
            //   value:12,
            //   message:"ИИН должен содержать 12 символов"
            // },
            // maxLength:{
            //   value:12,
            //   message:"ИИН должен содержать 12 символов"
            // },
          })} />
        </div>
        <div>
          <label>
            <p>Электронная почта</p>
            {errors.email && <p className="adminAddNewUser__form--required">{errors.email.message}</p>}
          </label>
          <input
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
            minLength: {
              value: 8,
              message: 'Пароль должен содержать минимум 8 символов'
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
        <button className='c-btn c-btn__addUser'>Сохранить <AddUser /></button>
      </form>
    </section>
  )
}

export default AdminEditUser

