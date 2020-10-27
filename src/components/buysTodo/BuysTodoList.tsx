import React, { FC } from "react";
import BuysTodoItem from "./BuysTodoItem";
import { useRecoilValue } from "recoil";
import { todoData } from "../../recoil_atoms";

const BuysTodoList = () => {
  const todos = useRecoilValue(todoData);
  return (
    <ul className="ml-1">
      {todos.map((todo) => {
        return (
          <BuysTodoItem
            key={todo.id}
            content={todo.content}
            id={todo.id}
            isDone={todo.isDone}
          />
        );
      })}
    </ul>
  );
};

export default BuysTodoList;
