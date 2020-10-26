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
  isEdit: boolean;
  setIsEdit: (param: boolean) => void;
  editContent: string;
  setEditContent: (param: string) => void;
  editId: string;
  setEditId: (param: string) => void;
};

const BuysTodoItem: FC<Props> = ({
  content,
  id,
  isDone,
  todos,
  isEdit,
  setIsEdit,
  editContent,
  setEditContent,
  editId,
  setEditId,
}) => {
  const checkedItem = (itemId: string) => {
    const findData = todos.find((todo) => todo.id === itemId);
    if (findData)
      db.collection("todos").doc(id).update({ isDone: !findData?.isDone });
  };

  const editTodo = (itemId: string) => {
    const findData = todos.find((todo) => todo.id === itemId);
    if (findData) {
      setIsEdit(!isEdit);
      setEditId(itemId);
    }
  };

  const checkEdit = () => {
    db.collection("todos")
      .doc(editId)
      .update({ content: editContent ? editContent : content })
      .then(() => {
        setIsEdit(!isEdit);
        setEditContent("");
      });
  };

  return (
    <li className="mt-2">
      <input
        value={id}
        type="checkbox"
        checked={isDone}
        onClick={(e) => checkedItem((e.target as HTMLInputElement).value)}
        className="form-checkbox py-10"
      />
      {isEdit && editId === id ? (
        <button
          onClick={checkEdit}
          className="text-teal-500 fas fa-check focus:outline-none ml-2"
        />
      ) : (
        <button
          id={id}
          onClick={(e) => {
            editTodo((e.target as HTMLInputElement).id);
          }}
          className="text-teal-500 far fa-edit focus:outline-none ml-2"
        />
      )}

      {isEdit && editId === id ? (
        <input
          type="text"
          value={editContent}
          onChange={(e) => {
            setEditContent(e.target.value);
          }}
          placeholder={content}
          className="w-36 ml-2 pl-2"
        />
      ) : (
        <span className="ml-2 text-l ">{content}</span>
      )}
    </li>
  );
};

export default BuysTodoItem;
