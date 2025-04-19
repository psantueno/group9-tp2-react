import "./Button.css";

const Button = ({ type = "button", label, className, onClick }) => {
    return(
      <button type={type} className={className} onClick={onClick}>{label}</button>
    )
}

export default Button;
