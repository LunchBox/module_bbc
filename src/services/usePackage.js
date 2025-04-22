// API 封装

import { API_URL } from "./api";

import { useAuth } from "./useAuth";

export function usePackages() {
  const { clientToken, staffToken } = useAuth();

  // 获取包裹详情
  const getPackageDetails = async (trackingNumber) => {
    try {
      //   isLoading.value = true;
      const response = await fetch(`${API_URL}/api/v1/track/${trackingNumber}`);
      const json = await response.json();
      return json.data;
    } catch (err) {
      //   error.value =
      //     err.response?.data?.message || "Failed to fetch package details";
      throw err;
    } finally {
      //   isLoading.value = false;
    }
  };

  // 发送包裹
  const sendPackage = async (packageData) => {
    try {
      //   isLoading.value = true;
      const response = await fetch(
        `${API_URL}/api/v1/package?token=${clientToken()}`,
        {
          method: "POST",
          data: packageData,
        }
      );
      const json = await response.json();
      return json.data;
    } catch (err) {
      //   error.value = err.response?.data?.message || "Failed to send package";
      throw err;
    } finally {
      //   isLoading.value = false;
    }
  };

  // 获取我的包裹
  const getMyPackages = async () => {
    try {
      //   isLoading.value = true;
      const response = await fetch(
        `${API_URL}/api/v1/package?token=${clientToken()}`
      );
      const json = await response.json();
      return json.data;
    } catch (err) {
      //   error.value = err.response?.data?.message || "Failed to fetch packages";
      throw err;
    } finally {
      //   isLoading.value = false;
    }
  };

  // 退回包裹
  const returnPackage = async (packageId) => {
    try {
      //   isLoading.value = true;
      const response = await fetch(
        `${API_URL}/api/v1/package/${packageId}?token=${clientToken()}`,
        {
          method: "PATCH",
        }
      );
      const json = await response.json();
      return json.data;
    } catch (err) {
      //   error.value = err.response?.data?.message || "Failed to return package";
      throw err;
    } finally {
      //   isLoading.value = false;
    }
  };

  // 快递员获取待取件包裹
  const getPendingPickupPackages = async () => {
    try {
      //   isLoading.value = true;
      const response = await fetch(
        `${API_URL}/api/v1/courier/package/pickup/pending?token=${staffToken()}`
      );
      const json = await response.json();
      return json.data;
    } catch (err) {
      //   error.value =
      //     err.response?.data?.message || "Failed to fetch pending packages";
      throw err;
    } finally {
      //   isLoading.value = false;
    }
  };

  // 快递员取件
  const pickupPackages = async (packageIds) => {
    try {
      //   isLoading.value = true;
      const response = await fetch(
        `${API_URL}/api/v1/courier/package/pickup/carry?token=${staffToken()}`,
        {
          method: "POST",
          data: { package_id_list: packageIds },
        }
      );
      const json = await response.json();
      return json.data;
    } catch (err) {
      //   error.value = err.response?.data?.message || "Failed to pickup packages";
      throw err;
    } finally {
      //   isLoading.value = false;
    }
  };

  // 其他快递员和卡车司机方法类似...

  return {
    // isLoading,
    // error,
    getPackageDetails,
    sendPackage,
    getMyPackages,
    returnPackage,
    getPendingPickupPackages,
    pickupPackages,
    // ... 其他方法
  };
}
