import React, { useEffect, useState } from 'react'
import AdminPanel from '../components/admin_panel'
import Footer from '../components/footer'
import Header from '../components/header'
import UserInfo from '../components/user_info'
import UserPanel from '../components/user_panel'

const UserKab = () => {
  const [isRole,setIsRole] = useState(false)

  useEffect(()=>{
    setIsRole(localStorage.getItem('role'))
  },[])

  return (
    <div>
      <Header/>
      {isRole === "admin"?<>
        <AdminPanel/>
      </>:
        <>
        <UserInfo/>
        <UserPanel/>
        </>
      }
      <Footer/>
    </div>
  )
}

export default UserKab
