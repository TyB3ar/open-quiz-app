/*
Home page - when the app loads it should show a form that contains the following:
Welcome message | Title of the Page | Instructions
    - Figure out a way, that blends with the UI, to give the user instructions so they know exactly what to do
A text box and label for the user's first name
A dropdown and label for the question category - the user must have at least 4 choices that the API supports
A dropdown and label for the question difficulty - use all three choices the API supports
A submit button
An error message, stopping the form submit, if any of these inputs aren't filled out or selected.  They are all required.
NOTE: The input in the text box and dropdowns must be stored in a state object, NOT in three separate state variables  
*/
import { useState } from "react";
import QuestionForm from "./QuestionForm";

function HomePage() {
    const [formData, setFormData] = useState({
        firstName: "",
        category: "",
        difficulty: "",
    });
    const [showQuestionForm, setShowQuestionForm] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { firstName, category, difficulty } = formData;

        if (!firstName || !category || !difficulty) {
            setError("All fields are required.");
            return;
        }

        setError("");
        setShowQuestionForm(true);
        console.log("Form submitted successfully. Showing QuestionForm.");
    };

    if (showQuestionForm) {
        return <QuestionForm formData={formData} />;
    }

    return (
        <div className="home-page">
            <h1>Welcome to the Open Trivia Quiz App</h1>
            <p>Please fill out the form below to start your quiz.</p>
            <form>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="category">Question Category:</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="">Select a category</option>
                        <option value="9">General Knowledge</option>
                        <option value="21">Sports</option>
                        <option value="23">History</option>
                        <option value="27">Animals</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="difficulty">Question Difficulty:</label>
                    <select
                        id="difficulty"
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                    >
                        <option value="">Select difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                {error && <p style={{ color: 'red' }} className="error">{error}</p>}
                <button type="submit" onClick={handleSubmit}>Start Quiz</button>

            </form>
        </div>
    );
}

export default HomePage;

