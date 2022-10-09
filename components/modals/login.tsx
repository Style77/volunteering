import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  browserSessionPersistence,
  inMemoryPersistence,
} from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { MdOutlineLogin } from "react-icons/md";
import { humanizeError } from "../../constants";
import { auth } from "../../saas/firebase";
import { Alert, showAlert } from "../alert";

const LoginModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = (value: boolean) => {
    const modal = document.getElementById("authentication-modal");
    setShowModal(value);

    if (modal) {
      modal.classList.toggle("hidden");

      if (value) {
        modal.classList.replace("opacity-0", "opacity-100");
      } else {
        modal.classList.replace("opacity-100", "opacity-0");
      }
    }
  };

  const handleGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleProvider)
      .then((result) => {
        const { user } = result;
        console.log(user);
      })
      .catch((error) => {
        showAlert(error.message);
      });
  };

  const handleEmail = async () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const remember = document.getElementById("remember") as HTMLInputElement;
    await signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        auth.setPersistence(
          remember.checked ? inMemoryPersistence : browserSessionPersistence
        );
      })
      .catch((error) => {
        showAlert(humanizeError[error.code], "error-alert");
      });
  };

  const handleAuth = async (provider: string) => {
    if (provider == "google") {
        handleGoogle()
    } else if (provider == "email") {
        handleEmail()
    }
  };

  return (
    <>
      <div className="flex flex-row justify-center items-center text-main-color hover:text-main-color-2 transition cursor-pointer">
        <MdOutlineLogin />
        <a
          className="flex ml-1 mr-4 font-inter font-semibold"
          onClick={() => handleToggleModal(true)}
        >
          Zaloguj
        </a>
      </div>
      {
        <div
          id="authentication-modal"
          tabIndex={-1}
          className="opacity-0 hidden transition overflow-y-auto overflow-x-hidden fixed inset-0 z-[100]"
        >
          <div className="relative p-4 w-full max-w-md h-full grid place-items-center">
            <div className="relative bg-background-color rounded-lg shadow">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="authentication-modal"
                onClick={() => handleToggleModal(false)}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Zamknij</span>
              </button>
              <div className="py-6 px-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-main-color ">
                  Zaloguj się do{" "}
                  <span className="text-main-color-2">Volunteering</span>
                </h3>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-800"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="mail@volunteering.pl"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-800"
                    >
                      Hasło
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300"
                        />
                      </div>
                      <label
                        htmlFor="remember"
                        className="ml-2 text-sm font-medium text-gray-800"
                      >
                        Zapamiętaj mnie
                      </label>
                    </div>
                    <a
                      href="#"
                      className="text-sm text-blue-700 hover:underline"
                    >
                      Zapomniałeś hasła?
                    </a>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <button
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      onClick={() => handleAuth("email")}
                    >
                      Zaloguj się
                    </button>

                    <span className="mt-1 text-main-color font-inner font-semibold">
                      lub
                    </span>

                    <button
                      className="w-full flex mt-1 items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      onClick={() => handleAuth("google")}
                    >
                      Zaloguj się z <FaGoogle className="ml-1 text-xl" />
                    </button>
                  </div>
                  <div className="text-sm font-medium text-gray-800">
                    Pierwszy raz?{" "}
                    <a href="#" className="text-blue-700 hover:underline">
                      Zarejestruj się
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      <Alert color="bg-red-500" alertId="error-alert"></Alert>
      <Alert color="bg-main-color" alertId="success"></Alert>
    </>
  );
};

export default LoginModal;
