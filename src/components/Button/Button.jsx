import "./Button.css";

export const Button = ({ type = "button", label, className, onClick }) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}>{label}
    </button>
  )
}


