export const DeleteElement = ({handleDelete, cancelDelete, question}) => {
  return (
    <div>
      <h3>{question}</h3>
      <button onClick={()=>handleDelete()}>Aceptar</button>
      <button onClick={()=>cancelDelete()}>cancelar</button>
    </div>
  )
}