const { typeormServer } = require('../setup')

const typeOrmUsuariosRepository = typeormServer.getRepository('Usuario')

const usuarioRepository = function(){
  const cadastrar = async function({cpf, email, endereco, nome, telefone}){
    await typeOrmUsuariosRepository.save({cpf, email, endereco, nome, telefone});
  }

  const buscarPorCpf = async function(cpf){
    return await typeOrmUsuariosRepository.findOne({
      where: {cpf}
    });
  }

  return {cadastrar, buscarPorCpf}
}

module.exports = {usuarioRepository, typeOrmUsuariosRepository}
