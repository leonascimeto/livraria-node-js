# Épico: Controle de Biblioteca

Uma biblioteca pequena gostaria de controlar a entrada e saída de livros, cadastrando usuários que irão pegar livros emprestados, cadastrando livros na biblioteca e permitindo empréstimos para qualquer usuário, além de buscar os registros de empréstimos.

## Entidades

- **Usuário**: [Nome, CPF, Email, Telefone, Logradouro]
- **Livro**: [Título, Autor, Gênero, Quantidade, ISBN]
- **Empréstimo**: [Usuário, Livro, Data de Empréstimo, Data de Devolução]

## Casos de Uso (Regras de Negócio)

- [x] **Cadastrar Usuário**

  - [x] CPF ou email devem ser únicos

- [x] **Buscar Usuário por CPF**

  - [x] Retorna um usuário ou vazio

- [x] **Cadastrar Livro**

  - [x] ISBN deve ser único

- [x] **Buscar Livro por ISBN**

  - [x] Retorna um livro ou vazio

- [x] **Emprestar Livro**

  - [x] Data de retorno não pode ser maior que a data de saída
  - [x] Não pode emprestar livro que não existe
  - [x] Não pode emprestar livro que não está em estoque
  - [x] Não pode emprestar livro para usuário que não existe
  - [x] Não pode emprestar livro para usuário que já tem 3 livros emprestados
  - [x] Não pode emprestar livro para usuário que já tem livro com mesmo ISBN emprestado
  - [x] Não pode emprestar livro para usuário que está com pendência de devolução
  - [x] Ao cadastrar empréstimo, será enviado um email para o usuário com a data de devolução, data de empréstimo e informações do livro

- [x] **Devolver Livro**

  - [x] Não pode devolver livro que não foi emprestado
  - [x] Caso usuário devolva o livro após a data de devolução, será cobrada uma multa fixa de R$ 10,00

- [x] **Buscar Empréstimos**
  - [x] Retorna todos os empréstimos

## Repositorios

### UsuarioRepository

- [x] cadastrar: ({nome, cpf, telefone, endereco, email}) => Promise<void>
- [x] existePorCpf: (cpf) => Promise<boolean>
- [x] existePorEmail: (email) => Promise<boolean>
- [x] buscarUsuarioPorCpf: (cpf) => Promise<Usuario>

### LivroRepository

- [ ] cadastrar: ({titulo, autor, genero, quantidade, ISBN}) => Promise<void>
- [ ] existePorISBN: (ISBN) => Promise<boolean>
- [ ] buscarLivro: (ISBN) => Promise<Livro>

### EmprestimoRepository

- [ ] emprestar: ({usuario_id, livro_id, data_saida, data_retorno}) => Promise<string>
- [ ] existeLivroPendenteUsuario: ({usuario_id, livro_id}) => Promise<boolean>
- [ ] quantidadeLivrosEmprestadoPorUsuario: (usuario_id) => Promise<number>
- [ ] devolverLivro: ({emprestimo_id, data_devolucao}) => Promise<Date>
- [ ] buscarEmprestimosPendentes: () => Promise<Emprestimo[]>
