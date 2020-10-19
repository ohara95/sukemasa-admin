import React from "react";
import { auth } from "../config/firebese";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";

type UseForm = {
  email: string;
  password: string;
};

const ResetPassword = () => {
  const { errors, handleSubmit, control } = useForm<UseForm>();

  const onFromSubmit = (data: UseForm) => {
    auth
      .sendPasswordResetEmail(data.email)
      .then(() => alert("メールを送信致しましたのでご確認をお願い致します"))
      .catch((err) => {
        if (err.code === "auth/invalid-email") {
          return alert("アドレスが無効です");
        }
        if (err.code === "auth/user-not-found") {
          return alert("ご記入頂いたアドレスの登録がございません");
        }
        console.log(err);
      });
  };

  return (
    <>
      <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <section>
          <h3 className="font-bold text-2xl">パスワード再設定</h3>
          <p className="text-gray-600 pt-2 text-sm">
            ※登録済のメールアドレスをご記入下さい。
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;確認メールを送信致します。
            <br />
            ※メールをご確認頂きパスワードの再設定をお願い致します。
          </p>
        </section>

        <section className="mt-10">
          <form
            onSubmit={handleSubmit(onFromSubmit)}
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
                    className="bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 pb-3"
                  />
                }
              />
              {errors.email && (
                <span className="text-sm text-red-500">※入力してください</span>
              )}
            </div>
            <button
              className="mt-8 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              type="submit"
            >
              送信
            </button>
          </form>
          <div className="text-right pt-12 pb-12 text-sm">
            <Link to="/login" className="underline font-bold">
              ログインページへ
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default ResetPassword;
