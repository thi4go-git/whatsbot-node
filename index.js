const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

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
  console.log('Client is ready!');
});


// Mapeia o estado atual de cada usuário
const userState = {};


// Repondendo mensagens recebidas com o Boot
client.on('message', async message => {
  const from = message.from;

  // Ignorar mensagens de grupos
  if (from.endsWith('@g.us')) return;

  const msg = message.body.trim().toLowerCase();

  if (!userState[from]) {
    // Estado inicial: enviar menu principal
    userState[from] = 'menu_principal';
    await client.sendMessage(from, `Olá! Escolha uma opção:
      1 - Ver saldo
      2 - Falar com atendente
      3 - Sair`
    );
    return;
  }

  switch (userState[from]) {
    case 'menu_principal':
      if (msg === '1') {
        await client.sendMessage(from, 'Seu saldo atual é R$ 250,00.');
        delete userState[from]; // Reinicia o estado
      } else if (msg === '2') {
        await client.sendMessage(from, 'Aguarde, estamos transferindo para um atendente...');
        delete userState[from];
      } else if (msg === '3') {
        await client.sendMessage(from, 'Até logo!');
        delete userState[from];
      } else {
        await client.sendMessage(from, `Opção inválida. Digite:
          1 - Ver saldo
          2 - Falar com atendente
          3 - Sair`
        );
      }
      break;
    // Aqui você pode adicionar outros estados como submenus, etc.

    default:
      // Caso o estado seja desconhecido, reinicia
      delete userState[from];
      await client.sendMessage(from, 'Algo deu errado. Envie uma nova mensagem para começar novamente.');
  }

});


client.initialize()
  .then(() => {
    console.log('SUCESSO');
  })
  .catch(err => {
    console.error('ERRO AO INICIALIZAR -> ', err);
  });
