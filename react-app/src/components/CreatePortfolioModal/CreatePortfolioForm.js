import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPortfolioThunk } from "../../store/portfolio-store";

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
            <form onSubmit={handleSubmit}>
                <div>Create a Portfolio</div>
                <div>
                    <label>Portfolio Name</label>
                    <input
                        type="string"
                        placeholder="Name"
                        required
                        value={name}
                        onChange={updateName}
                    />
                    <div>{errors?.name}</div>

                </div>

                <div>
                    <button
                        type="submit"
                        disabled={
                            Object.values(errors).every((x) => x === "") ? false : true
                        }
                    >
                        Submit
                    </button>
                    <button
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
