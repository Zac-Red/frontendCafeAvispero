import { Outlet, Navigate } from "react-router-dom"

export const PublicGuard = ({userAuth}) => {
  return (!userAuth  
    ? <>
        <Outlet/>
      </>
    :  <Navigate replace to={"/admin"}/>
  )
}
