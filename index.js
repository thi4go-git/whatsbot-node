const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
  authStrategy: new LocalAuth(),//Reaproveita a autenticação feita pela 1ª vez (pasta criada na raíz)
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
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

client.on('ready', () => {
  console.log('Client is ready!');
});


client.on('message_create', message => {
  if (message.body === 'oi') {
    client.sendMessage(message.from, 'Sai esplanando...');
  }
});


client.initialize()
  .then(() => {
    console.log('SUCESSO');
  })
  .catch(err => {
    console.error('ERRO AO INICIALIZAR -> ', err);
  });
