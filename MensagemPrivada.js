module.exports = { getMensagemPrivada };


function getMensagemPrivada(message,userState ,fromId){ 
  const msgRecebida = message?.body.trim().toLowerCase();

  if (!userState[fromId]) {
    // Estado inicial: enviar menu principal
    userState[fromId] = 'menu_principal';
    return  `Olá!  No momento não posso responder. Selecione uma opção:
      1 - Aguardar
      2 - Sair`;
  }

  switch (userState[fromId]) {
    case 'menu_principal':
      if (msgRecebida === '1') {
        return 'Só um instante...';     
      } else if (msgRecebida === '2') {
        return 'Até logo!';
      } else {
        return `Opção inválida. Digite:
          1 - Aguardar
          2 - Sair`;
      }
      break;
       // Aqui você pode adicionar outros estados como submenus, etc.

      default:
        return 'Algo deu errado. Envie uma nova mensagem para começar novamente.';
  }
}