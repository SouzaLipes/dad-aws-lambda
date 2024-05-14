import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AWS from 'aws-sdk';
import * as StepFunctions from "aws-sdk/clients/stepfunctions";

AWS.config.update({
  region: 'sa-east-1',
});

const MyComponent = () => {
  const [nota1, setNota1] = useState('');
  const [nota2, setNota2] = useState('');
  const [media, setMedia] = useState(null);
  const [mensagemBoasVindas, setMensagemBoasVindas] = useState('');

  const calcularMedia = async () => {
 
      const response = await axios.post('https://al3ijok58l.execute-api.sa-east-1.amazonaws.com/dev/calcularMedia', {
        nota1: parseFloat(nota1),
        nota2: parseFloat(nota2)
      });

      setMedia(response.data.body);
      console.log(response.data.body);

      const stepfunctions = new StepFunctions({
        region: 'sa-east-1', // Insira sua região da AWS aqui
        credentials: {
            accessKeyId: '',
            secretAccessKey: ''
        }
      });
      const params = {
        stateMachineArn: 'arn:aws:states:sa-east-1:577163328740:stateMachine:MyStateMachine-ia8gmm1pm', 
        input: JSON.stringify({         
          nota1: parseFloat(nota1),
          nota2: parseFloat(nota2) 
        }), 
      };

      stepfunctions.startExecution(params, (err, data) => {
        console.log('teste')
        if (err) {
          console.error('Erro ao iniciar a execução da máquina de estado:', err);
        } else {
          console.log('Máquina de estado iniciada com sucesso:', data);
          
        }
      });

  };

  const boasVindas = async () => {
      const response = await axios.get('https://al3ijok58l.execute-api.sa-east-1.amazonaws.com/dev/hello');

      setMensagemBoasVindas(response.data.body);

      const stepfunctions = new StepFunctions({
        region: 'sa-east-1', // Insira sua região da AWS aqui
        credentials: {
            accessKeyId: '',
            secretAccessKey: ''
        }
      });
      const params = {
        stateMachineArn: 'arn:aws:states:sa-east-1:577163328740:stateMachine:MyHellow', 
        input: JSON.stringify({}), 
      };

      stepfunctions.startExecution(params, (err, data) => {
        if (err) {
          console.error('Erro ao iniciar a execução da máquina de estado:', err);
        } else {
          console.log('Máquina de estado iniciada com sucesso:', data);
          // Aqui você pode tratar a resposta, se necessário
        }
      });


  };


  useEffect(() => {
    async function fetchData() {
      await boasVindas();

    }
    fetchData();
  }, [mensagemBoasVindas]);

  return (
    <div>
      <h1>{mensagemBoasVindas}</h1>
      <input type="text" value={nota1} onChange={(e) => setNota1(e.target.value)} placeholder="Nota 1" />
      <input type="text" value={nota2} onChange={(e) => setNota2(e.target.value)} placeholder="Nota 2" />
      <button onClick={calcularMedia}>Calcular Média</button>
      {media && <p>{media}</p>}
    </div>
  );
};

export default MyComponent;
