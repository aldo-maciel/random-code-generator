import toastr from 'toastr';

export const onSuccess = () => toastr.success('Operação realizada com sucesso!', 'Sucesso');

export const onError = (error: Error) => {
    console.error(error);
    toastr.error('Ocorreu um erro na requisição!', 'Erro');
};
