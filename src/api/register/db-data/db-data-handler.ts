import { getDatabaseConnection } from "@/config/database/get-database-connections";
import { queryRelatedPeople } from "./related-people.query";
import { queryOccurrence } from "./occurrence.query";
import { RowDataPacket } from "mysql2";
import { RelatedPersonRelationshipType } from "@/api/related-people/related-people.schemas";
import { registerDataSchema } from "../register.schemas";

interface People extends RowDataPacket {
  PEP: string | null;
  PObrigada: string | null;
  ServPub: string | null;
  NmEnv: string | null;
  CPFCNPJEnv: string | null;
}

interface Occurrence extends RowDataPacket {
  VlCred: string | null;
  eventDate: string | null;
}

export async function dbDataHandler(occurrenceNumber: string) {
  const connection = await getDatabaseConnection();

  const [peopleRows] = await connection.execute<People[]>(
    queryRelatedPeople(occurrenceNumber),
  );

  const [occurrenceRows] = await connection.execute<[Occurrence]>(
    queryOccurrence(occurrenceNumber),
  );

  await connection.end();

  const VlCred = occurrenceRows?.[0]?.VlCred ?? undefined;
  const eventDate = occurrenceRows?.[0]?.eventDate ?? undefined;

  const people = peopleRows.map((person) => ({
    ...person,
    TpEnv: RelatedPersonRelationshipType.TITULAR,
  }));

  const result = registerDataSchema.safeParse({
    VlCred,
    DtInicio: eventDate,
    DtFim: eventDate,
    ...(people.length
      ? {
          ENVOLVIDOS: {
            ENVOLVIDO: people,
          },
        }
      : {}),
  });

  if (!result.success) {
    console.debug(result.error);
    throw new Error("Invalid data");
  }

  return result.data;
}
