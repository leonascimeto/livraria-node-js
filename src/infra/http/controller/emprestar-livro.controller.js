const httpResponse = require("../http-response");
const { AppError } = require("../../../shared/errors");

const { z } = require("zod");

const zodSchema = z.object({
  livro_id: z.number({required_error: "ID do livro é obrigatório"}),
  usuario_id: z.number({required_error: "ID do usuário é obrigatório"}),
  data_saida: z.string({required_error: "Data de saída é obrigatória"}),
  data_retorno: z.string({required_error: "Data de retorno é obrigatória"})
});

module.exports = async function emprestarLivroController({ emprestarLivroUseCase, httpRequest }) {
  if(!emprestarLivroUseCase || !httpRequest) throw new AppError(AppError.dependencies);
  const { livro_id, usuario_id, data_saida, data_retorno } = zodSchema.parse(httpRequest.body);
  const output = await emprestarLivroUseCase({ 
    livro_id, 
    usuario_id, 
    data_saida: new Date(data_saida), 
    data_retorno: new Date(data_retorno) 
  });
  return output.fold(
    (error) => httpResponse(400, error.message),
    () => httpResponse(200, null)
  );
}
