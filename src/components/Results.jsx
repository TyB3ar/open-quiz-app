import React from 'react';

/*
 Results Section - When the user submits their answer, another section should appear with the following:
A message containing the user's name, telling them whether they answered the question wrong or right
A message telling them the correct answer if they answered incorrectly
A button that will allow them to start over and get another question
*/
const Results = ({ firstName, isCorrect, correctAnswer, onRestart }) => {
    return (
        <div className="results-section">
            <h2>Results</h2>
            <p>
                {isCorrect
                    ? `Congratulations, ${firstName}! You answered correctly.`
                    : `Sorry, ${firstName}. That was incorrect.`}
            </p>
            {!isCorrect && (
                <p>The correct answer was: <strong>{correctAnswer}</strong></p>
            )}
            <button onClick={onRestart}>Start Over</button>
        </div>
    );
};

export default Results;