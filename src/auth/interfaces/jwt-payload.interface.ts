export interface JwtPayload {
  sub: string;
  email: string;
  role: number;
  type: string;
  iat: string;
  exp: string;
}
