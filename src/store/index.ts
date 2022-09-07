import IProjeto from "../interfaces/IProjeto";
import INotificacao from "../interfaces/INotificacao";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import {
  ADD_NOTIFICATION,
  ADD_PROJECT,
  DEFINIR_PROJECTS,
  DELETE_PROJECT,
  EDIT_PROJECT,
} from "./type-mutations";
import {
  CREATE_PROJECT,
  GET_PROJECTS,
  REMOVE_PROJECT,
  UPDATE_PROJECT,
} from "./type-actions";
import clienteHttp from "@/http";

interface State {
  projetos: IProjeto[];
  notificacoes: INotificacao[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projetos: [],
    notificacoes: [],
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

    [DELETE_PROJECT](state, id: string) {
      state.projetos = state.projetos.filter((proj) => proj.id != id);
    },

    [DEFINIR_PROJECTS](state, projetos: IProjeto[]) {
      state.projetos = projetos;
    },

    [ADD_NOTIFICATION](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          (notificacao) => notificacao.id != novaNotificacao.id
        );
      }, 3000);
    },
  },

  actions: {
    [GET_PROJECTS]({ commit }) {
      clienteHttp
        .get("projetos")
        .then((resp) => commit(DEFINIR_PROJECTS, resp.data));
    },

    [CREATE_PROJECT](contexto, nomedoProjeto: string) {
      return clienteHttp.post("/projetos", {
        name: nomedoProjeto,
      });
    },

    [UPDATE_PROJECT](contexto, projeto: IProjeto) {
      return clienteHttp.put(`/projetos/${projeto.id}`, projeto);
    },

    [REMOVE_PROJECT]({ commit }, id: string) {
      return clienteHttp
        .delete(`/projetos/${id}`)
        .then(() => commit(DELETE_PROJECT, id));
    },
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
