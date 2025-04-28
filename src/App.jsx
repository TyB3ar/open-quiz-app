import { useState } from 'react'
import './App.css'
import HomePage from './components/HomePage';
import QuestionForm from './components/QuestionForm';
import Results from './components/Results';

function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedQuestion, setSelectedQuestion] = useState('');
    const [userAnswer, setUserAnswer] = useState('');

    const handleQuestionSelect = (question) => {
      setSelectedQuestion(question);
      setCurrentPage('questionForm');
    };

    const handleAnswerSubmit = (answer) => {
      setUserAnswer(answer);
      setCurrentPage('results');
    };

    return (
      <>
        <div className="App">
          {currentPage === 'home' && <HomePage onQuestionSelect={handleQuestionSelect} />}
          {currentPage === 'questionForm' && (
            <QuestionForm question={selectedQuestion} onAnswerSubmit={handleAnswerSubmit} />
          )}
          {currentPage === 'results' && (
            <Results question={selectedQuestion} userAnswer={userAnswer} />
          )}
        </div>
        <footer>
          <p>&copy; Tyler Wronski, Coding Temple Student</p>
        </footer>
      </>
    );
}

export default App
