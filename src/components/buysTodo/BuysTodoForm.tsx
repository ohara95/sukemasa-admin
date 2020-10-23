import React, { useEffect, FC } from "react";
import firebase, { db } from "../../config/firebese";
import CustomInput from "../../atoms/Input";
import { Todo } from "./type";

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  content: string;
  setContent: (param: string) => void;
};

const BuysTodoForm: FC<Props> = ({ todos, setTodos, content, setContent }) => {
  const todoRef = db.collection("todos");

  const addTodo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (content === "") {
      return;
    } else {
      setContent("");
      todoRef.add({
        content,
        isDone: false,
        createdAt: firebase.firestore.Timestamp.now(),
      });
    }
  };

  useEffect(() => {
    todoRef.orderBy("createdAt", "desc").onSnapshot((snap) => {
      const dbData = snap.docs.map((doc) => {
        return {
          ...(doc.data() as Todo),
          id: doc.id,
        };
      });
      setTodos(dbData);
    });
  }, []);

  const deleteTodo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const deleteItem = todos.filter((todo) => todo.isDone);
    for (const key of deleteItem) {
      todoRef.doc(key.id).onSnapshot((snap) => {
        snap.ref.delete();
      });
    }
  };
  /** 全選択 */
  const allCheck = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const isDoneTrue = todos.filter((todo) => todo.isDone === true);
    const isDoneFalse = todos.filter((todo) => todo.isDone === false);

    todos.map((todo) => {
      todoRef
        .where("isDone", "==", todo.isDone)
        .get()
        .then((res) =>
          res.docs.map((doc) => {
            if (isDoneTrue.length < todos.length) {
              if (!doc.data().isDone) {
                doc.ref.update({ isDone: true });
              } else {
                doc.ref.update({ isDone: todo.isDone });
              }
            } else if (isDoneFalse.length < todos.length) {
              if (doc.data().isDone) {
                doc.ref.update({ isDone: false });
              } else {
                doc.ref.update({ isDone: todo.isDone });
              }
            } else {
              doc.ref.update({ isDone: !todo.isDone });
            }
          })
        );
    });
  };

  return (
    <div>
      <form className="flex">
        <CustomInput
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          type="text"
          plusStyle="w-9/12"
        />
        <div className="w-4/12 flex justify-around">
          <button
            onClick={addTodo}
            className="text-teal-500 far fa-edit text-xl focus:outline-none"
          />
          <button
            onClick={deleteTodo}
            className="text-teal-500 far fa-trash-alt text-xl focus:outline-none"
          />
          <button
            onClick={allCheck}
            className="text-teal-500 far fa-check-square text-xl focus:outline-none"
          />
        </div>
      </form>
    </div>
  );
};

export default BuysTodoForm;
