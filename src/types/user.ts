export interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
  isPro: boolean;
  pro_expiry?: string;
}
