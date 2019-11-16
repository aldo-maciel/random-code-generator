class Dictionary {
    NENHUM_REGISTRO_ENCONTRADO: string = 'Nenhum registro encontrado!';
    DIGITE_UM_VALOR_AQUI: string = 'Digite um valor aqui...';
    PESQUIRE_AQUI: string = 'Pesquise aqui...';
    SIMBOLO_MOEDA: string = 'R$';
    CODES_DATA: string = 'Data';
    CODES_CODIGO: string = 'Código';
    CODES_VALOR: string = 'Valor';
    CODES_STATUS: string = 'Status';
    CODES_ACOES: string = 'Ação';
    CODES_TITLE: string = 'Gerador';
    CODES_USED_CODE: string = 'Definir como utilizado';
    CODES_CANCELED_CODE: string = 'Cancelar código';
    CODES_CANCELED_STATUS: string = 'Cancelado';
    CODES_REDEEMED_STATUS: string = 'Resgatado';
    CODES_PENDING_STATUS: string = 'Pendente';
    PAGINATE_PRIMEIRA: string = 'Primeira';
    PAGINATE_ANTERIOR: string = 'Anterior';
    PAGINATE_PROXIMA: string = 'Próxima';
    PAGINATE_ULTIMA: string = 'Última';
    PAGINATE_MOSTRANDO: string = 'Mostrando';
    PAGINATE_DE: string = 'de';
    PAGINATE_ATE: string = 'até';

    constructor() {
        Object.freeze(this);
    }
}

export const dictionary = new Dictionary();
