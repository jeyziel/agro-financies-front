export interface CategoriaProduto{

    id: Number;
    name: String;
    description: String;
    created_at: String;
    consumptions: ConsumptionProducts[]
}

interface ConsumptionProducts{

    product_id: Number;
    product_name: String;
    unit_name: String;
    quantity: Number,
    unit_value: Number;
    total: Number;
    employee_name: String;
    user_name: String;
    consumption_at: String;
}

export interface CategoryTask{

    id: Number;
    name: String;
    description: String;
    created_at: String;
    consumptions: ConsumptionTaks[]
}

interface ConsumptionTaks{

    task_id: Number;
    task_name: String;
    area_name: String;
    price: Number;
    quantity: Number,
    total: Number;
    employee_name: String;
    user_name: String;
    consumption_at: String;
}