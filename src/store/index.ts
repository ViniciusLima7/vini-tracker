import IProjeto from "../interfaces/IProjeto";
import INotificacao from "../interfaces/INotificacao";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADD_PROJECT, DELETE_PROJETO, EDIT_PROJECT } from "./type-mutations";
import { TypeNotification } from "../enums/TypeNotification";

interface State {
  projetos: IProjeto[];
  notificacoes: INotificacao[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projetos: [],
    notificacoes: [
      {
        id: 1,
        title: "Sucesso",
        text: "Sucesso 1",
        type: TypeNotification.SUCESSO,
      },
      {
        id: 2,
        title: "FALHA",
        text: "falha 2",
        type: TypeNotification.FALHA,
      },
      {
        id: 3,
        title: "ATENÇÃO",
        text: "cuidado 3",
        type: TypeNotification.ATENÇÃO,
      },
    ],
  },
  mutations: {
    [ADD_PROJECT](state, nameProject: string) {
      const project = {
        id: new Date().toISOString(),
        name: nameProject,
      } as IProjeto;
      state.projetos.push(project);
    },
    [EDIT_PROJECT](state, projeto: IProjeto) {
      const index = state.projetos.findIndex((proj) => proj.id == projeto.id);
      state.projetos[index] = projeto;
    },
    [DELETE_PROJETO](state, id: string) {
      state.projetos = state.projetos.filter((proj) => proj.id != id);
    },
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
