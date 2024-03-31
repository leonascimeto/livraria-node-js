const { z } = require("zod");
const httpResponse = require("../http-response");
const { AppError } = require("../../../shared/errors");

const zodSchema = z.object({
  cpf: z
    .string({required_error: "CPF é obrigatório"})
    .refine(value => /^([0-9]{3}\.){2}[0-9]{3}-[0-9]{2}$/.test(value)),
});

module.exports = async function buscarUsuarioPorCpfController({ buscarUsuarioPorCpfUseCase, httpRequest }) {
    if(!buscarUsuarioPorCpfUseCase || !httpRequest) throw new AppError(AppError.dependencies);
    const { cpf } = zodSchema.parse(httpRequest.params);
    const output = await buscarUsuarioPorCpfUseCase({cpf});
    return output.fold(
      (error) => httpResponse(400, error.message),
      (usuario) => httpResponse(200, usuario)
    );
}
