/* =====================================================================
   CONFIGURAÇÃO DA LOJA · Resumos de Direito
   ---------------------------------------------------------------------
   Edite este arquivo para mudar os dados gerais, os contatos e as
   perguntas frequentes.

   As MATÉRIAS DE ESCREVENTE TJSP, com imagens e links de checkout da
   Eduzz, ficam em outro arquivo: config/escrevente.js

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

    // Artes exibidas no topo da página (ids de config/escrevente.js).
    // As duas primeiras aparecem como capas; a terceira, como folha em destaque.
    capasNoTopo: ["coletanea-lettering", "coletanea-classica", "portugues"],
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
      resposta: "Escolha uma matéria individual ou uma das coletâneas de Escrevente TJSP e clique em “Ver preço e comprar”. Você finaliza a compra no checkout da Eduzz.",
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
      pergunta: "Qual é a diferença entre as versões lettering e clássica?",
      resposta: "A versão lettering tem visual manuscrito e destaques coloridos; a versão clássica utiliza fontes tradicionais e apresentação sóbria. As matérias individuais estão em lettering, e as coletâneas reúnem as mesmas 12 matérias nas versões lettering e clássica, vendidas separadamente.",
    },
    {
      pergunta: "Posso conhecer o material antes de comprar?",
      resposta: "Consulte a apresentação de cada matéria e os detalhes disponíveis na página de compra da Eduzz.",
    },
    {
      pergunta: "Os materiais são atualizados?",
      resposta: "Cada material informa a sua edição ou a data da última atualização. Se tiver dúvidas sobre novas edições, fale conosco pelo e-mail carolestudadireito@gmail.com antes da compra.",
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
