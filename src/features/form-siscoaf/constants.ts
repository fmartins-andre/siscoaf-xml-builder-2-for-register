import {
  RelatedPersonPublicServantType,
  RelatedPersonRelationshipType,
} from "@/api/related-people/related-people.schemas";
import { IFormSiscoaf, IFormSiscoafRelatedPerson } from "./form-siscoaf.schema";
import { dateToPtBrString } from "@/lib/date-methods";

export const formDefaultRelatedPersonValues: IFormSiscoafRelatedPerson = {
  TpEnv: RelatedPersonRelationshipType.TITULAR,
  PEP: false,
  PObrigada: false,
  ServPub: RelatedPersonPublicServantType.NAO,
  NmEnv: "",
  CPFCNPJEnv: "",
};

export const formDefaultValues: IFormSiscoaf = {
  LOTE: {
    OCORRENCIAS: {
      "@ID": `SISCOAF${dateToPtBrString(new Date())?.replace(/\D/g, "")}`,
      OCORRENCIA: {
        NumOcorrencia: "",
        DtInicio: null,
        DtFim: null,
        AgMun: "",
        AgUF: null,
        VlCred: "",
        CPFCNPJCom: "",
        Det: "",
        ENQUADRAMENTOS: {
          CodEnq: [],
        },
        ENVOLVIDOS: {
          ENVOLVIDO: [formDefaultRelatedPersonValues],
        },
      },
    },
  },
};

export const formLabels = {
  "@ID": "ID da ocorrência",
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
    TpEnv: "Tipo de relação",
    PEP: "Pessoa Politicamente Exposta",
    PObrigada: "Pessoa Obrigada",
    ServPub: "Servidor Público",
    NmEnv: "Nome",
    CPFCNPJEnv: "CPF / CNPJ",
  },
  btnSubmit: "Gerar XML",
};
