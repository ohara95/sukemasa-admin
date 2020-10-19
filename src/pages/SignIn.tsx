import React, { useContext, FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { auth } from "../config/firebese";
import { AuthContext } from "../AuthProvider";
import { Redirect, Link } from "react-router-dom";
import * as H from "history";

type Props = {
  history: H.History;
};

type UseFrom = {
  [param: string]: string;
  // email: string;
  // password: string;
};

const SignIn: FC<Props> = ({ history }) => {
  const { user } = useContext(AuthContext);

  const { control, handleSubmit, errors } = useForm();
  const onSubmit = (data: UseFrom) => {
    auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        if (err.code === "auth/wrong-password") {
          return alert("パスワードが無効です");
        }
        if (err.code === "auth/invalid-email") {
          return alert("メールアドレスが無効です");
        }
      });
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <div>
          <h3 className="font-bold text-2xl">ログイン</h3>
        </div>

        <div className="mt-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col"
            action="#"
          >
            <div className="mb-6 pt-3 rounded bg-white">
              <label className="block text-gray-700 text-base font-bold mb-2 ml-3">
                メールアドレス
              </label>
              <Controller
                name="email"
                defaultValue=""
                control={control}
                rules={{ required: true }}
                as={
                  <input
                    type="email"
                    name="email"
                    className="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 pb-3"
                  />
                }
              />
            </div>
            {errors.email && (
              <span className="text-sm text-red-500">※入力してください</span>
            )}
            <div className="mb-6 pt-3 rounded bg-white">
              <label className="block text-gray-700 text-base font-bold mb-2 ml-3">
                パスワード
              </label>
              <Controller
                name="password"
                defaultValue=""
                control={control}
                rules={{ required: true }}
                as={
                  <input
                    type="password"
                    name="password"
                    className="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 pb-3"
                  />
                }
              />
              {errors.password && (
                <span className="text-sm text-red-500">※入力してください</span>
              )}
            </div>
            <button
              className="mt-8 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              type="submit"
            >
              ログイン
            </button>
          </form>
          <div className="text-left pt-12 pb-12 text-sm">
            <p>
              ※登録がお済みでない方は{" "}
              <Link to="/signup" className="underline font-bold">
                新規登録へ
              </Link>
            </p>
            <p>
              ※パスワードを忘れた方は{" "}
              <Link to="/confirm" className="underline font-bold">
                パスワード再設定へ
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
