import IProjeto from "../interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";

interface State {
  projetos: IProjeto[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projetos: [
      { id: new Date().toISOString(), name: "Nelogica" },
      { id: new Date().toISOString(), name: "React" },
      { id: new Date().toISOString(), name: "Vue" },
    ],
  },
});
