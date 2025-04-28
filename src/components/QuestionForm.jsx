import { useState } from "react";
import Results from "./Results";

const QuestionForm = ({ formData, onSubmit }) => {
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [error, setError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Check if formData is available and valid
    if (!formData) {
        return <p>Error: Unable to load question. Please try again later.</p>;
    }

    // Check if the question has already been answered
    if (isSubmitted) {
        return <Results selectedAnswer={selectedAnswer} />;
    }

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedAnswer) {
            setError("Please select an answer before submitting.");
            return;
        }
        setError("");
        setIsSubmitted(true);
        onSubmit(selectedAnswer);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Welcome, {formData.firstName}!</h1>
            <p>Selected Category: {formData.category}</p>
            <p>Selected Difficulty: {formData.difficulty}</p>

            <div>
                <h2>{formData.question}</h2>

                {formData.answers && formData.answers.length > 0 ? (
                    formData.answers.map((answer, index) => (
                        <div key={index}>
                            <input
                                type="radio"
                                id={`answer-${index}`}
                                name="answer"
                                value={answer}
                                onChange={(e) => setSelectedAnswer(e.target.value)}
                            />
                            <label htmlFor={`answer-${index}`}>{answer}</label>
                        </div>
                    ))
                ) : (
                    <p>Error: No answers available for this question.</p>
                )}
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit">Submit</button>
        </form>
    );
};

export default QuestionForm;

