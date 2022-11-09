export interface InformacoesGerais {
    cultura: String;
    variedade: String;
    quantidade_linhas ?: Number;
    tamanho: Number;
    quantidade_plantas: Number;
    porta_enxerto: Number;
    espacamento: Number;
    data_plantio: String,
    producao?: Producao;
    custo: Custo;
}


interface Custo{
    valor: Number,
    objetivo: Number

}

interface Producao{
    valor: Number,
    objetivo: Number
}