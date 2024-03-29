## Épico: Controle de Biblioteca

Biblioteca pequena gostaria controlar a entrada e saída de livros.
Cadastrar Usuarios que irá pegar livro emprestado, cadastrar livros na biblioteca e poder emprestar ára qualquer usuário, além de buscar os registros de emprestimos.

## dados

-  usuário: [nome, cpf, email, telefone, logradouro]
-  livro: [titulo, autor, genero, quantidade, ISBN]
-  emprestimo: [usuario, livro, data_emprestimo, data_devolucao]

## UseCases (Regras de Negócio)

-  Cadastrar Usuário

   -  CPF ou email devem ser únicos

-  Buscar usuário por CPF

   -  Retorna um usuário ou vazio

-  Cadastrar Livro

   -  ISBN deve ser único

-  Buscar Livro por ISBN

   -  Retorna um livro ou vazio

-  Emprestar Livro

   -  Data de retorno não pode ser maior que a data de saída
   -  Não pode emprestar livro que não existe
   -  Não pode emprestar livro que não tem em estoque
   -  Não pode emprestar livro para usuário que não existe
   -  Não pode emprestar livro para usuário que já tem 3 livros emprestados
   -  Não pode emprestar livro para usuário que está com livro de mesmo ISBN emprestado
   -  Não pode emprestar livro para usuário que está com pendência de devolução
   -  Ao cadastrar empréstimo, será enviado um email para o usuário com a data de devolução, data de emprestimo e informações do livro

-  Devolver Livro

   -  Não pode devolver livro que não foi emprestado
   -  Caso usuário devolva o livro após a data de devolução, será cobrado uma multa fixa de R$ 10,00

-  Buscar Empréstimos
   -  Retorna todos os empréstimos

## Estruturas

## UsuarioRepositry

[] cadastrar: ({nome, cpf, telefone, endereco, email}) => Promise<void>
