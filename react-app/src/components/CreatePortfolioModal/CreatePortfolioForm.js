import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPortfolioThunk } from "../../store/portfolio-store";

import "./CreatePortfolioModal.css"


const CreatePortfolioForm = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState({
        name: "",
    });
    const [name, setName] = useState("");

    const updateName = (e) => setName(e.target.value);


    useEffect(() => {
        const newErrors = {};

        if (name.length <= 0) newErrors.name = "Portfolio Name is required.";
        if (name.length > 255) newErrors.name = "Portfolio Name must be 255 characters or less.";


        setErrors(newErrors);
    }, [name]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            name,
        };

        const createdPortfolio = await dispatch(createPortfolioThunk(data));

        if (createdPortfolio) {
            setErrors([]);
            setShowModal(false);
            history.push("/home");
        }
    };

    return (
        <>
            <form className="create-portfolio-form" onSubmit={handleSubmit}>
                <div className="create-portfolio-form-title">Create a Portfolio</div>
                <div className="create-portfolio-modal-body">
                    <label className="create-portfolio-form-label">PORTFOLIO NAME</label>
                    <input
                        className="create-portfolio-form-input"
                        type="string"
                        placeholder="Name"
                        required
                        value={name}
                        onChange={updateName}
                    />
                    <div className="edit-portfolio-form-error-message">{errors?.name}</div>
                </div>


                <div className="create-portfolio-button-container">
                    <button
                        className="create-portfolio-form-submit"
                        type="submit"
                        disabled={Object.values(errors).length}
                    >
                        Submit
                    </button>
                    <button
                        className="create-book-form-cancel-here"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </>
    );
};

export default CreatePortfolioForm;
