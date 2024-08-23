import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Carousel from "./Carousel";

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
  // Add more steps as needed for testing
];

describe("Carousel Component", () => {
  test("renders steps correctly", () => {
    render(<Carousel steps={steps} onSubmit={jest.fn()} />);
    expect(screen.getByText(/How was your week overall?/)).toBeInTheDocument();
    expect(screen.getAllByText(/Good|Okay|Bad/)).toHaveLength(3);
  });

  test("handles option selection", () => {
    render(<Carousel steps={steps} onSubmit={jest.fn()} />);
    fireEvent.click(screen.getByText("Good"));
    expect(screen.getByText("Good")).toBeInTheDocument();
  });

  test("handles submit action", () => {
    const handleSubmit = jest.fn();
    render(<Carousel steps={steps} onSubmit={handleSubmit} />);
    fireEvent.click(screen.getByText("Good"));
    fireEvent.click(screen.getByText("Submit"));
    expect(handleSubmit).toHaveBeenCalled();
  });

  test("displays error message", () => {
    render(<Carousel steps={steps} onSubmit={jest.fn()} />);
    fireEvent.click(screen.getByText("Submit"));
    expect(
      screen.getByText("You need to complete all steps before submitting.")
    ).toBeInTheDocument();
  });
});
