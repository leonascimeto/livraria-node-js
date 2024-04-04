CREATE TABLE "emprestimos" (
  "id" SERIAL NOT NULL,
  "data_saida" date NOT NULL,
  "data_retorno" date NOT NULL,
  "data_devolucao" date,
  "usuario_id" int4 NOT NULL,
  "livro_id" int4 NOT NULL,
  PRIMARY KEY ("id")
);
CREATE TABLE "livros" (
  "id" SERIAL NOT NULL,
  "titulo" varchar(255) NOT NULL,
  "autor" varchar(255) NOT NULL,
  "genero" varchar(255) NOT NULL,
  "isbn" varchar(255) NOT NULL,
  "quantidade" int4 NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "isbn" UNIQUE ("isbn")
);
CREATE TABLE "usuarios" (
  "id" SERIAL NOT NULL,
  "nome_" varchar(255) NOT NULL,
  "cpf" varchar(255) NOT NULL,
  "endereco" varchar(255) NOT NULL,
  "telefone" varchar(255) NOT NULL,
  "email" varchar(255) NOT NULL,
	PRIMARY KEY ("id"),
  CONSTRAINT "cpf" UNIQUE ("cpf"),
  CONSTRAINT "Email" UNIQUE ("email")
);
ALTER TABLE "emprestimos" ADD CONSTRAINT "EmprestimosUsuarios" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "emprestimos" ADD CONSTRAINT "EmprestimosLivros" FOREIGN KEY ("livro_id") REFERENCES "livros" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
