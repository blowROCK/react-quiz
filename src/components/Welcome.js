import React from "react";
import welcomeLogo from "./../assets/welcome.webp";
import "./welcome.scss";

function Welcome(props) {
  function onClick() {
    props.setStep(props.step + 1);
  }
  return (
    <div id="Welcome">
      <div className="welcome-container">
        <img className="welcome-image" src={welcomeLogo} alt="logo" />
        <div className="welcom-title">반갑습니다~ 지원자 박수봉의 과제입니다.</div>
        <div>
          <button className="welcome-button" onClick={() => onClick()}>
            퀴즈 풀기
          </button>
        </div>
      </div>
    </div>
  );
}
export default Welcome;