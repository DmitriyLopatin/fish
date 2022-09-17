
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import Arrow from '../../icons/Arrow'
import CatalogsControll from '../../icons/CatalogsControll'
import Exit from '../../icons/Exit'
import Main from '../../icons/Main'
import Notification from '../../icons/Notification'
import RecoveryRequests from '../../icons/RecoveryRequests'
import RegistrationRequests from '../../icons/RegistrationRequests'
import RolesControll from '../../icons/RolesControll'
import Settings from '../../icons/Settings'
import UsersControll from '../../icons/UsersControll'
import { useAuthContext } from '../../utils/context'
import { LocalStorageHandler } from '../../utils/localStorageService'

interface Props {
    children: React.ReactNode;
    title?: string;
}

const AdminWrapper: React.FC<Props> = ({ children }) => {

    const { userData, updatedUserData } = useAuthContext()
    const [lang, setLang] = useState(true)
    const [userMenu, setUserMenu] = useState(false)
    const [asideMenu, setAsideMenu] = useState(1)
    const [asideSubMenu, setAsiSubdeMenu] = useState(false)

    function handleLanguageMenu() {
        setUserMenu(!userMenu)
    }

    useEffect(() => {
        if (userMenu) {
            window.addEventListener('click', handleLanguageMenu)
        }
        return () => {
            window.removeEventListener('click', handleLanguageMenu);
        };
    }, [userMenu])

    return (
        <>
            <header className='header'>
                <div className='wrapper__title'>
                    <img src="/assets/images/Logo.png" alt="" />
                    <div className='wrapper__title--text'>
                        <h3>МОНИТОРИНГ РЫБ И ДРУГИХ ВОДНЫХ ЖИВОТНЫХ</h3>
                        <p>Министерство экологогии, геологии и природных ресурсов Республики казахстан</p>
                    </div>
                </div>
                <div className='header__right'>
                    <div className='wrapper__language admin__language'>
                        <span className={lang ? 'wrapper__language--chosen' : ''} onClick={() => setLang(true)}>Kz</span>
                        <span className={!lang ? 'wrapper__language--chosen' : ''} onClick={() => setLang(false)}>Ru</span>
                    </div>
                    <Notification />
                    <div className='c-btn c-btn__primary c-btn__admin'>
                        <div>
                            <p>{`${userData?.first_name} ${userData?.last_name}`}</p>
                            <p>{userData?.role.description}</p>
                        </div>
                        <span className={userMenu ? 'header__arrow--upsideDown' : 'header__arrow'} onClick={(e) => { setUserMenu(!userMenu); e.stopPropagation() }}><Arrow /></span>
                        <menu className={userMenu ? '' : 'none'}>
                            <p><Settings /><span>Настроки</span></p>
                            <Link href='/'><p onClick={() => LocalStorageHandler.clearUserToken()}><Exit /><span>Выход</span></p></Link>
                        </menu>
                    </div>
                </div>
            </header>
            <main>
                <aside>
                    <ul>
                        <li className={asideMenu == 0 ? 'aside__primary' : ''} onClick={() => setAsideMenu(0)}>< Main/><span>Главная</span></li>
                        <li className={asideMenu == 1 ? 'aside__primary' : ''} onClick={() => setAsideMenu(1)}><UsersControll /><span>Управление пользователями</span><span className={asideSubMenu ? 'header__arrow--upsideDown' : 'header__arrow'} onClick={() => setAsiSubdeMenu(!asideSubMenu)}><Arrow /></span></li>
                        <ul className={asideSubMenu ? 'none' : ''}>
                            <li><RegistrationRequests />Заявки на регистрацию</li>
                            <li><RecoveryRequests />Заявки на восстановление</li>
                        </ul>

                        <li className={asideMenu == 2 ? 'aside__primary' : ''} onClick={() => setAsideMenu(2)}><CatalogsControll /><span>Управление справочниками</span></li>
                        <li className={asideMenu == 3 ? 'aside__primary' : ''} onClick={() => setAsideMenu(3)}><RolesControll /><span>Управление ролями</span></li>
                    </ul>
                </aside>
                {children}
            </main>
        </>
    )
}

export default AdminWrapper