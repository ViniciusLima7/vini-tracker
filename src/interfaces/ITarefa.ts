import IProjeto from "./IProjeto";

export default interface ITarefa {
  timeInSeconds: number;
  description: string;
  projeto: IProjeto;
}
