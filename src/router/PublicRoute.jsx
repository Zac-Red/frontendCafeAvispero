import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute({roleAdmin, roleClient, roleUser, userAuth}) {
  if (roleUser === roleAdmin && userAuth) {
    return <Navigate replace to={"/admin/Inicio"}/>
  }
  if (roleUser === roleClient && userAuth) {
    return <Navigate replace to={"/home/Inicio"}/>
  }
  return(
    <Outlet/>
  )
}
