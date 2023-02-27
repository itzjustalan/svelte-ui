export const getCookieValue = (name: string, cookie: string | null) =>
  cookie?.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || null;
