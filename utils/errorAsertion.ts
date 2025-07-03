export function errorAssertion(
  error: unknown
): error is { errors: { [key: string]: string[] } } {
  return (
    typeof error === "object" &&
    error !== null &&
    "errors" in error &&
    typeof (error as any).errors === "object"
  );
}
