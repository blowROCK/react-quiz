import React, { useState, useEffect } from "react";
import './quizzes.scss';
import Quiz from "./Quiz";
import axios from "axios";

function Quizzes(props) {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const iterate = (quiz) => {
      const tempQuiz = {};
      Object.keys(quiz).forEach((key) => {
        tempQuiz[key] =
          typeof quiz[key] === "string" ? htmlDecode(quiz[key]) : quiz[key];
        if (typeof quiz[key] === "object" && quiz[key] !== null) {
          iterate(quiz[key]);
        }
      });
      return tempQuiz;
    };

    const fetchQuizzes = async () => {
      try {
        setError(null);
        setQuizzes(null);
        setLoading(true);
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=10&type=multiple"
        );
        const { results } = response.data;
        const decodedQuizzes = results.map((quiz) => iterate(quiz));
        setQuizzes(decodedQuizzes);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  useEffect(() => {
    document.querySelector("#Quizzes")
      .scrollTo({
        top: document.querySelector("#Quizzes").scrollHeight,
        behavior: "smooth" 
      });
  }, [step]);


  function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }
  
  function submitAnswer(isCurrect) {
    setResult((old) => [...old, isCurrect]);
  }

  function nextStep(step) {
    setStep(step);
    if (quizzes.length + 1 === step) {
      props.setQuizResult(result);
    }
  }

  return (
    <div id="Quizzes" className="w100">
      <div>
        <div className="loadgin">{loading === true ? "loading..." : ""}</div>
        {error && <div>Error가 발생 했습니다.</div>}
        {quizzes &&
          quizzes.map((quiz, idx) => {
            return (
              step > idx && (
                <Quiz
                  quiz={quiz}
                  key={idx}
                  idx={idx}
                  step={step}
                  setStep={nextStep}
                  submit={submitAnswer}
                ></Quiz>
              )
            );
          })}
      </div>
    </div>
  );
}
export default Quizzes;