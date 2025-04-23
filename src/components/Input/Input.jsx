import "./Input.css";

const Input = ({ type = "text", step = "1", name, placeholder = "", value, onChange, errorMessage}) => {
    const handleChange = (e) => {
        onChange(e.target.value);
    }
    return (
        <div className="input-table-form">
            {type === "text"
                ? <input type={type} name={name} placeholder={placeholder} value={value} onChange={handleChange}/>
                : <input type={type} name={name} placeholder={placeholder} step={step} value={value} onChange={handleChange}/>
            }
            {errorMessage && <span className="error-message">{errorMessage}</span>}
        </div>
    );
};

export default Input;