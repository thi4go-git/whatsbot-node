const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { getMensagemGrupo } = require('./MensagemGrupos');
//const { getMensagemPrivada } = require('./MensagemPrivada');


const client = new Client({
  authStrategy: new LocalAuth(),//Reaproveita a autenticação feita pela 1ª vez (pasta criada na raíz)
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2413.51-beta.html"
  },
  puppeteer: {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ],
  },
});


//Gerar QRcode para autenticação inicial
client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});


//Menagem console log ao conectar.
client.on('ready', () => {
  console.log('BOT Client is ready!');
});


const MSG_PRIVADA = '@c.us';
const MSG_GRUPO = '@g.us';


// Mapeia o estado atual de cada usuário
const userState = {};


// Repondendo mensagens recebidas com o Boot PRIVADAS / GRUPOS
client.on('message', async message => {
  const fromId = message.from;

  if (fromId.endsWith(MSG_GRUPO)){     
    const respostaMsgGrupo = getMensagemGrupo(message);
    if(respostaMsgGrupo){
      await client.sendMessage(fromId,respostaMsgGrupo);
      delete userState[fromId];
    }    
    return;  
  } else if (fromId.endsWith(MSG_PRIVADA)){ 

    const from = message.from;
    const msg = message.body.trim().toLowerCase();

    if(msg == '1' && msg == '2'){
      return;  
    }

    // Caso ainda não tenha um estado, inicia com o menu
    if (!userState[from]) {
      userState[from] = 'menu_principal';
      await client.sendMessage(from, `Olá!  No momento não posso responder. Selecione uma opção:
        1 - Aguardar
        2 - Sair`);
      return;
    }

    // Lógica Menu
    switch (userState[from]) {
      case 'menu_principal':
        if (msg === '1') {
          await client.sendMessage(from, 'Só um momento...');
          delete userState[from];
        } else if (msg === '2') {
          await client.sendMessage(from, 'Até logo!');
          delete userState[from];
        } else {
          await client.sendMessage(from, `Opção inválida. Digite:
            1 - Aguardar
            2 - Sair`);
        }
        break;
  
      default:
        delete userState[from];
        await client.sendMessage(from, 'Algo deu errado. Envie uma nova mensagem para começar novamente.');
    }


  }

});




client.initialize()
  .then(() => {
    console.log('SUCESSO');
  })
  .catch(err => {
    console.error('ERRO AO INICIALIZAR -> ', err);
  });
