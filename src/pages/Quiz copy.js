import React, { useState, useEffect } from "react";
import _ from "lodash";
import "../style/Quiz.css"
import axios from "axios";

function Quiz() {

  const [quizObj, setQuizObj] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        "cache-control": "no-cache",
        "x-apikey": "63eca0d0478852088da682d1"
      }
    };

    const url = "https://enforcer-88e7.restdb.io/rest/quiz";

    axios
      .get(url, config)
      .then((res) => {
        const test = _.sampleSize(res.data, 15);
        setQuizObj({ test });
      })
      .catch((error) => console.log(error));
    }, []);

    console.log(quizObj);

  const questions = [
    {
      questionText: "Question 1?",
      answerOptions: [
        { answerText: "option 1", isCorrect: false },
        { answerText: "option 2", isCorrect: false },
        { answerText: "option 3", isCorrect: false },
        { answerText: "option 4", isCorrect: true }
      ]
    },
    {
      questionText: "Question 2??",
      answerOptions: [
        { answerText: "option 1", isCorrect: false },
        { answerText: "option 2", isCorrect: false },
        { answerText: "option 3", isCorrect: false },
        { answerText: "option 4", isCorrect: true }
      ]
    },
    {
      questionText: "Question 3?",
      answerOptions: [
        { answerText: "option 1", isCorrect: false },
        { answerText: "option 2", isCorrect: false },
        { answerText: "option 3", isCorrect: false },
        { answerText: "option 4", isCorrect: true }
      ]
    },
    {
      questionText: "Question 4?",
      answerOptions: [
        { answerText: "option 1", isCorrect: false },
        { answerText: "option 2", isCorrect: false },
        { answerText: "option 3", isCorrect: false },
        { answerText: "option 4", isCorrect: true }
      ]
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const handleAnswerButtonClick = (isCorrect) => {
    if (isCorrect === true) {
      setScore(score + 1);
    }

    const nextQuetions = currentQuestion + 1;
    if (nextQuetions < questions.length) {
      setCurrentQuestion(nextQuetions);
    } else {
      setShowScore(true);
    }
  };

  return (
    <>
      <h1 className="quiz-header">Quiz</h1>
      <div className="quiz-app">
        {showScore ? (
          <div className="quiz-score-section">
            You scored {score} out of {questions.length}
          </div>
        ) : (
          <>
            <div className="quiz-question-section">
              <div className="quiz-question-count">
                <span>Question {currentQuestion + 1}</span>
                /{questions.length}
              </div>
              <div className="quiz-question-text">
                {questions[currentQuestion].questionText}
              </div>
            </div>

            <div className="quiz-answer-section">
              {questions[currentQuestion].answerOptions.map((answerOptions) => (
                <button className="quiz-button"
                  onClick={() =>
                    handleAnswerButtonClick(answerOptions.isCorrect)
                  }
                >
                  {answerOptions.answerText}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Quiz;