import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/api/token/refresh", {
      headers: { authorization: `Bearer ${auth.refreshToken}` },
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.payload.access_token);
      return {
        ...prev,
        accessToken: response.data.payload.access_token,
        refreshToken: response.data.payload.refresh_token,
      };
    });
    return response.data.payload.access_token;
  };
  return refresh;
};

export default useRefreshToken;
