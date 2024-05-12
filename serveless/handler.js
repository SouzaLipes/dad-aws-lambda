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

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.calcularMedia= async (event) => {
  try{
    exports.handler = async (event) => {
      const nota1 = event.nota1;
      const nota2 = event.nota2;

      const media = (parseFloat(nota1) + parseFloat(nota2)) / 2;
      

      return {
        statusCode: 200,
        body: JSON.stringify({
          media: media
        })
      };
    };
  }catch (err) {
    return err;
  }
};