import IProjeto from "../interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore } from "vuex";

interface State {
  projetos: IProjeto[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projetos: [],
  },
  mutations: {
    ADD_PROJECT(state, nameProject: string) {
      const project = {
        id: new Date().toISOString(),
        name: nameProject,
      } as IProjeto;
      state.projetos.push(project);
    },
  },
});

export function usageStore(): Store<State> {
  return useStore(key);
}
