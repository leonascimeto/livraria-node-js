const httpResponse = require("../../helpers/http.response");

module.exports = async function cadastrarUsuarioController({
  cadastraUsuarioUseCase, httpRequest
}) {
  const { nome, cpf, endereco, telefone, email } = httpRequest.body;
  const output = await cadastraUsuarioUseCase({ nome, cpf, endereco, telefone, email});
  return output.fold(
    (error) => httpResponse(400, error.message),
    () => httpResponse(201, null)
  )
}
