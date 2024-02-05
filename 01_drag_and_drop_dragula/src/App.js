import React, { useState, useRef, useEffect } from "react";
import Dragula from "react-dragula";
import "../src/App.css";

export default function App() {
  const [todoItems, setTodoItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("0");
  const [categoryName, setCategoryName] = useState("");

  const todoOptionsRef = useRef(null);
  const todoTodayRef = useRef(null);
  const todoRemovedRef = useRef(null);

  useEffect(() => {
    const containers = [
      todoOptionsRef.current,
      todoTodayRef.current,
      todoRemovedRef.current,
    ];

    let options = {};
    Dragula(containers, options);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!inputValue.trim() || categoryValue === "0") {
      alert("카테고리를 선택하지 않았거나, 할 일을 적지 않았어요!🥲");
      return;
    }
    const newTodoItem = {
      text: inputValue,
      category: categoryValue,
      categoryName: categoryName,
    };
    setTodoItems([...todoItems, newTodoItem]);
    setInputValue("");
    setCategoryValue("0");
    setCategoryName("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    setCategoryValue(event.target.value);
    setCategoryName(selectedOption.text);
  };

  const handleRemovalBtn = () => {
    if (todoRemovedRef.current) {
      todoRemovedRef.current.innerHTML = "";
    }
  };

  return (
    <>
      <header>
        <h1 className="header__title">Drag and Drop with Dragula</h1>
      </header>
      <main>
        <form className="todo-form" onSubmit={handleSubmit}>
          <label htmlFor="todo-input">
            카테고리 선택 후, 할 일을 입력해주세요😊
          </label>
          <div className="new-todo-container">
            <select value={categoryValue} onChange={handleCategoryChange}>
              <option>카테고리 선택</option>
              <option>Private</option>
              <option>Work</option>
              <option>Study</option>
              <option>Rendezvous</option>
              <option>Etc</option>
            </select>
            <input
              id="todo-input"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              maxLength="13"
            />
            <button type="submit">ENTER</button>
          </div>
        </form>
        <div className="todo-list-container">
          <div className="todo-options">
            <h2 className="highlight highlight-options">할 일 모음</h2>
            <ul
              className="dragula-container todo-options__option-list"
              ref={todoOptionsRef}
            >
              {todoItems.map((item, index) => (
                <li className="category-item" key={index}>
                  <div
                    className={`category-name category-name__${item.categoryName.toLowerCase()}`}
                  >
                    {item.categoryName}
                  </div>
                  <span>{`${item.text}`}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="todo-today">
            <h2 className="highlight highlight-today">오늘 할 일</h2>
            <ul
              className="dragula-container todo-today__today-list"
              ref={todoTodayRef}
            ></ul>
          </div>
          <div className="todo-removed">
            <h2 className="highlight highlight-removed">휴지통</h2>
            <button className="removalBtn" onClick={handleRemovalBtn}>
              🗑️
            </button>
            <ul
              className="dragula-container todo-removed__removed-list"
              ref={todoRemovedRef}
            ></ul>
          </div>
        </div>
      </main>
    </>
  );
}
