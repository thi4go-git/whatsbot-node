module.exports = { getMensagemGrupo };

const ID_GRUPO_PROJECAO = '120363173447115850@g.us';


function getMensagemGrupo(message){
    if (message.from == ID_GRUPO_PROJECAO){
      const msgRecebida = message.body.trim().toLowerCase();
      if(msgRecebida.toLowerCase() == 'help'){
        return getMsgGrupoProjecao();
      }      
    }
    return null;
}


function getMsgGrupoProjecao(){    
    return `*** HELP - Links úteis:
      - Backgrounds e imagens:
        https://www.pexels.com/pt-br/

      - Calculadora para projeção:
        https://www.projectorcentral.com/projection-calculator-pro.cfm

      - Download Propresenter Crack:
        https://mega.nz/file/RYNBFYBB#PImvtcfRHnUwTNyLNsFULlGhF-xcr895ivK_vVyGyWE

      - Download Resolume Crack:
        https://mega.nz/file/AV0iiLLC#8lkn3egUPh-l4VOuUXOwgtH06DFa3C_SARBK-T0Fsqoh55r

        
      - INFO: Calcular quantidade de Lumens -> 
        (Existe um programa que auxilia: BlendCalc 2.5)
        Faz a largura X a altura (para descobrir a área.
        Quando você descobrir a área, se a sua igreja tiver uma iluminação cênica bem controladinha, 
        você faz a área vezes uns 250 mais ou menos. 
        Se a sua igreja não tiver uma iluminação controlada, você faz vezes 400. 
        Aí vai dar o valor de lumens que ele precisa.
      `;
}




