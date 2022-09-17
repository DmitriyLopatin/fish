import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import AddUser from '../../icons/AddUser'
import ArrowUsersLeft from '../../icons/ArrowUsersLeft'
import ArrowUserRight from '../../icons/ArrowUsersRight'
import DeleteProfile from '../../icons/DeleteProfile'
import EditProfile from '../../icons/EditProfile'
import Monitoring from '../../icons/Monitoring'
import ViewProfile from '../../icons/ViewProfile'
import { AuthService } from '../../services/AuthService'

interface UserDataTypes {
  to: number;
  from: number;
  total: number;
  data: any;
  map(arg0: (item: UserDataTypes) => JSX.Element): React.ReactNode
  id:number
  email:string
  role_id: number
  iin_bin:number
  last_name: any;
  first_name: any;
  created_at: string;
  role: {
    description: string 
    status: string
  }
}

const AdminMain = () => {

  const [adminUsersList, setAdminUsersList] = useState<UserDataTypes>()
  const [perPage, setPerPage] = useState<number>(4)
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    AuthService.getUsersList(perPage,page)
      .then(response => {
        let arr = response.data
        setAdminUsersList(arr)
        console.log(response)
      })

  }, [perPage,page])

  console.log(adminUsersList)

  return (
    <section className='adminMain'>
      <h1>УПРАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯМИ</h1>
      <div className='adminMain__search'>
        <div>
          <input type="text" />
          <input type="text" />
        </div>
        <Link href="/admin/add-new-user"><button className='c-btn c-btn__primary'>Создать нового пользователя<AddUser /></button></Link>
      </div>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>ФИО</td>
            <td>МОНИТОРИНГ ДЕЙСТВИЙ</td>
            <td>ДАТА РЕГИСТРАЦИИ</td>
            <td>РОЛЬ</td>
            <td>СТАТУС</td>
            <td>ДЕЙСТВИЯ</td>
          </tr>
        </thead>
        <tbody>
          {adminUsersList && adminUsersList.data.map((item: UserDataTypes) =>
            <tr >
              <td>{item.id}</td>
              <td>{`${item.last_name} ${item.first_name}`}</td>
              <td className='adminMain__monitoring'><span><Monitoring /></span></td>
              <td>{item.created_at.slice(0, 10).split('-').reverse().join('-')}</td>
              <td>{item.role.description}</td>
              <td className='adminMain__status'>{item.role.status == 'active' ? 'Активные' : ''}</td>
              <td className='adminMain__actions'>
                <Link href={`/admin/view-user-profile/${item.id}`}><span><ViewProfile /></span></Link>
                <Link href={{pathname:`/admin/edit-user/${item.id}`,
                  query:{
                    first_name:item.first_name,
                    last_name:item.last_name,
                    iin_bin:item.iin_bin,
                    role_id:item.role_id,
                    email:item.email,
                    role_description: item.role.description} }
                    } as={`/admin/edit-user/${item.id}`} ><span><EditProfile /></span></Link>
                <span><DeleteProfile /></span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className='adminMain__usersNavbar'>
        <p>Строк на странице:
          <select onChange={e=>setPerPage(Number(e.target.value))}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option selected value="4" >4</option>
            <option value="5">5</option>
          </select>
        </p>
        <p>{`${adminUsersList && adminUsersList.from}-${adminUsersList && adminUsersList.to} из ${adminUsersList && adminUsersList.total}`}</p>
        <p className='adminMain__usersNavbar--pagination'>
          <span onClick={()=>setPage(page > 1 ? page-1 : page)}><ArrowUsersLeft /></span>
          <span onClick={()=>setPage(adminUsersList && adminUsersList.total > page*perPage ? page+1 : page)}><ArrowUserRight /></span>
        </p>
      </div>
    </section>
  )
}

export default AdminMain