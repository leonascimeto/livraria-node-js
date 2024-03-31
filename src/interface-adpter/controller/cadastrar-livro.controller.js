const { z } = require("zod");
const { AppError } = require("../../shared/errors");
const httpResponse = require("../../helpers/http.response");

const zodSchema = z.object({
  titulo: z.string({required_error: "Título é obrigatório"}),
  quantidade: z.number({required_error: "Quantidade é obrigatório"}),
  autor: z.string({required_error: "Autor é obrigatório"}),
  genero: z.string({required_error: "Gênero é obrigatório"}),
  isbn: z.string({required_error: "ISBN é obrigatório"}),
});

module.exports = async function cadastrarLivroController({ cadastrarLivroUseCase, httpRequest }) {
    if(!cadastrarLivroUseCase || !httpRequest) throw new AppError(AppError.dependencies);
    const { titulo, quantidade, autor, genero, isbn } = zodSchema.parse(httpRequest.body);
    const output = await cadastrarLivroUseCase({ titulo, quantidade, autor, genero, isbn });
    return output.fold(
      (error) => httpResponse(400, error.message),
      () => httpResponse(201, null)
    );
}
