import React, { useState, useEffect } from "react";
import "./quiz.scss";

function Quiz(props) {
  const [quiz, setQuiz] = useState({});
  const [answers, setSnswers] = useState([]);
  const [correct, setCorrect] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  
  useEffect(() => {
    setQuiz(props.quiz);
    setSnswers(
      shuffleArray([...props.quiz.incorrect_answers, props.quiz.correct_answer])
    );
    setCorrect(props.quiz.correct_answer);
  }, []);

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  function submitAnswer(answer) {
    if(isSubmit) return;
    setIsCorrect(answer === correct);
    props.submit({
      quiz: quiz,
      isCorrect: answer === correct,
    });
    setIsSubmit(true);
  }
  function nextStep() {
    props.setStep(props.step + 1);
  }

  return (
    <section className="quiz-container">
      <div className="quiz-wrapper">
        <div className="quiz-question-box">
          <div className="quiz-num">{props.idx + 1}</div>
          <div className="quiz-question">{quiz.question}</div>
        </div>
        <div className="quiz-answers">
          {answers.map((el, idx) => (
            <button data-testid="button" key={idx} onClick={() => submitAnswer(el)}>
              {el}
            </button>
          ))}
        </div>
        {isSubmit && (
          <div className="quiz-next">
            <div>정답: {correct}</div>
            <div className="button-box">
              <button onClick={nextStep}>다음</button>
              {isCorrect !== null && (
                <div>{isCorrect ? "Correct!" : "Incorrect"}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
export default Quiz;