import React from "react";
import Carousel from "./components/Carousel";

const steps = [
  {
    id: "q1",
    title: "How was your week overall?",
    options: [
      { label: "Good", icon: "👍" },
      { label: "Okay", icon: "🤔" },
      { label: "Bad", icon: "👎" },
    ],
  },
  {
    id: "q2",
    title: "How was your productivity?",
    options: [
      { label: "High", icon: "🚀" },
      { label: "Average", icon: "⚖️" },
      { label: "Low", icon: "🐢" },
    ],
  },
  {
    id: "q3",
    title: "How was your work-life balance?",
    options: [
      { label: "Balanced", icon: "⚖️" },
      { label: "Work-heavy", icon: "💼" },
      { label: "Life-heavy", icon: "🌴" },
    ],
  },
  {
    id: "q4",
    title: "How was your mental health?",
    options: [
      { label: "Good", icon: "🙂" },
      { label: "Okay", icon: "😐" },
      { label: "Not great", icon: "😟" },
    ],
  },
  {
    id: "q5",
    title: "How was your physical health?",
    options: [
      { label: "Good", icon: "💪" },
      { label: "Okay", icon: "😐" },
      { label: "Poor", icon: "🤒" },
    ],
  },
];

const App = () => {
  const handleSubmit = async (data) => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Submitted data:", result);
    } catch (error) {
      console.error("Error submitting data:", error.message);
    }
  };

  return (
    <div className="App">
      <Carousel steps={steps} onSubmit={handleSubmit} />
    </div>
  );
};

export default App;
