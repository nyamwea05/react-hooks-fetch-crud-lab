import React from "react";
import QuestionItem from "./QuestionItem";

import React, { useState, useEffect } from 'react';

function App() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0
  });

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(response => response.json())
      .then(data => setQuestions(data));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "answers") {
      const index = Number(event.target.dataset.index);
      const newAnswers = [...newQuestion.answers];
      newAnswers[index] = value;
      setNewQuestion({ ...newQuestion, answers: newAnswers });
    } else {
      setNewQuestion({ ...newQuestion, [name]: value });
    }
  }

  const handleNewQuestionSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion)
    })
      .then(response => response.json())
      .then(data => setQuestions([...questions, data]))
      .catch(error => console.log(error));
    setNewQuestion({
      prompt: "",
      answers: ["", "", "", ""],
      correctIndex: 0
    });
  }

  const handleDeleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" })
      .then(() => setQuestions(questions.filter(q => q.id !== id)))
      .catch(error => console.log(error));
  }

  const handleCorrectIndexChange = (id, index) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: index })
    })
      .then(response => response.json())
      .then(data => setQuestions(questions.map(q => q.id === id ? data : q)))
      .catch(error => console.log(error));
  }

  return (
    <div className="App">
      <h1>Quiz Admin</h1>
      <button onClick={() => setView("questionList")}>View Questions</button>
      <button onClick={() => setView("newQuestion")}>New Question</button>
      {view === "questionList" && (
        <>
          <h2>Question List</h2>
          <ul>
            {questions.map(q => (
              <li key={q.id}>
                {q.prompt}
                <button onClick={() => handleDeleteQuestion(q.id)}>Delete</button>
                <select value={q.correctIndex} onChange={(e) => handleCorrectIndexChange(q.id, e.target.value)}>
                  {q.answers.map((answer, index) => (
                    <option key={index} value={index}>{answer}</option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
        </>
      )}
      {view === "newQuestion" && (
        <>
          <h2>New Question</h2>
          <form onSubmit={handleNewQuestionSubmit}>
            <label>
              Prompt:
              <input type="text" name="prompt" value={newQuestion.prompt} onChange={handleInputChange} />
            </label>
            {newQuestion.answers.map((answer, index) => (
              <

export default QuestionList;

function QuestionList({ questions }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem key={question.id} question={question} />
        ))}
      </ul>
    </section>
  );
}




export default QuestionList;
