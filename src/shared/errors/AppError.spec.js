const AppError = require("./AppError");

describe('AppError', function() {
  test('deve ser uma instancia de Error', () => {
    const sut = new AppError('mensagem de erro');
    expect(sut).toBeInstanceOf(Error);
  });

  test('deve ter a mensagem de erro correta', () => {
    const sut = new AppError('mensagem de erro');
    expect(sut.message).toBe('mensagem de erro');
  });
  
});
