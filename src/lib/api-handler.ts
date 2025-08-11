import type { ApiResponse } from '@/types/apiResponse';
import axios, { type AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/',
});

export async function get(url: string, config?: AxiosRequestConfig): Promise<ApiResponse> {
  try {
    const response = await axiosInstance.get(url, config);
    const { message, data } = response.data;
    return { success: true, message, data };
  } catch (err: any) {
    if (err.response && err.response.data) {
      const apiError = err.response.data;
      const message = apiError.message;
      const error = apiError.error;
      return { success: false, error, message };
    }

    // Failed to call the API.
    return { success: false, message: err.message };
  }
}

export async function post(
  url: string,
  data: any,
  config?: AxiosRequestConfig,
): Promise<ApiResponse> {
  try {
    const response = await axiosInstance.post(url, data, config);
    return { success: true, message: response.data.message, data: response.data.data };
  } catch (err: any) {
    if (err.response && err.response.data) {
      // Error from API
      const apiError = err.response.data;
      const validationErrors = apiError.validationErrors;
      const message = apiError.message;
      const error = apiError.error;

      return { success: false, validationErrors, message, error };
    }

    // Failed to hit API
    return {
      success: false,
      message: err.message,
    };
  }
}
