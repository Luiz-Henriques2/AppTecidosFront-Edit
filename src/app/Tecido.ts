export interface TecidoInterface {
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
    image?: string,

    caracteristica?: string,
    tecnologia?: string,
    favoritar?: boolean,
    prazoentrega?: number,
    prazodesenvolvimento?: number,

    fornecedor?: string,
    fornecedor_id?: number,
    created_at?: string,
    updated_at?: string,
}