import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updatePortfolioThunk } from "../../store/portfolio-store";

import "./EditPortfolioModal.css"


const EditPortfolioForm = ({ setShowModal, portfolio }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState({
        name: "",
    });
    const [name, setName] = useState(portfolio.name);

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
            id: portfolio.id,
            name,
        };

        const updatedPortfolio = await dispatch(updatePortfolioThunk(data));

        if (updatedPortfolio) {
            setErrors([]);
            setShowModal(false);
            history.push("/home");
        }
    };

    return (
        <>
            <form className="edit-portfolio-form" onSubmit={handleSubmit}>
                <div className="edit-portfolio-form-title">Edit a Portfolio</div>
                <div className="edit-portfolio-form-body-separator-top"></div>
                <div className="edit-portfolio-modal-body">
                    <label className="edit-portfolio-form-label">Portfolio Name</label>
                    <input
                        className="edit-portfolio-form-input"
                        type="string"
                        placeholder="Name"
                        
                        value={name}
                        onChange={updateName}
                    />
                    <div className="edit-portfolio-form-error-message">{errors?.name}</div>
                </div>
                <div className="edit-portfolio-form-body-separator-bottom"></div>

                <div className="edit-portfolio-form-button-container">
                    <button
                        className="edit-portfolio-form-submit"
                        type="submit"
                        disabled={Object.values(errors).length}

                    >
                        Submit
                    </button>
                    <button
                        className="edit-portfolio-form-cancel-here"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </>
    );
};

export default EditPortfolioForm;
