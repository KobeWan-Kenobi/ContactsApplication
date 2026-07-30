export class ApiError extends Error {
  constructor(
    messages: string[],
    statusCode: number
  ) {
    super(messages.join(", "));
  }
}
