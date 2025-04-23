import "./Select.css";
import { useState } from "react";

const Select = ({ options, value = "", name, onChange, errorMessage }) => {
    const [selected, setSelected] = useState(value);
    const handleChange = (e) => {
        onChange(e.target.value);
        setSelected(e.target.value);
    }

    return(
        <div className="select-table-form">
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
    );
};

export default Select;