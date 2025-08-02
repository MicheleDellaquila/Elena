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
      const user = await autoLoginApi();
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (error: any) {
      try {
        console.error("Errore durante auto login:", error);
        await refreshToken();
        navigate("/dashboard");
      } catch (refreshError: any) {
        console.error("Errore durante il refresh del token:", refreshError);
        errorNotification("Sessione non valida", "La tua sessione è scaduta. Effettua nuovamente l'accesso.");
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
