import { Response } from "miragejs";

export class TokenError extends Response {
  errorType: string;

  constructor(message?: string) {
    super(401, {}, { error: message ?? "Token Error" });

    this.errorType = "tokenError";
  }
}
