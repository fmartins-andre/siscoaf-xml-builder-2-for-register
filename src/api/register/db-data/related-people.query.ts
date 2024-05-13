export function queryRelatedPeople(occurrenceNumber: string): string {
  const query = `
    SELECT
        sl5.L5_Nome AS 'NmEnv',
        IF(
            sl5.L5_Cpf IS NOT NULL AND sl5.L5_Cpf != '' AND sl5.L5_Cpf != '   .   .   -  ',
            sl5.L5_Cpf,
            IF (
                sl5.L5_Classificacao = 'Jurídica',
                'PJ',
                'PF'
            )
        ) AS 'CPFCNPJEnv',
        sl5.l5_expostaPolitica AS 'PEP',
        sl5.l5_obrigada AS 'PObrigada',
        sl5.l5_servidorPublico AS 'ServPub'
    FROM sqlreg3.l1parte slp
    INNER JOIN sqlreg3.l5 sl5 ON (slp.p1_parte = sl5.l5_parte AND slp.p1_seq = sl5.l5_seq)
    WHERE slp.p1_protocolo='${occurrenceNumber}'
`;

  return query.trim();
}
