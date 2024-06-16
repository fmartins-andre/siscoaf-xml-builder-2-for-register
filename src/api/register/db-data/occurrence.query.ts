export function queryOccurrence(occurrenceNumber: string): string {
  const query = `
    SELECT
        srr.rr_valoritbi AS 'VlCred',
        DATE_FORMAT(srr.Rr_DataEscritura ,'%Y-%m-%d')  AS 'DtInicio',
        DATE_FORMAT(srr.rr_data ,'%Y-%m-%d') AS 'DtFim'
    FROM sqlreg3.l1 sl1
    LEFT JOIN sqlreg3.rr srr ON (sl1.L1_ProtRecep = srr.Rr_Protocolo)
    WHERE sl1.L1_Protocolo='${occurrenceNumber}'
`;

  return query.trim();
}
