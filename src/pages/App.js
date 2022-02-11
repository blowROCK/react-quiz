import React, { useState, useEffect } from "react";
import Welcome from "../components/Welcome";
import Quizzes from "../components/Quizzes";
import Result from "../components/Result";
import "./App.scss";

function App() {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(null);
  let startTime = null;
  useEffect(() => {
    if(step === 1){
      startTime = new Date();
    }
  }, [step]);

  function getResult(result) {
    setElapsedTime(new Date() - startTime);
    setResult(result);
    setStep(2)
  }
  
  function reset() {
    setStep(0);
  }

  return (
    <div className="App w100 h100">
      <div className="container flex center column w100 h100">
        {step === 0 && <Welcome step={step} setStep={setStep}></Welcome>}
        {step === 1 && <Quizzes setQuizResult={getResult}></Quizzes>}
        {step === 2 && (
          <Result result={result} reset={reset} elapsedTime={elapsedTime}></Result>
        )}
      </div>
    </div>
  );
}

export default App;
