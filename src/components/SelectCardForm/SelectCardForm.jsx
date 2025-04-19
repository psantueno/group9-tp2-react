import "./SelectCardForm.css";
import { useState } from "react";

const SelectCardForm = ({ label, icon, options, name, value = "", errorMessage }) => {
    const [selected, setSelected] = useState(value);
    const handleChange = (e) => {
        setSelected(e.target.value);
    }

    return(
        <div className="select-card-form">
            <div className="label-container">
                <label htmlFor={name}>{icon}<strong>{label}:</strong> </label>
            </div>
            <div className="select-container">
                <select name={name} value={selected} onChange={handleChange}>
                    {options.map((option) => {
                        return(
                            <option key={option.label} value={option.value}>
                                {option.label}
                            </option>
                        );
                    })}
                </select>
                {errorMessage && <span className="error-message">{errorMessage}</span>}
            </div>
        </div>
    );
};

export default SelectCardForm;