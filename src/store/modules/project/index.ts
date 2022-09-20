import clienteHttp from "@/http";
import IProjeto from "@/interfaces/IProjeto";
import { State } from "@/store";
import {
  CREATE_PROJECT,
  GET_PROJECTS,
  REMOVE_PROJECT,
  UPDATE_PROJECT,
} from "@/store/type-actions";
import {
  ADD_PROJECT,
  DEFINIR_PROJECTS,
  DELETE_PROJECT,
  EDIT_PROJECT,
} from "@/store/type-mutations";
import { Module } from "vuex";

export interface StateProject {
  projetos: IProjeto[];
}

export const project: Module<StateProject, State> = {
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
};
