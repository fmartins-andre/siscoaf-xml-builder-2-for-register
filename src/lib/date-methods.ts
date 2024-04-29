import { ensureType } from "./ensure-type";

export function dateToPtBrString(date: Date): string | undefined {
  if (!ensureType(date, "date")) return;

  return date.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
}
