export default interface UserInterface {
  id: number;
  name: string;
  email: string;
  password?: string | null;
  picture?: string | null;
}
