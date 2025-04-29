/* 
Question Form - When the user submits the form to get the question, another form should appear with the following:
The question - the type will always be multiple choice
The answers as a radio button group with labels - these must be looped through and displayed, not pulled individually 
A submit button
A conditional render that will show a message if the API call encounters an error
An error message, stopping the form submit, if an answer isn't chosen. 
*/

import { useState, useEffect } from "react";
import Results from "./Results";

const QuestionForm = ({ formData, onSubmit }) => {
    // Declare all state variables first
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [error, setError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState("");

    useEffect(() => {
        if (!formData) return; // Prevent unnecessary execution
        const fetchQuestion = async () => {
            try {
                const response = await fetch(
                    `https://opentdb.com/api.php?amount=1&category=${formData.category}&difficulty=${formData.difficulty}&type=multiple`
                );
                const data = await response.json();
                
                if (data.results && data.results.length > 0) {
                    const questionData = data.results[0];
                    setQuestion(questionData.question);
                    setAnswers([...questionData.incorrect_answers, questionData.correct_answer].sort(() => Math.random() - 0.5));
                    setCorrectAnswer(questionData.correct_answer); // Store the correct answer
                } else {
                    throw new Error("No questions found.");
                }
            } catch (error) {
                console.error("Error fetching question:", error);
            }
        };

        fetchQuestion();
    }, [formData.category, formData.difficulty]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedAnswer) {
            setError("Please select an answer before submitting.");
            return;
        }
        setError("");
        setIsCorrect(selectedAnswer === correctAnswer); // Compare selected answer to correct answer
        setIsSubmitted(true);
        onSubmit(selectedAnswer);
    };

    return (
        <div>
            {!formData ? (
                <p>Error: Unable to load question. Please try again later.</p>
            ) : isSubmitted ? (
                <Results 
                    firstName={formData.firstName}
                    isCorrect={isCorrect}
                    correctAnswer={correctAnswer}
                    onRestart={() => window.location.reload()}
                />
            ) : (
                <form onSubmit={handleSubmit}>
                    <h1>Welcome, {formData.firstName}!</h1>
                    <p>Selected Category: {formData.category}</p>
                    <p>Selected Difficulty: {formData.difficulty}</p>

                    <div>
                        <h2>{question}</h2>

                        {answers.length > 0 ? (
                            answers.map((answer, index) => (
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
            )}
        </div>
    );
};

export default QuestionForm;

