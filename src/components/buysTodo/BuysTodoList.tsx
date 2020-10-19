import React, { FC } from "react";
import BuysTodoItem from "./BuysTodoItem";
import { Todo } from "./type";

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const BuysTodoList: FC<Props> = ({ todos, setTodos }) => (
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
        />
      );
    })}
  </ul>
);

export default BuysTodoList;
