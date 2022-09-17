import React, { useEffect, useState } from 'react'
import AdminWrapper from '../../../app/component/adminWrapper/AdminWrapper'
import AdminEditUser from '../../../app/pages/adminEditUser/AdminEditUser'
import { AuthService } from '../../../app/services/AuthService'



const AdminEditUserPage = () => {

  return (
    <AdminWrapper>
      <AdminEditUser />
    </AdminWrapper>
  )
}

export default AdminEditUserPage










