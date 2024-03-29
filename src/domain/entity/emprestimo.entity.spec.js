const emprestimoEntity = require("./emprestimo.entity");

describe('Emprestimo Entity', function() {
  test('deve calular a multa com atraso', () => {
    const payload = {
      data_retorno: new Date('2024-02-23'),
      data_devolucao: new Date('2024-02-24'),
    };

    const multa = emprestimoEntity.calcularMulta(payload);
    
    expect(multa).toBe(10.0);
  });

  test('deve calular a multa sem atraso', () => {
    const payload = {
      data_retorno: new Date('2024-02-23'),
      data_devolucao: new Date('2024-02-23'),
    };

    const multa = emprestimoEntity.calcularMulta(payload);
    
    expect(multa).toBe(0.0);
  });
});
