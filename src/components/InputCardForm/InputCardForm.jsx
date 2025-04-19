import "./InputCardForm.css";
import { useState } from "react";

const InputCardForm = ({ type = "text", step = "1", label, value, name, icon, errorMessage}) => {
    const [newValue, setNewValue] = useState(value);
    const handleChange = (e) => {
        setNewValue(e.target.value);
    }
    return (
        <div className="input-card-form">
            <div className="label-container">
                <label htmlFor={name}>{icon}<strong>{label}:</strong> </label>
            </div>
            <div className="input-container">
                {type === "text"
                    ? <input type={type} value={newValue} name={name} onChange={handleChange}/>
                    : <input type={type} step={step} value={newValue} name={name} onChange={handleChange}/>
                }
                {errorMessage && <span className="error-message">{errorMessage}</span>}
            </div>
        </div>
    );
};

export default InputCardForm;