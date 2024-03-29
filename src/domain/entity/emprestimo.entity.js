const emprestimoEntity = function() {
  const VALOR_MULTA = 10.0;

  estaAtrasado = ({data_retorno, data_devolucao}) => {
    return new Date(data_devolucao).getTime() > new Date(data_retorno).getTime();
  }

  calcularMulta = ({data_retorno, data_devolucao}) => {
    return estaAtrasado({data_retorno, data_devolucao}) ? VALOR_MULTA : 0.0;
  }

  return { calcularMulta };
}

module.exports = emprestimoEntity();
