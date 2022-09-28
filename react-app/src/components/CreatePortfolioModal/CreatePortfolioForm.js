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

        if (name.length <= 0) {
            newErrors["name"] = "Portfolio Name is required.";
        } else if (name.length > 255) {
            newErrors["name"] = "Portfolio Name must be 255 characters or less.";
        }

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
            history.push("/tokens");
        }
    };

    return (
        <>
            <form className="create-book-form" onSubmit={handleSubmit}>
                <div className="create-book-form-title">Create a Portfolio</div>
                <div className="create-book-form-body-separator-top"></div>
                <div className="create-book-modal-body">
                    <label className="create-book-form-label">Portfolio Name</label>
                    <input
                        className="create-book-form-input"
                        type="string"
                        placeholder="Name"
                        required
                        value={name}
                        onChange={updateName}
                    />
                    <div className="edit-book-form-error-message">{errors?.name}</div>
                </div>
                <div className="create-book-form-body-separator-bottom"></div>

                <div className="create-book-form-button-container">
                    <button
                        className="create-book-form-submit"
                        type="submit"
                        disabled={
                            Object.values(errors).every((x) => x === "") ? false : true
                        }
                    >
                        Submit
                    </button>
                    <button
                        className="create-book-form-cancel"
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
