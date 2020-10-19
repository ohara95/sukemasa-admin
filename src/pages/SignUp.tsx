import React, { FC } from "react";
import { auth } from "../config/firebese";
import * as H from "history";
import { useForm, Controller } from "react-hook-form";

type Props = {
  history: H.History;
};

type UseForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp: FC<Props> = ({ history }) => {
  const { handleSubmit, errors, control, getValues } = useForm<UseForm>();

  const onSubmit = (data: UseForm) => {
    auth
      .createUserWithEmailAndPassword(data.email, data.confirmPassword)
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <section>
          <h3 className="font-bold text-2xl">新規登録</h3>
        </section>

        <section className="mt-10">
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
                rules={{
                  required: true,
                }}
                as={
                  <input
                    type="text"
                    name="email"
                    className="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                  />
                }
              />
              {errors.email && (
                <span className="text-sm text-red-500">※入力してください</span>
              )}
            </div>
            <div className="mb-6 pt-3 rounded bg-white">
              <label className="block text-gray-700 text-base font-bold mb-2 ml-3">
                パスワード
              </label>
              <Controller
                name="password"
                defaultValue=""
                control={control}
                rules={{
                  required: true,
                }}
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
            <div className="mb-6 pt-3 rounded bg-white">
              <label className="block text-gray-700 text-base font-bold mb-2 ml-3">
                パスワード(確認用)
              </label>
              <Controller
                name="confirmPassword"
                defaultValue=""
                control={control}
                rules={{
                  validate: (value) => {
                    if (value === getValues().password) {
                      return true;
                    } else {
                      return "パスワードが一致しません";
                    }
                  },
                }}
                as={
                  <input
                    type="password"
                    name="confirmPassword"
                    className="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 pb-3"
                  />
                }
              />
              {errors.confirmPassword && (
                <span className="text-sm text-red-500">
                  {errors.confirmPassword?.message}
                </span>
              )}
            </div>
            <button
              className="mt-8 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              type="submit"
            >
              登録
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default SignUp;
