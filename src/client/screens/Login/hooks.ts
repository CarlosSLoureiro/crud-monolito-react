import { useContext, useState } from "react";

import { GlobalContext } from "@client/contexts/Global";

interface HandleLogin {
  email: string;
  password: string;
}

type Errors = {
  [key: string]: {
    _errors: string[];
  };
};

export const useLoginScreen = () => {
  const [apiResponse, setApiResponse] = useState<any>();
  const [errors, setErrors] = useState<Errors>();

  const { showLoadingBackdrop, hideLoadingBackdrop } = useContext(GlobalContext);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrors(undefined);

    const data = new FormData(event.currentTarget);

    const email = data.get(`email`);
    const password = data.get(`password`);

    if (email && password) {
      showLoadingBackdrop();
      try {
        const res = await fetch(`/api/login`, {
          method: `POST`,
          body: JSON.stringify({
            email: email.toString(),
            password: password.toString(),
          }),
        });

        const resJson = await res.json();

        if (res.ok) {
          alert(`Success!`);
          return;
        }

        setErrors(resJson);
      } catch (error: any) {
        alert(`Error in console`);
        console.error(error);
      } finally {
        hideLoadingBackdrop();
      }
    }
  };

  return {
    errors,
    handleLogin,
  };
};
