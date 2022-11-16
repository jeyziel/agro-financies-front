export interface InformacoesDetalhadas {
    cultura: String;
    variedade: String;
    quantidade_linhas ?: Number;
    tamanho: Number;
    quantidade_plantas: Number;
    porta_enxerto: Number;
    espacamento: Number;
    data_plantio: String,
    producao?: Producao;
    custo?: Custo;
}

interface Custo{
    valor: Number,
    objetivo: Number,
    categorias?: Categorias
}

interface Producao{
    quantidade: Number,
    valor: Number
    objetivo: Number
    custoKg?: Number
    precoMedio?: Number
}

interface Categorias{
    nome ?: String,
    percentual ?: String,
    valor ?: Number,
}