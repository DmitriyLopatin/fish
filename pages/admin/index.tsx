import React, { useState,useContext } from 'react'
import AdminWrapper from '../../app/component/adminWrapper/AdminWrapper'
import AdminMain from '../../app/pages/adminMain/AdminMain'
import { Context } from '../../app/utils/context'


const AdminPage = () => {

  return (
    <AdminWrapper>
      <AdminMain/>
    </AdminWrapper>
  )
}

export default AdminPage