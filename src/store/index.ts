import IProjeto from "../interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore } from "vuex";
import { ADD_PROJECT, DELETE_PROJETO, EDIT_PROJECT } from "./type-mutations";

interface State {
  projetos: IProjeto[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projetos: [],
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

export function usageStore(): Store<State> {
  return useStore(key);
}
