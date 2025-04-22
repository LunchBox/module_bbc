import { API_URL } from "./api";
import { useAuth } from "./useAuth";

export function useCampus() {
  const { clientToken } = useAuth();
  //   const isLoading = ref(false);
  //   const error = ref(null);

  const getAllCampuses = async () => {
    try {
      //   isLoading.value = true;
      const response = await fetch(
        `${API_URL}/api/v1/campus?token=${clientToken()}`
      );
      const json = await response.json();
      return json.data;
    } catch (err) {
      //   error.value = err.response?.data?.message || "Failed to fetch campus";
      throw err;
    } finally {
      //   isLoading.value = false;
    }
  };

  return {
    getAllCampuses,
  };
}
