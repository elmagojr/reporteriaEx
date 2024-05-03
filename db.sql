ALTER PROCEDURE "DBA"."Consulta_Aportaciones_Generales"( in p_fecha1 date,in p_fecha2 date,in p_filial varchar,in p_tipo_cta integer,in p_monto numeric(18,2) ) 
begin
  declare vfecha date;
  declare vcuenta integer;
  declare vsaldo numeric(18,2);
  declare vcfilial integer;
  declare vfilial varchar(30);
  declare vTOTAL_CTAS1 numeric(18,2);
  declare vTOTAL_CTAS2 numeric(18,2);
  declare vMONTO1 numeric(18,2);
  declare vMONTO2 numeric(18,2);
  declare vAHO_PROM1 numeric(18,2);
  declare vAHO_PROM2 numeric(18,2);
  declare vCTAS_FONDOS1 numeric(18,2);
  declare vCTAS_FONDOS2 numeric(18,2);
  declare vMONTOF1 numeric(18,2);
  declare vMONTOF2 numeric(18,2);
  declare vAHO_PROMF1 numeric(18,2);
  declare vAHO_PROMF2 numeric(18,2);
  create table #Cooperativistas(
    FECHA1 date null,
    FECHA2 date null,
    TOTAL_CTAS1 integer null,
    TOTAL_CTAS2 integer null,
    MONTO1 numeric(18,2) null,
    MONTO2 numeric(18,2) null,
    AHO_PROM1 numeric(18,2) null,
    AHO_PROM2 numeric(18,2) null,
    CTAS_FONDOS1 integer null,
    CTAS_FONDOS2 integer null,
    MONTOF1 numeric(18,2) null,
    MONTOF2 numeric(18,2) null,
    AHO_PROMF1 numeric(18,2) null,
    AHO_PROMF2 numeric(18,2) null,
    USUARIO varchar(50) null,);
  begin
    if p_fecha1 = p_fecha2 then
      set vTOTAL_CTAS1 = (select count(1)
          from dba.ahorros as a
          where exists(select aho_codigo_cta
            from dba.ahorros,dba.trans_ahorro where tra_codigo_cta = aho_codigo_cta
            and aho_tipo_cta = p_tipo_cta
            ---  and aho_fecha_apertura <= p_fecha1 
            and tra_fecha_trans <= p_fecha1
            and aho_codigo_cta = a.aho_codigo_cta
            group by aho_codigo_cta
            having sum(TRA_MTO_DEPOSITO-TRA_MTO_RETIRO+TRA_MTO_INTERES-Trans_Ahorro.TRA_MTO_ISR) >= 0)
          and aho_filial like p_filial);
      set vMONTO1 = (select sum(a.monto)
          --- and aho_fecha_apertura <= p_fecha1 
          from(select sum(TRA_MTO_DEPOSITO-TRA_MTO_RETIRO+TRA_MTO_INTERES-Trans_Ahorro.TRA_MTO_ISR) as monto
              from dba.ahorros,dba.trans_ahorro
              where tra_codigo_cta = aho_codigo_cta and aho_tipo_cta = p_tipo_cta
              and tra_fecha_trans <= p_fecha1
              group by aho_filial,aho_codigo_cta
              having sum(TRA_MTO_DEPOSITO-TRA_MTO_RETIRO+TRA_MTO_INTERES-Trans_Ahorro.TRA_MTO_ISR) >= 0 and aho_filial like p_filial) as a);
      set vAHO_PROM1 = vMONTO1/vTOTAL_CTAS1;
      if p_monto > 0 then
        set vCTAS_FONDOS1 = (select count(1)
            from dba.ahorros as a
            where exists(select aho_codigo_cta
              from dba.ahorros,dba.trans_ahorro where tra_codigo_cta = aho_codigo_cta
              and aho_tipo_cta = p_tipo_cta
              --- and aho_fecha_apertura <= p_fecha1 
              and tra_fecha_trans <= p_fecha1
              and aho_codigo_cta = a.aho_codigo_cta
              group by aho_codigo_cta
              having sum(TRA_MTO_DEPOSITO-TRA_MTO_RETIRO+TRA_MTO_INTERES-Trans_Ahorro.TRA_MTO_ISR) >= p_monto)
            and aho_filial like p_filial);
        set vMONTOF1 = (select sum(a.monto)
            ---   and aho_fecha_apertura <= p_fecha1 
            from(select sum(TRA_MTO_DEPOSITO-TRA_MTO_RETIRO+TRA_MTO_INTERES-Trans_Ahorro.TRA_MTO_ISR) as monto
                from dba.ahorros,dba.trans_ahorro
                where tra_codigo_cta = aho_codigo_cta and aho_tipo_cta = p_tipo_cta
                and tra_fecha_trans <= p_fecha1
                group by aho_filial,aho_codigo_cta
                having sum(TRA_MTO_DEPOSITO-TRA_MTO_RETIRO+TRA_MTO_INTERES-Trans_Ahorro.TRA_MTO_ISR) >= p_monto and aho_filial like p_filial) as a);
        set vAHO_PROMF1 = vMONTOF1/vCTAS_FONDOS1
      else
        set vCTAS_FONDOS1 = (select count(1)
            from dba.ahorros as a
            where exists(select aho_codigo_cta
              from dba.ahorros,dba.trans_ahorro where tra_codigo_cta = aho_codigo_cta
              and aho_tipo_cta = p_tipo_cta
              ---  and aho_fecha_apertura <= p_fecha1 
              and tra_fecha_trans <= p_fecha1
              and aho_codigo_cta = a.aho_codigo_cta
              group by aho_codigo_cta
              having sum(TRA_MTO_DEPOSITO-TRA_MTO_RETIRO+TRA_MTO_INTERES-Trans_Ahorro.TRA_MTO_ISR) >= p_monto)
            and aho_filial like p_filial);
        set vMONTOF1 = (select sum(a.monto)
            ---  and aho_fecha_apertura <= p_fecha1 
            from(select sum(TRA_MTO_DEPOSITO-TRA_MTO_RETIRO+TRA_MTO_INTERES-Trans_Ahorro.TRA_MTO_ISR) as monto
                from dba.ahorros,dba.trans_ahorro
                where tra_codigo_cta = aho_codigo_cta and aho_tipo_cta = p_tipo_cta
                and tra_fecha_trans <= p_fecha1
                group by aho_filial,aho_codigo_cta
                having sum(TRA_MTO_DEPOSITO-TRA_MTO_RETIRO+TRA_MTO_INTERES-Trans_Ahorro.TRA_MTO_ISR) >= p_monto and aho_filial like p_filial) as a);
        set vAHO_PROMF1 = vMONTOF1/vCTAS_FONDOS1
      end if;
      insert into #Cooperativistas( FECHA1,FECHA2,TOTAL_CTAS1,MONTO1,AHO_PROM1,CTAS_FONDOS1,MONTOF1,AHO_PROMF1,USUARIO ) values
        ( p_fecha1,p_fecha2,vTOTAL_CTAS1,vMONTO1,vAHO_PROM1,vCTAS_FONDOS1,vMONTOF1,vAHO_PROMF1,current user ) ;
      select FECHA1,FECHA2,TOTAL_CTAS1,MONTO1,AHO_PROM1,CTAS_FONDOS1,MONTOF1,AHO_PROMF1,USUARIO
        from #Cooperativistas
    else -------este es sino de las fechas
      set vTOTAL_CTAS2 = (select count(1)
          from dba.ahorros as a where exists(select aho_codigo_cta
            from dba.ahorros,dba.trans_ahorro where tra_codigo_cta = aho_codigo_cta
            and aho_tipo_cta = p_tipo_cta
            ---  and aho_fecha_apertura <= p_fecha2 
            and tra_fecha_trans <= p_fecha2
            and aho_codigo_cta = a.aho_codigo_cta
            group by aho_codigo_cta
            having sum(TRA_MTO_DEPOSITO-TRA_MTO_RETIRO+TRA_MTO_INTERES-Trans_Ahorro.TRA_MTO_ISR) >= 0)
          and aho_filial like p_filial);
      set vMONTO2 = (select sum(a.monto)
          ----  and aho_fecha_apertura <= p_fecha2
          from(select sum(TRA_MTO_DEPOSITO-TRA_MTO_RETIRO+TRA_MTO_INTERES-Trans_Ahorro.TRA_MTO_ISR) as monto
              from dba.ahorros,dba.trans_ahorro where tra_codigo_cta = aho_codigo_cta and aho_tipo_cta = p_tipo_cta
              and tra_fecha_trans <= p_fecha2
              group by aho_filial,aho_codigo_cta
              having sum(TRA_MTO_DEPOSITO-TRA_MTO_RETIRO+TRA_MTO_INTERES-Trans_Ahorro.TRA_MTO_ISR) >= 0 and aho_filial like p_filial) as a);
      set vAHO_PROM2 = vMONTO2/vTOTAL_CTAS2;
      if p_monto > 0 then
        set vCTAS_FONDOS2 = (select count(1)
            from dba.ahorros as a
            where exists(select aho_codigo_cta
              from dba.ahorros,dba.trans_ahorro where tra_codigo_cta = aho_codigo_cta
              and aho_tipo_cta = p_tipo_cta
              ---   and aho_fecha_apertura <= p_fecha2 
              and tra_fecha_trans <= p_fecha2
              and aho_codigo_cta = a.aho_codigo_cta
              group by aho_codigo_cta
              having sum(TRA_MTO_DEPOSITO-TRA_MTO_RETIRO+TRA_MTO_INTERES-Trans_Ahorro.TRA_MTO_ISR) >= p_monto)
            and aho_filial like p_filial);
        set vMONTOF2 = (select sum(a.monto)
            ---  and aho_fecha_apertura <= p_fecha2 
            from(select sum(TRA_MTO_DEPOSITO-TRA_MTO_RETIRO+TRA_MTO_INTERES-Trans_Ahorro.TRA_MTO_ISR) as monto
                from dba.ahorros,dba.trans_ahorro where tra_codigo_cta = aho_codigo_cta and aho_tipo_cta = p_tipo_cta
                and tra_fecha_trans <= p_fecha2
                group by aho_filial,aho_codigo_cta
                having sum(TRA_MTO_DEPOSITO-TRA_MTO_RETIRO+TRA_MTO_INTERES-Trans_Ahorro.TRA_MTO_ISR) >= p_monto and aho_filial like p_filial) as a);
        set vAHO_PROMF2 = vMONTOF2/vCTAS_FONDOS2
      else
        set vCTAS_FONDOS2 = (select count(1)
            from dba.ahorros as a
            where exists(select aho_codigo_cta
              from dba.ahorros,dba.trans_ahorro where tra_codigo_cta = aho_codigo_cta
              and aho_tipo_cta = p_tipo_cta
              ---  and aho_fecha_apertura <= p_fecha2 
              and tra_fecha_trans <= p_fecha2
              and aho_codigo_cta = a.aho_codigo_cta
              group by aho_codigo_cta
              having sum(TRA_MTO_DEPOSITO-TRA_MTO_RETIRO+TRA_MTO_INTERES-Trans_Ahorro.TRA_MTO_ISR) >= p_monto)
            and aho_filial like p_filial);
        set vMONTOF2 = (select sum(a.monto)
            --- and aho_fecha_apertura <= p_fecha2 
            from(select sum(TRA_MTO_DEPOSITO-TRA_MTO_RETIRO+TRA_MTO_INTERES-Trans_Ahorro.TRA_MTO_ISR) as monto
                from dba.ahorros,dba.trans_ahorro where tra_codigo_cta = aho_codigo_cta and aho_tipo_cta = p_tipo_cta
                and tra_fecha_trans <= p_fecha2
                group by aho_filial,aho_codigo_cta
                having sum(TRA_MTO_DEPOSITO-TRA_MTO_RETIRO+TRA_MTO_INTERES-Trans_Ahorro.TRA_MTO_ISR) >= p_monto and aho_filial like p_filial) as a);
        set vAHO_PROMF2 = vMONTOF2/vCTAS_FONDOS2
      end if;
      insert into #Cooperativistas( FECHA1,FECHA2,TOTAL_CTAS2,MONTO2,AHO_PROM2,CTAS_FONDOS2,MONTOF2,AHO_PROMF2,USUARIO ) values
        ( p_fecha1,p_fecha2,vTOTAL_CTAS2,vMONTO2,vAHO_PROM2,vCTAS_FONDOS2,vMONTOF2,vAHO_PROMF2,current user ) ;
SELECT *
--      select FECHA1,FECHA2,TOTAL_CTAS2,MONTO2,AHO_PROM2,CTAS_FONDOS2,MONTOF2,AHO_PROMF2,USUARIO
        from #Cooperativistas
    end if
  end
end