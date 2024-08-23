import React, { useState } from "react";
import "../styles/carousel.css";

const Carousel = ({ steps, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");

  if (!steps || steps.length === 0) {
    return <div>No steps available</div>;
  }

  const isLastStep = currentStep === steps.length;
  const isComplete = Object.keys(answers).length === steps.length;

  const handleDotClick = (index) => {
    if (index < currentStep || (isComplete && index === steps.length)) {
      setCurrentStep(index);
      setError("");
    } else {
      setError("Select step first.");
    }
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else if (currentStep === steps.length - 1) {
      setCurrentStep(steps.length);
    }
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < steps.length) {
      setError("You need to complete all steps before submitting.");
      return;
    }
    onSubmit(answers);
    setCurrentStep(0);
  };

  return (
    <div className="carousel">
      <div className="steps-indicator">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`step-dot ${
              index <= currentStep || isComplete ? "active" : ""
            }`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
        {isComplete && (
          <div
            className={`step-dot ${
              currentStep === steps.length ? "active" : ""
            }`}
            onClick={() => handleDotClick(steps.length)}
          ></div>
        )}
      </div>
      <div
        className="slides"
        style={{ transform: `translateY(-${currentStep * 100}vh)` }}
      >
        {steps.map((step, index) => (
          <div className="slide step_content" key={index}>
            <div className="step_title">
              <h2>{step.title || "Untitled"}</h2>
            </div>
            <div className="step_icon">
              {step.options &&
                step.options.map((option, idx) => (
                  <button
                    key={idx}
                    className="option"
                    onClick={() => handleAnswer(step.id, option.label)}
                  >
                    {option.icon}
                    <span className="label">{option.label}</span>
                  </button>
                ))}
            </div>
          </div>
        ))}
        {isLastStep && (
          <div className="slide summary_content">
            <div className="summary_div">
              <h2>Summary</h2>
              <ul>
                {Object.entries(answers).map(([questionId, answer], index) => (
                  <li key={index}>
                    {steps.find((step) => step.id === questionId)?.title ||
                      "Untitled"}
                    <span>{answer}</span>
                  </li>
                ))}
              </ul>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        )}
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Carousel;
