export interface IndicativoIndividual{

    custo: Custo,
    producao: Producao,
    data_poda?: String
    area?: Area

}

interface Custo{
    valor: Number,
    objetivo?: Number

}

interface Producao{
    valor: Number,
    quantidade: Number
}

interface Area{
    quantidade: Number,
    tamanho: Number,
    custo_medio: Number
}