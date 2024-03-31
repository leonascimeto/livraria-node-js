const { z } = require("zod");
const { AppError } = require("../../../shared/errors");
const httpResponse = require("../http-response");

const zodSchema = z.object({
  valor: z.string({required_error: "Valor é obrigatório"}),
});

module.exports = async function buscarLivroController({ buscarLivroUseCase, httpRequest }) {
  if(!buscarLivroUseCase || !httpRequest) throw new AppError(AppError.dependencies);
  const { valor } = zodSchema.parse(httpRequest.query);
  const output = await buscarLivroUseCase({ valor });
  return output.fold(
    (error) => httpResponse(400, error.message),
    (livro) => httpResponse(200, livro)
  );
}
