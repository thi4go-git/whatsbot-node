const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { getMensagemGrupo } = require('./MensagemGrupos');
const { getMensagemPrivada } = require('./MensagemPrivada');


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
    const respostaMsgPrivada = getMensagemPrivada(userState,fromId);
    await client.sendMessage(fromId,respostaMsgPrivada);
    delete userState[fromId];   
    return;  
  }

});


client.initialize()
  .then(() => {
    console.log('SUCESSO');
  })
  .catch(err => {
    console.error('ERRO AO INICIALIZAR -> ', err);
  });
