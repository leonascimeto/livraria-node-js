const { typeormServer } = require('../setup')

const typeOrmUsuariosRepository = typeormServer.getRepository('Usuario')

const usuarioRepository = function(){
  const cadastrar = async function({cpf, email, endereco, nome, telefone}){
    await typeOrmUsuariosRepository.save({cpf, email, endereco, nome, telefone});
  }

  return {cadastrar}
}

module.exports = {usuarioRepository, typeOrmUsuariosRepository}
