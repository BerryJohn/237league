import { useState, useEffect, useCallback, useRef } from 'react';
import { AxiosResponse } from 'axios';

export interface UseApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  isError: boolean;
  isSuccess: boolean;
}

export interface UseApiReturn<T, TParams = void> extends UseApiState<T> {
  refetch: (params?: TParams) => Promise<void>;
  reset: () => void;
  mutate: TParams extends void
    ? () => Promise<void>
    : (params: TParams) => Promise<void>;
}

export interface UseApiOptions {
  enabled?: boolean; // Whether to auto-fetch on mount
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

/**
 * Generic hook for API calls with quality of life states
 * @param apiCall - The API function to call
 * @param options - Configuration options
 */
export function useApi<T = any, TParams = void>(
  apiCall: TParams extends void
    ? () => Promise<AxiosResponse<T>>
    : (params: TParams) => Promise<AxiosResponse<T>>,
  options: UseApiOptions = {}
): UseApiReturn<T, TParams> {
  const { enabled = true, onSuccess, onError } = options;

  // Use refs to store the latest callback references
  const apiCallRef = useRef(apiCall);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);

  // Update refs on every render to ensure we have the latest callbacks
  apiCallRef.current = apiCall;
  onSuccessRef.current = onSuccess;
  onErrorRef.current = onError;

  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
    isError: false,
    isSuccess: false,
  });

  const fetchData = useCallback(async (params?: TParams) => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
      isError: false,
      isSuccess: false,
    }));

    try {
      const response = await (apiCallRef.current as any)(params);
      const data = response.data;

      setState({
        data,
        isLoading: false,
        error: null,
        isError: false,
        isSuccess: true,
      });

      onSuccessRef.current?.(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';

      setState({
        data: null,
        isLoading: false,
        error: errorMessage,
        isError: true,
        isSuccess: false,
      });

      onErrorRef.current?.(errorMessage);
    }
  }, []); // No dependencies needed since we use refs

  const reset = useCallback(() => {
    setState({
      data: null,
      isLoading: false,
      error: null,
      isError: false,
      isSuccess: false,
    });
  }, []);

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [enabled, fetchData]);

  return {
    ...state,
    refetch: fetchData,
    reset,
    mutate: fetchData as any,
  };
}

/**
 * Generic hook for API calls that don't auto-fetch on mount
 * Useful for user-triggered actions like form submissions
 */
export function useApiMutation<T = any>(
  apiCall: () => Promise<AxiosResponse<T>>,
  options: Omit<UseApiOptions, 'enabled'> = {}
): UseApiReturn<T> {
  return useApi(apiCall, { ...options, enabled: false });
}
