import { API_URL } from "./api";

const clientToken = () => localStorage.getItem("clientToken");
const staffToken = () => localStorage.getItem("clientToken");
const staffRole = () => localStorage.getItem("staffRole");

export function useAuth() {
  const isAuthenticated = () => !!clientToken();
  const isStaffAuthenticated = () => !!staffToken();

  // 客户端登录
  const clientSignIn = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const json = await response.json();
      localStorage.setItem("clientToken", json.data.token);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  // 客户端注册
  const clientSignUp = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const json = await response.json();
      localStorage.setItem("clientToken", json.data.token);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  // 员工登录
  const staffSignIn = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/staff/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({
          email,
          password,
        }),
      });
      const json = await response.json();

      localStorage.setItem("staffToken", json.data.token);
      localStorage.setItem("staffRole", json.data.role);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  // 登出
  const signOut = async (isStaff = false) => {
    try {
      const token = isStaff ? staffToken() : clientToken();

      await fetch(
        `${API_URL}/api/v1/${
          isStaff ? "staff" : "auth"
        }/signout?token=${token}`,
        { method: "POST" }
      );
    } finally {
      if (isStaff) {
        localStorage.removeItem("staffToken");
        localStorage.removeItem("staffRole");
      } else {
        localStorage.removeItem("clientToken");
      }
    }
  };

  return {
    clientToken,
    staffToken,
    staffRole,
    isAuthenticated,
    isStaffAuthenticated,
    clientSignIn,
    clientSignUp,
    staffSignIn,
    signOut,
  };
}
