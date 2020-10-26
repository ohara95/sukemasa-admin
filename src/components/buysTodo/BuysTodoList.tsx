import React, { FC } from "react";
import BuysTodoItem from "./BuysTodoItem";
import { Todo } from "./type";

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  isEdit: boolean;
  setIsEdit: (param: boolean) => void;
  content: string;
  setContent: (param: string) => void;
  editId: string;
  setEditId: (param: string) => void;
  editContent: string;
  setEditContent: (param: string) => void;
};

const BuysTodoList: FC<Props> = ({
  todos,
  setTodos,
  isEdit,
  setIsEdit,
  editContent,
  setEditContent,
  editId,
  setEditId,
}) => (
  <ul className="ml-1">
    {todos.map((todo) => {
      return (
        <BuysTodoItem
          key={todo.id}
          content={todo.content}
          id={todo.id}
          isDone={todo.isDone}
          todos={todos}
          setTodos={setTodos}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          editContent={editContent}
          setEditContent={setEditContent}
          editId={editId}
          setEditId={setEditId}
        />
      );
    })}
  </ul>
);

export default BuysTodoList;
