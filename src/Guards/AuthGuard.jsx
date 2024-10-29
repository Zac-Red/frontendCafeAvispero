import { Navigate } from "react-router-dom"
import { Layout } from "../Components/Layout/Layout";

export const AuthGuard = ({userAuth, MainURLs}) => {
  return (userAuth  
    ? <>
        <Layout MainURLs={MainURLs}/>
      </>
    :  <Navigate replace to={"/"}/>
    )
}
