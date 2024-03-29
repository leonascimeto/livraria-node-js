module.exports = class AppError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
  }

  static dependencies = "Alguma dependencia obrigatoria não fornecida"
  static fieldsObligatory = "Campos obrigatórios não fornecidos"
  static userAlreadyRegistered = "Usuário já cadastrado"
  static isbnAlreadyRegistered = "ISBN já cadastrado"
}
