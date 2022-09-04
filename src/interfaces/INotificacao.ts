import { TypeNotification } from "../enums/TypeNotification";

export default interface INotificacao {
  id: number;
  title: string;
  text: string;
  type: TypeNotification;
}
