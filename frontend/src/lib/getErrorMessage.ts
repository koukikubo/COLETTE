export function getErrorMessage(error: unknown, fallback = "予期しないエラーが発生しました。") {
  if (typeof error === "string") {
    return error;
  }

  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message?: string }).message;
    if (message && typeof message === "string") {
      return message;
    }
  }

  return fallback;
}
