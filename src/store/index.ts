import INotificacao from "../interfaces/INotificacao";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADD_NOTIFICATION } from "./type-mutations";
import { project, StateProject } from "./modules/project";
import { StateTarefa, tarefa } from "./modules/tarefa";

export interface State {
  notificacoes: INotificacao[];
  tarefa: StateTarefa;
  project: StateProject;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    tarefa: {
      tarefas: [],
    },
    notificacoes: [],
    project: {
      projetos: [],
    },
  },
  mutations: {
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

  modules: {
    project,
    tarefa,
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
