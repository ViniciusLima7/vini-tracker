import clienteHttp from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { State } from "@/store";
import { CREATE_TASK, GET_TASKS, UPDATE_TASK } from "@/store/type-actions";
import { ADD_TASK, DEFINIR_TAKS, EDIT_TASK } from "@/store/type-mutations";
import { Module } from "vuex";

export interface StateTarefa {
  tarefas: ITarefa[];
}

export const tarefa: Module<StateTarefa, State> = {
  state: {
    tarefas: [],
  },
  mutations: {
    [ADD_TASK](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    },

    [DEFINIR_TAKS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas;
    },

    [EDIT_TASK](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex((task) => task.id == tarefa.id);
      state.tarefas[index] = tarefa;
    },
  },
  actions: {
    [GET_TASKS]({ commit }, filtro: string) {
      let url = "tarefas";

      if (filtro) {
        // url += "?descricao=" + filtro;
        url += `?description=${filtro}`;
      }

      clienteHttp.get(url).then((resp) => commit(DEFINIR_TAKS, resp.data));
    },

    [CREATE_TASK]({ commit }, tarefa: ITarefa) {
      return clienteHttp
        .post("/tarefas", tarefa)
        .then((response) => commit(ADD_TASK, response.data));
    },

    [UPDATE_TASK]({ commit }, tarefa: ITarefa) {
      return clienteHttp
        .put(`/tarefas/${tarefa.id}`, tarefa)
        .then(() => commit(EDIT_TASK, tarefa));
    },
  },
};
