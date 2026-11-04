/* =====================================================================
   CONFIGURAÇÃO DA LOJA · Resumos de Direito
   ---------------------------------------------------------------------
   Edite este arquivo para mudar os dados gerais, os contatos e as
   perguntas frequentes.

   As MATÉRIAS DE CADA CARGO, com imagens e links de checkout da Eduzz,
   ficam em outros arquivos: config/escrevente.js e config/oficial.js

   Regras simples para não quebrar nada:
   • Textos ficam sempre entre aspas: "assim".
   • Mantenha a vírgula no fim de cada linha/bloco.
   • Depois de salvar, abra verificar.html para conferir tudo.
   ===================================================================== */

window.LOJA_CONFIG = {

  /* ------------------------------------------------------------------
     1. DADOS GERAIS E CONTATOS
     ------------------------------------------------------------------ */
  loja: {
    nome: "Resumos de Direito",

    // WhatsApp: DDI 55 + DDD + número, só dígitos. Exemplo de formato: "5511912345678"
    whatsapp: "",
    mensagemWhatsapp: "Olá! Tenho uma dúvida sobre os materiais de Direito.",

    // Endereços completos dos perfis, por exemplo "https://www.instagram.com/seuperfil"
    instagram: "",
    tiktok: "https://www.tiktok.com/@carolballao",
    email: "carolestudadireito@gmail.com",

    // Artes exibidas no topo da página: ids de config/escrevente.js ou,
    // com o prefixo "oficial-", ids de config/oficial.js.
    // As duas primeiras aparecem como capas; a terceira, como folha em destaque.
    capasNoTopo: ["coletanea-lettering", "coletanea-classica", "oficial-material-completo"],
  },

  /* ------------------------------------------------------------------
     2. CHECKOUT
     Só links https:// destes domínios ativam o botão "Ver preço e comprar".
     Se a Eduzz entregar um link de outro domínio, acrescente-o aqui.
     ------------------------------------------------------------------ */
  checkout: {
    dominiosPermitidos: ["eduzz.com"],
    abrirEmNovaAba: false,
  },

  // Mostra uma faixa com pendências quando você abre o site no seu computador.
  // Ela nunca aparece no site publicado.
  mostrarAvisoDePrevia: true,

  /* ------------------------------------------------------------------
     3. PERGUNTAS FREQUENTES
     Para separar parágrafos dentro de uma resposta, use \n\n
     Revise as respostas antes de publicar: elas devem refletir
     exatamente o que está configurado na sua conta da Eduzz.
     ------------------------------------------------------------------ */
  faq: [
    {
      pergunta: "Como faço para comprar?",
      resposta: "Escolha o cargo, Escrevente ou Oficial de Justiça, selecione uma matéria individual ou a coleção completa e clique em “Ver preço e comprar”. Você finaliza a compra no checkout da Eduzz.",
    },
    {
      pergunta: "O pagamento é feito neste site?",
      resposta: "Não. Este site apresenta os materiais, e o pagamento é processado integralmente pela Eduzz. Este site não coleta nem armazena dados de cartão ou de pagamento.",
    },
    {
      pergunta: "Quais são as formas de pagamento?",
      resposta: "As formas de pagamento disponíveis aparecem no checkout da Eduzz, no momento da compra.",
    },
    {
      pergunta: "Como recebo o material depois da compra?",
      resposta: "Após a confirmação do pagamento, a Eduzz libera o acesso ao material conforme a forma de entrega do produto. As instruções de acesso são enviadas para o e-mail informado na compra.",
    },
    {
      pergunta: "Em que formato estão os materiais?",
      resposta: "Todos os materiais são digitais, em PDF. Não há envio de material impresso.",
    },
    {
      pergunta: "Consigo estudar pelo celular?",
      resposta: "Sim. Arquivos em PDF podem ser abertos no celular, no tablet ou no computador, em qualquer leitor de PDF.",
    },
    {
      pergunta: "O material de Oficial de Justiça é o mesmo de Escrevente?",
      resposta: "Não. Cada coleção segue o edital do próprio cargo. A de Oficial de Justiça traz Direito Civil, Legislação Especial e Prova Discursiva, e as demais matérias foram ajustadas ao edital do cargo. Confira a coleção do concurso que você vai prestar antes de comprar.",
    },
    {
      pergunta: "As coleções completas vêm em um só arquivo?",
      resposta: "No Escrevente, cada coletânea é um só PDF com as 12 matérias. No Oficial de Justiça, o Material Completo entrega os 12 cadernos em 12 arquivos PDF separados.",
    },
    {
      pergunta: "Qual é a diferença entre as versões lettering e clássica?",
      resposta: "A versão lettering tem visual manuscrito e destaques coloridos; a versão clássica utiliza fontes tradicionais e apresentação sóbria. As matérias individuais estão em lettering. A versão clássica existe só na coletânea de Escrevente, vendida separadamente da coletânea em lettering; os materiais de Oficial de Justiça são todos em lettering.",
    },
    {
      pergunta: "Posso conhecer o material antes de comprar?",
      resposta: "Consulte a apresentação de cada matéria e os detalhes disponíveis na página de compra da Eduzz.",
    },
    {
      pergunta: "Os materiais são atualizados?",
      resposta: "Cada material informa o edital em que se baseia. Se tiver dúvidas sobre novas edições, fale conosco pelo e-mail carolestudadireito@gmail.com antes da compra.",
    },
    {
      pergunta: "Não recebi o acesso. O que faço?",
      resposta: "Confira as pastas de spam e de promoções do e-mail informado na compra. Se não encontrar a mensagem, escreva para carolestudadireito@gmail.com, informando o e-mail utilizado na compra.",
    },
    {
      pergunta: "Os materiais têm vínculo com bancas ou tribunais?",
      resposta: "Não. Os materiais são independentes e não possuem vínculo oficial com o Tribunal de Justiça de São Paulo, bancas examinadoras ou qualquer outro órgão público.",
    },
  ],
};
