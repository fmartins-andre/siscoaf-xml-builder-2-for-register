import { IFormSiscoaf } from "./form-siscoaf.schema";

export const formDefaultValues: IFormSiscoaf = {
  LOTE: {
    OCORRENCIAS: {
      "@ID": "",
      OCORRENCIA: {
        NumOcorrencia: "",
        DtInicio: "",
        DtFim: "",
        AgMun: "",
        AgUF: "",
        VlCred: "",
        CPFCNPJCom: "",
        Det: "",
        ENQUADRAMENTOS: {
          CodEnq: [],
        },
        ENVOLVIDOS: {
          ENVOLVIDO: [],
        },
      },
    },
  },
};

export const formLabels = {
  NumOcorrencia: "Número origem",
  DtInicio: "Data inicial do fato",
  DtFim: "Data final do fato",
  AgMun: "Cidade",
  AgUF: "UF",
  VlCred: "Valor da(s) operação(ões)",
  CPFCNPJCom: "CPF/CNPJ do Notificador",
  Det: "Descrição do Evento",
  ENQUADRAMENTOS: "Ocorrências",
  ENVOLVIDOS: "Pessoa(s) envolvida(s)",
  ENVOLVIDO: {
    TpEnv: "Tipo de relação envolvida",
    PEP: "Pessoa Politicamente Exposta",
    PObrigada: "Pessoa Obrigada",
    ServPub: "Servidor Público",
    NmEnv: "Nome",
    CPFCNPJEnv: "CPF / CNPJ",
  },
  btnSubmit: "Gerar XML",
};
