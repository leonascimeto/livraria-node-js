const httpResponse = require("../../http-response");
const { AppError } = require("../../../../shared/errors");
const z = require("zod");

const zodSchemaBody = z.object({
  data_devolucao: z.string({required_error: "Data de devolução é obrigatória"}),
});

const zodSchemaParams = z.object({
  emprestimo_id: z.number({required_error: "ID do empréstimo é obrigatório"}),
});

module.exports = async function devolverLivroController({ devolverLivroUseCase, httpRequest }) {
  if(!devolverLivroUseCase || !httpRequest) throw new AppError(AppError.dependencies);
  const {  data_devolucao } = zodSchemaBody.parse(httpRequest.body);
  const { emprestimo_id } = zodSchemaParams.parse(httpRequest.params);
  const output = await devolverLivroUseCase({ 
    emprestimo_id, 
    data_devolucao: new Date(data_devolucao) 
  });
  return output.fold(
    (error) => httpResponse(400, error.message),
    (resultado) => httpResponse(200, resultado)
  );
}
