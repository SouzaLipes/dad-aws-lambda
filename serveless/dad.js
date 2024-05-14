'use strict';

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Olá, bem-vindos. Sou a função lambda de "bem-vindo", acionada ao iniciar a aplicação.',
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.calcularMedia= async (event) => {
  try{
      const nota1 = event.nota1;
      const nota2 = event.nota2;

      const media = (parseFloat(nota1) + parseFloat(nota2)) / 2;
      

      return {
        statusCode: 200,
        body: JSON.stringify({
          media: media
        })
      };
  }catch (err) {
    return err;
  }
};