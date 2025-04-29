import { useState } from 'react'
import './App.css'
import HomePage from './components/HomePage';
import QuestionForm from './components/QuestionForm';
import Results from './components/Results';

function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [userAnswer, setUserAnswer] = useState('');

    const handleQuestionSelect = (question) => {
      setSelectedQuestion(question);
      setCurrentPage('questionForm');
    };

    const handleAnswerSubmit = (answer) => {
      setUserAnswer(answer);
      setCurrentPage('results');
    };

    const handleRestart = () => {
      setUserAnswer('');
      setCurrentPage('home');
    }; 

    return (
      <>
        <div className="App">
          {currentPage === 'home' && <HomePage onQuestionSelect={handleQuestionSelect} />}
          {currentPage === 'questionForm' && (
            <QuestionForm formData={formData} onSubmit={handleAnswerSubmit} />
          )}
          {currentPage === 'results' && (
            <Results firstName={formData.firstName} isCorrect={isCorrect} correctAnswer={correctAnswer} onRestart={handleRestart} />
          )}
        </div>
        <footer>
          <p>&copy; Tyler Wronski, Coding Temple Student</p>
        </footer>
      </>
    );
}

export default App
