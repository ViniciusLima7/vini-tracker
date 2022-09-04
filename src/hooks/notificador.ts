import { TypeNotification } from "@/enums/TypeNotification";
import { store } from "@/store";
import { ADD_NOTIFICATION } from "@/store/type-mutations";

type Notificador = {
  notificar: (type: TypeNotification, title: string, text: string) => void;
};

export default (): Notificador => {
  const notificar = (
    type: TypeNotification,
    title: string,
    text: string
  ): void => {
    store.commit(ADD_NOTIFICATION, {
      title,
      text,
      type,
    });
  };

  return {
    notificar,
  };
};
