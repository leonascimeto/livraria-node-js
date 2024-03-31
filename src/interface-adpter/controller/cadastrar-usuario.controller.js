const httpResponse = require("../../helpers/http.response");
const AppError = require("../../shared/errors/AppError");

module.exports = async function cadastrarUsuarioController({
  cadastraUsuarioUseCase, httpRequest
}) {
  if(!cadastraUsuarioUseCase || !httpRequest) throw new AppError(AppError.dependencies);
  const { nome, cpf, endereco, telefone, email } = httpRequest.body;
  const output = await cadastraUsuarioUseCase({ nome, cpf, endereco, telefone, email});
  return output.fold(
    (error) => httpResponse(400, error),
    () => httpResponse(201, null)
  )
}
