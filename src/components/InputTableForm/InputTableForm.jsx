import "./InputTableForm.css";

const InputTableForm = ({ type = "text", step = "1", value, onChange, errorMessage}) => {
    const handleChange = (e) => {
        onChange(e.target.value);
    }
    return (
        <div className="input-table-form">
            {type === "text"
                ? <input type={type} value={value} onChange={handleChange}/>
                : <input type={type} step={step} value={value} onChange={handleChange}/>
            }
            {errorMessage && <span className="error-message">{errorMessage}</span>}
        </div>
    );
};

export default InputTableForm;