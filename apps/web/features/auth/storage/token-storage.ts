const TOKEN_KEY = 'access_token';

export function setToken(token: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  const token = localStorage.getItem(TOKEN_KEY);
  return token;
}

export function removeToken() {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(TOKEN_KEY);
}
