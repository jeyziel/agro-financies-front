export interface IndicativoIndividual{

    custo: Custo,
    producao: Producao,
    data_poda: String
}

interface Custo{
    valor: Number,
    objetivo: Number

}

interface Producao{
    valor: Number,
    quantidade: Number
}