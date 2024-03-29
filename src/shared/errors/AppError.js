module.exports = class AppError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
  }

  static dependencies = "Alguma dependencia obrigatoria não fornecida"
  static fieldsObligatory = "Campos obrigatórios não fornecidos"
}
