export interface InformacoesGerais {
    cultura: String;
    variedade: String;
    quantidade_linhas?: Number;
    quantidade_plantas: Number;
    porta_enxerto: Number;
    espacamento: Number;
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