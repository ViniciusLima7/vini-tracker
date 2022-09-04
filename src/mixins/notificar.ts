import { TypeNotification } from "@/enums/TypeNotification";
import { store } from "../store";
import { ADD_NOTIFICATION } from "@/store/type-mutations";

export const notificacaoMixin = {
  methods: {
    /**
     * Emite a Notiticação
     *@description
     *04/09/2022 vlima Emição de Notificações
     */
    notificar(type: TypeNotification, title: string, text: string): void {
      store.commit(ADD_NOTIFICATION, {
        title,
        text,
        type,
      });
    },
  },
};
