//resposta - mensagens de confirmação
export interface Response<T> {
    message?: string;
    data: T;
}