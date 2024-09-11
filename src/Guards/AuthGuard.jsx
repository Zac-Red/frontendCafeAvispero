import { Navigate } from "react-router-dom"
import { Layout } from "../Components/Layout/Layout";

const AuthGuard = ({userAuth}) => {  
  return (userAuth  
  ? <>
      <Layout/>
    </>
  :  <Navigate replace to={"/"}/>
  )
}

export default AuthGuard