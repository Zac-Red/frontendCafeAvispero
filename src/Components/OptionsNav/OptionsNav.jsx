import { Link } from "react-router-dom"

export default function OptionsNav({options=[]}) {
  return (
    <>
      {
        options.map((value)=>(
          <li key={value.option}>
            <Link to={value.url}>{value.option}</Link>
          </li>
        ))
      }
    </>
  )
}
