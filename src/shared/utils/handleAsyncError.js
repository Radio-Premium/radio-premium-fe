export const handleAsyncError = async (
  fn,
  errorMessage = "An error occurred"
) => {
  try {
    return await fn();
  } catch (error) {
    console.error(errorMessage, error);
  }
};
