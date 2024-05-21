import { useContext, useEffect, useState } from "react";

import { GlobalContext } from "@client/contexts/Global";
import { type LoginRequest, type LoginResponse } from "@server/controllers/login/types";
import { type ZodFormattedError } from "@server/utils/validator/types";

export const useLoginScreen = () => {
  const [response, setResponse] = useState<LoginResponse>();
  const [errors, setErrors] = useState<ZodFormattedError>();

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
          } satisfies LoginRequest),
        });

        const resJson = await res.json();

        if (res.ok) {
          setResponse(resJson);
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

  useEffect(() => {
    if (response) {
      console.log(response);
    }
  }, [response]);

  return {
    errors,
    handleLogin,
  };
};
