import { ensureType } from "./ensure-type";
import { dateBrToIso } from "./string-methods";

export function dateToPtBrIsoString(date: Date): string | undefined {
  if (!ensureType(date, "date")) return;

  return dateBrToIso(
    date.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" }),
  );
}
