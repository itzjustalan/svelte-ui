export const getCookieValue = (name: string, cookie: string | null) =>
  cookie?.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || null;

export const sleep = async (t: number) => new Promise(r => setTimeout(r, t));
