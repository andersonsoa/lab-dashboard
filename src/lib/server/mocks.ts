import { TokenError } from "@/lib/server/error";
import { nanoid } from "nanoid";

const DURATION = 1000 * 60 * 60; // 1 hora

export const jwt = {
  sign(payload: Record<string, unknown>) {
    return `${nanoid()}.${btoa(JSON.stringify(payload))}.${Date.now()}`;
  },
  verify<TData>(token: string): TData | never {
    const [, payload, time] = token.split(".");

    if (+time + DURATION < Date.now()) {
      throw new TokenError();
    }

    try {
      const data: TData = JSON.parse(atob(payload));
      return data;
    } catch {
      throw new TokenError();
    }
  },
};
