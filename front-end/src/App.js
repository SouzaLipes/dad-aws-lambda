import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [nota1, setNota1] = useState('');
  const [nota2, setNota2] = useState('');
  const [media, setMedia] = useState(null);
  const [mesnsagemBoasVindas, setMensagemBoasVindas] = useState('');

  const calcularMedia = async () => {
    try {
      const response = await axios.post('https://cx4ihg25343nqyhahd2ndrilra0gccto.lambda-url.sa-east-1.on.aws/', {
        nota1: parseFloat(nota1),
        nota2: parseFloat(nota2)
      });

      setMedia(response.data.message);
    } catch (error) {
      console.error('Ocorreu um erro ao calcular a média:', error);
    }
  };

  const boasVindas = async () => {
    try {
      const response = await axios.get('https://al3ijok58l.execute-api.sa-east-1.amazonaws.com/dev/hello');

      setMensagemBoasVindas(response.message);
    } catch (error) {
      console.error('Ocorreu um erro ao buscar a mensagem de boas vindas:', error);
    }
  }


  useEffect(() => boasVindas(), [mesnsagemBoasVindas]);

  return (
    <div>
      <input type="text" value={nota1} onChange={(e) => setNota1(e.target.value)} placeholder="Nota 1" />
      <input type="text" value={nota2} onChange={(e) => setNota2(e.target.value)} placeholder="Nota 2" />
      <button onClick={calcularMedia}>Calcular Média</button>
      {media && <p>{media}</p>}
    </div>
  );
};

export default MyComponent;
