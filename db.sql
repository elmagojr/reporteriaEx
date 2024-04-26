      select coop_codigo,coop_nombre,aho_codigo_cta as cuenta,(SUM(TRA_MTO_DEPOSITO)+SUM(TRA_MTO_RETIRO)+sum(TRA_MTO_INGRESO)+sum(TRA_MTO_INTERES)) as monto,
        tra_fecha_trans as fecha,tra_agrego as agrego,tra_secuencia as secuencia
        from dba.TRANS_AHORRO,DBA.Usuarios,dba.tipos_trans,dba.ahorros,dba.cooperativistas
        where aho_codigo_coo = coop_codigo and aho_codigo_cta = tra_codigo_cta and TRA_AGREGO = USU_CODIGO
        and TRA_AGREGO = any(select distinct(REG_CODIGO_CAJERO) from dba.REG_CAJERO where reg_fecha >= '01/01/2023')
        and TRA_ESTADO <> 3 and TRA_TIPO_PAGO like '%' and TRA_FECHA_TRANS >= '01/01/2023' and TRA_FECHA_TRANS <= '01/01/2024' and tra_tipo_trans = ttr_codigo
        and ttr_descripcion like 'NOTA DE CREDITO' and USU_CODIGO like '%' and tra_filial like 1
        group by coop_codigo,coop_nombre,aho_codigo_cta,tra_fecha_trans,tra_agrego,tra_secuencia union all
      select coop_codigo,coop_nombre,cre_codigo_cta as cuenta,(SUM(TRC_MTO_CAPITAL)+SUM(TRC_MTO_INTERES)+sum(TRC_MTO_MORA)+sum(TRC_OTROS_CARGOS)) as monto,
        trc_fecha_trans as fecha,trc_agrego as agrego,trc_secuencia as secuencia
        from dba.TRANS_CREDITO,DBA.Usuarios,dba.tipos_trans,dba.creditos,dba.cooperativistas
        where cre_codigo_coop = coop_codigo and cre_codigo_cta = trc_codigo_cta and TRC_AGREGO = USU_CODIGO
        and TRC_AGREGO = any(select distinct(REG_CODIGO_CAJERO) from dba.REG_CAJERO where reg_fecha >= '01/01/2023')
        and TRC_ESTADO <> 3 and TRC_TIPO_PAGO like '%' and TRC_FECHA_TRANS >= '01/01/2023' and TRC_FECHA_TRANS <= '01/01/2024' and trc_tipo_trans = ttr_codigo
        and ttr_descripcion like 'NOTA DE CREDITO' and USU_CODIGO like '%' and trc_filial like 1
        group by coop_codigo,coop_nombre,cre_codigo_cta,trc_fecha_trans,trc_agrego,trc_secuencia order by monto desc