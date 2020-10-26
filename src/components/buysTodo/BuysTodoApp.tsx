import React, { useState } from "react";
import BuysTodoForm from "./BuysTodoForm";
import BuysTodoList from "./BuysTodoList";
import { Todo } from "./type";

const BuysTodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [content, setContent] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [editContent, setEditContent] = useState("");

  return (
    <>
      <BuysTodoForm
        todos={todos}
        setTodos={setTodos}
        content={content}
        setContent={setContent}
      />
      <div className="h-64 overflow-y-scroll">
        <BuysTodoList
          todos={todos}
          setTodos={setTodos}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          content={content}
          setContent={setContent}
          editId={editId}
          setEditId={setEditId}
          editContent={editContent}
          setEditContent={setEditContent}
        />
      </div>
    </>
  );
};

export default BuysTodoApp;
