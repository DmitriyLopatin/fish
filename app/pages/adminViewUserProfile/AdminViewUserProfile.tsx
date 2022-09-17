import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Arrow from '../../icons/Arrow'
import { AuthService } from '../../services/AuthService'


type FormValues = {
    role_id: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    iin_bin: string;
    email: string;
    role: {
        description:string
    }
  }

const AdminViewUserProfile = () => {
    const router = useRouter()
    const id = router.query.id
    const [userDataview, setUserDataView] = useState<FormValues>()
    console.log(id)

    useEffect(() => {
        AuthService.getUser(id)
            .then(response => {
                setUserDataView(response.data),
                    console.log(response.data)
            })
    }, [id])

    return (
        <section className='adminViewUserProfile'>
            <h1>
                <Link href="/admin"><span><Arrow /></span></Link>
                <span>ПРОСМОТР ПОЛЬЗОВАТЕЛЯ</span>
            </h1>
            <div className='adminViewUserProfile__content'>
                <div>
                    <label>
                        <p>Роль</p>
                    </label>
                    <input type="text" value={userDataview?.role.description} />
                </div>
                <div>
                    <label>
                        <p>ФИО</p>
                    </label>
                    <input type="text" value={`${userDataview?.first_name} ${userDataview?.last_name}`} />
                </div>
                <div>
                    <label>
                        <p>Email</p>
                    </label>
                    <input type="text" value={userDataview?.email} />
                </div>
                <div>
                    <label>
                        <p>ИИН</p>
                    </label>
                    <input type="text" value={userDataview?.iin_bin} />
                </div>
               
            </div>
        </section>
    )
}

export default AdminViewUserProfile