#site
https://wwebjs.dev/guide/creating-your-bot/#replying-to-messages


#Execute npm i para instalar as dependências do projeto

#Dependências instaladas no projeto: 
    "puppeteer": "^22.12.1",
    "qrcode-terminal": "^0.12.0",
    "whatsapp-web.js": "^1.24.0"

#NODE V18+

#Possíveis erros:
- Após istalar as dependências do projeto com npm i, execute o comando npm start para rodar o projeto.
- Após a leitura do QRcode, caso dê o erro: TypeError: Cannot read properties of null (reading '1') no caminho:
node_modules\whatsapp-web.js\src\webCache\LocalWebCache.js:34:69, entre no arquivo e altere a expressão regular
que obtém a versão para a seguinte:  

   Antigo:    const version = indexHtml.match(/manifest-([\d\\.]+)\.json/)[1];
   Ajustado:  const version = indexHtml.match(/manifest-([\d\.]+).json/);


#Atualizações do CACHE poderão ser obtidas em:
https://github.com/wppconnect-team/wa-version/tree/main/html

Esse cache será usado em:

webVersionCache: {
  type: "remote",
  remotePath:
    "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2413.51-beta.html"
},