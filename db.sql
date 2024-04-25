SELECT
    'PERSONA JURIDICA' Afiliado,
    COUNT (1) Cantidad
FROM
    DBA.Cooperativistas
WHERE
    Coop_Es_Empresa = 1
    AND EXISTS (
        SELECT
            Aho_Codigo_Cta,
            Isnull (
                SUM (
                    Tra_Mto_Deposito + Tra_Mto_Interes - Tra_Mto_Retiro - Tra_Mto_Isr
                ),
                0
            ) Saldo
        FROM
            DBA.Trans_Ahorro
            INNER JOIN DBA.Ahorros ON Tra_Codigo_Cta = Aho_Codigo_Cta
        WHERE
            Aho_Codigo_Coo = Coop_Codigo
            AND Aho_Tipo_Cta = @[Parametros.PAR_CTA_APORTACION]
            AND AHO_INACTIVA = 0
            AND Tra_Fecha_Trans <= @[F_Variables.FECHA1]
        GROUP BY
            Aho_Codigo_Cta
        HAVING
            Saldo > 0.01
    )
GROUP BY
    Coop_Es_Empresa
UNION
ALL
SELECT
    CASE
        Coop_Sexo
        WHEN 0 THEN 'HOMBRE'
        WHEN 1 THEN 'MUJER'
        ELSE 'IDEFINIDO'
    END Afiliado,
    COUNT (1) Cantidad
FROM
    DBA.Cooperativistas
WHERE
    EXISTS (
        SELECT
            Aho_Codigo_Cta,
            Isnull (
                SUM (
                    Tra_Mto_Deposito + Tra_Mto_Interes - Tra_Mto_Retiro - Tra_Mto_Isr
                ),
                0
            ) Saldo
        FROM
            DBA.Trans_Ahorro
            INNER JOIN DBA.Ahorros ON Tra_Codigo_Cta = Aho_Codigo_Cta
        WHERE
            Aho_Codigo_Coo = Coop_Codigo
            AND Aho_Tipo_Cta = @[Parametros.PAR_CTA_APORTACION]
            AND AHO_INACTIVA = 0
            AND Tra_Fecha_Trans <= @[F_Variables.FECHA1]
        GROUP BY
            Aho_Codigo_Cta
        HAVING
            Saldo > 0.01
    )
    AND Coop_Es_Empresa = 0
GROUP BY
    Coop_Sexo
UNION
ALL
SELECT
    CASE
        Coop_Sexo
        WHEN 0 THEN 'NIÑOS'
        WHEN 1 THEN 'NIÑAS'
        ELSE 'INDEFINIDO'
    END Afiliados,
    COUNT (1) Cantidad
FROM
    DBA.Cooperativistas
WHERE
    EXISTS (
        SELECT
            Aho_Codigo_Cta,
            Isnull (
                SUM (
                    Tra_Mto_Deposito + Tra_Mto_Interes - Tra_Mto_Retiro - Tra_Mto_Isr
                ),
                0
            ) Saldo
        FROM
            DBA.Trans_Ahorro
            INNER JOIN DBA.Ahorros ON Tra_Codigo_Cta = Aho_Codigo_Cta
        WHERE
            Aho_Codigo_Coo = Coop_Codigo
            AND Aho_Tipo_Cta = @[Parametros.PAR_CTA_MENORES]
            AND AHO_INACTIVA = 0
            AND Tra_Fecha_Trans <= @[F_Variables.FECHA1]
        GROUP BY
            Aho_Codigo_Cta
        HAVING
            Saldo > 0.01
    )
    AND Coop_Es_Empresa = 0
GROUP BY
    Coop_Sexo
ORDER BY
    Cantidad