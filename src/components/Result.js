import React, { useState, useEffect } from "react";
import './result.scss';

function Result(props) {
  const [chartData, setChartData] = useState({});
  const [showWrongAnswers, openWrongAnswersNote] = useState(false);
  useEffect(() => {
    setChartData((prev) => ({
      ...prev,
      correct_num: props.result.filter((e) => e.isCorrect).length,
      incorrect_num: props.result.filter((e) => !e.isCorrect).length,
    }));
  }, [props]);

  function hhmmss(ms) {
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return `${hours}시간 ${minutes}분 ${seconds}초`;
  }

  function getPercent({ correct_num, incorrect_num }) {
    return (correct_num / (correct_num + incorrect_num)) * 100;
  }

  return (
    <section className="result-container">
      <div className="result-elapsedTime">{hhmmss(props.elapsedTime)}</div>
      <div className="result-chart">
        <div className={`chart percent-${getPercent(chartData)}`}>
          <div className="overlay">정답률: {getPercent(chartData)}%</div>
        </div>
        <div>정답 수 : {chartData.correct_num}</div>
        <div>오답 수 : {chartData.incorrect_num}</div>
      </div>
      <button className="result-wrong-button" onClick={() => openWrongAnswersNote(true)}>
        틀린 문제 보기
      </button>
      {showWrongAnswers && (
        <div className="result-wrong-note">
          {props.result.map((el, idx) => (
            (!el.isCorrect) ? <div key={idx}>{idx+1}. {el.quiz.question}</div> : ''
          ))}
        </div>
      )}
      <button onClick={() => props.reset()}>다시 풀기</button>
    </section>
  );
}
export default Result;
