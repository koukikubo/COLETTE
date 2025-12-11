export type MinimalAxiosError<T = unknown> = {
  isAxiosError?: boolean;
  response?: {
    status?: number;
    data?: T;
  };
  message?: string;
};

export function isAxiosError<T = unknown>(
  error: unknown
): error is MinimalAxiosError<T> {
  return (
    typeof error === "object" &&
    error !== null &&
    "isAxiosError" in error &&
    Boolean((error as { isAxiosError?: boolean }).isAxiosError)
  );
}
