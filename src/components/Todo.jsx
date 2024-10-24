import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const Todo = () => {
    // 1. Initialize State with `useState`
    const [inputValue, setInputValue] = useState("");
    const [todoList, setTodoList] = useState([]);

    // 2. Load Tasks from Local Storage
    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem("todos"));
        if (savedTodos) {
            setTodoList(savedTodos);
        }
    }, []);

    // 3. Save Tasks to Local Storage
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todoList));
    }, [todoList]);

    // 4. Add New Tasks
    const addTodo = () => {
        if (inputValue.trim() === "") {
            alert("Type Something");
            return;
        }
        if (todoList.includes(inputValue.trim())) {
            alert("Task already exists");
            return;
        }
        setTodoList((prev) => [...prev, inputValue.trim()]);
        setInputValue("");
    };

    // 6. Remove Tasks
    const removeTodo = (index) => {
        const updatedList = todoList.filter((_, i) => i !== index);
        setTodoList(updatedList);
    };

    return (
        <>
            <div
                style={{ height: "60vh" }}
                className="d-flex justify-content-center align-items-center"
            >
                <div 
                    className="d-flex flex-column mt-5 pt-5" 
                    style={{ gap: "10px", alignItems: "center", borderRadius:"20px", padding: "50px", backgroundColor:"skyblue" }}
                >
                    {/* Heading */}
                    <Typography variant="h2" component="h2" align="center" gutterBottom>
                        ToDo App
                    </Typography>
                    
                    <div className="d-flex" style={{ gap: "10px", alignItems: "center" }}>
                        <input
                            style={{
                                padding: "10px",
                                width: "100%",
                                maxWidth: "400px",
                                border: "2px solid black",
                                borderRadius: "8px",
                                marginTop:"20px"
                            }}
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                                console.log(e.target.value);
                            }}
                            type="text"
                            placeholder="Enter a task"
                        />
                        <button
                            style={{
                                padding: "12px 20px",
                                border: "2px solid black",
                                backgroundColor: "pink",
                                borderRadius: "10px",
                                fontSize: "16px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                whiteSpace: "nowrap",
                                marginTop:"20px"
                            }}
                            onClick={addTodo}
                        >
                            Add +
                        </button>
                    </div>
                </div>
            </div>

            {/* 5. Display the Task List */}
            <div className="text-center mt-4">
                <ul className="list-unstyled">
                    {todoList?.map((item, index) => (
                        <li
                            key={index}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "10px",
                                padding: "10px 20px",
                                width: "100%",
                                maxWidth: "400px",
                                margin: "0 auto",
                                backgroundColor: "#f9f9f9",
                                border: "2px solid #ccc",
                                borderRadius: "8px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            {item}
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => removeTodo(index)}
                                style={{ marginLeft: "10px" }}
                            >
                                <DeleteIcon />
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Todo;
