
export const DefaultButton = ({action, label}) => {
  return (
    <button className="topButton" onClick={() => action()}>
      <span className="topButtontransition"></span>
      <span className="topButtongradient"></span>
      <span className="topButtonlabel">{label}</span>
    </button>
  )
}
