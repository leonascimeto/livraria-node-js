const httpResponse = require("../../helpers/http.response");
const AppError = require("../../shared/errors/AppError");

const {z} = require("zod");

const zodSchema = z.object({
  nome: z.string({required_error: "Nome é obrigatório"}),
  cpf: z
    .string({required_error: "CPF é obrigatório"})
    .refine(value => /^([0-9]{3}\.){2}[0-9]{3}-[0-9]{2}$/.test(value)),
  endereco: z.string({
    required_error: "Endereço é obrigatório"
  }),
  telefone: z.string({
    required_error: "Telefone é obrigatório"
  }),
  email: z.string({required_error: "Email é obrigatório"}).email({message: "Email inválido"})
});

module.exports = async function cadastrarUsuarioController({
  cadastraUsuarioUseCase, httpRequest
}) {
  if(!cadastraUsuarioUseCase || !httpRequest) throw new AppError(AppError.dependencies);
  const { nome, cpf, endereco, telefone, email } = zodSchema.parse(httpRequest.body);
  const output = await cadastraUsuarioUseCase({ nome, cpf, endereco, telefone, email});
  return output.fold(
    (error) => httpResponse(400, error),
    () => httpResponse(201, null)
  )
}
