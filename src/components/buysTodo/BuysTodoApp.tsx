import React, { useState } from "react";
import BuysTodoForm from "./BuysTodoForm";
import BuysTodoList from "./BuysTodoList";
import { Todo } from "./type";

const BuysTodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [content, setContent] = useState("");

  return (
    <>
      <BuysTodoForm
        todos={todos}
        setTodos={setTodos}
        content={content}
        setContent={setContent}
      />
      <BuysTodoList todos={todos} setTodos={setTodos} />
    </>
  );
};

export default BuysTodoApp;
