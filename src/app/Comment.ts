//Tecidos
export interface Component {
    id?: number,
    nome: string,
    composicao?: string,
    gramatura?: number,
    rendimento?: number,
    acabamento?: number,
    referencia?: number,
    avista?: number,
    prazo?: number,
    observacao?: string,
    imagem?: string,
    fornecedor?: string,
    fornecedorId?: number,
    created_at?: string,
    updated_at?: string,
}