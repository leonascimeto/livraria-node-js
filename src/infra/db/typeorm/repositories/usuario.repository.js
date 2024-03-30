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

  const existePorEmail = async function(email){
    return await typeOrmUsuariosRepository.count(
      {where: {email}}
    ) === 0 ? false : true;
  }

  const existePorCpf = async function(cpf){
    return await typeOrmUsuariosRepository.count(
      {where: {cpf}}
    ) === 0 ? false : true;
  }

  return {cadastrar, buscarPorCpf, existePorEmail, existePorCpf}
}

module.exports = {usuarioRepository, typeOrmUsuariosRepository}
