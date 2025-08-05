import { useCallback, useEffect, useState } from "react";
import { autoLogin as autoLoginApi } from "@services/auth/authService";
import refreshToken from "@helpers/refreshToken";
import { useNavigate } from "react-router-dom";
import { errorNotification } from "@/lib/notification";

const useAutoLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const autoLogin = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await autoLoginApi();
      if("user" in response) localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/home");
    } catch (error: unknown) {
      try {
        console.error("Errore durante auto login:", error);
        await refreshToken();
        navigate("/home");
      } catch (refreshError: unknown) {
        localStorage.removeItem("user");
        errorNotification("Sessione non valida", (refreshError as Error).message);
        navigate("/accedi");
      }
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    autoLogin();
  }, [autoLogin]);

  return { isLoading };
};

export default useAutoLogin;
