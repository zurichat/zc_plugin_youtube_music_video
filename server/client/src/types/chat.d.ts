export default interface Chat {
  id: string;
  message: string;
  userId: string;
  time: number; // date in milliseconds
  name: string;
  avatar: string;
}
