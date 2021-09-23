export default interface Chat {
  _id: string;
  message: string;
  userId: string;
  avatar: string;
  time: number; // date in milliseconds
  name: string;
}
