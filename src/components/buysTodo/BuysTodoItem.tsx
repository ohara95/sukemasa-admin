import React, { FC, Dispatch, SetStateAction } from "react";
import { Todo } from "./type";
import { db } from "../../config/firebese";

type Props = {
  content: string;
  id: string;
  isDone: boolean;
  todos: Todo[];
  // 型推論させてないから型指定
  setTodos: Dispatch<SetStateAction<Todo[]>>;
};

const BuysTodoItem: FC<Props> = ({ content, id, isDone, todos }) => {
  const checkedItem = (itemId: string) => {
    todos.map((todo) => {
      if (itemId === todo.id) {
        db.collection("todos").doc(id).update({ isDone: !todo.isDone });
      } else {
        return;
      }
    });
  };

  return (
    <li>
      <input
        value={id}
        type="checkbox"
        checked={isDone}
        onClick={(e) => checkedItem((e.target as HTMLInputElement).value)}
        className="form-checkbox"
      />
      <span className="ml-2 text-l">{content}</span>
    </li>
  );
};

export default BuysTodoItem;
