/* =====================================================================
   Resumos de Direito · núcleo
   Lê os arquivos da pasta config/ e prepara os dados usados pela loja
   (js/loja.js) e pela página de conferência (js/verificar.js).
   Não é preciso editar este arquivo para mudar conteúdo.
   ===================================================================== */
(function () {
  'use strict';

  const config = window.LOJA_CONFIG || {};
  const links = window.LINKS_EDUZZ || {};

  const MOTIVOS = {
    ok: 'Ativo',
    vazio: 'Sem link cadastrado',
    invalido: 'Link inválido',
    'sem-https': 'O link precisa começar com https://',
    dominio: 'Domínio não permitido',
  };

  const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

  const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  const centavos = (valor) => Math.round((Number(valor) || 0) * 100) / 100;
  const formatarPreco = (valor) => moeda.format(centavos(valor));

  function esc(texto) {
    return String(texto == null ? '' : texto).replace(/[&<>"']/g, (c) => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
  }

  // "2026-10" → "outubro de 2026" · "2026-10-19" → "19/10/2026" · outro texto fica como está
  function formatarData(valor) {
    const texto = String(valor || '').trim();
    let m = texto.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (m) return `${m[3]}/${m[2]}/${m[1]}`;
    m = texto.match(/^(\d{4})-(\d{2})$/);
    if (m && +m[2] >= 1 && +m[2] <= 12) return `${MESES[+m[2] - 1]} de ${m[1]}`;
    return texto;
  }

  function dominiosPermitidos() {
    const lista = config.checkout && Array.isArray(config.checkout.dominiosPermitidos)
      ? config.checkout.dominiosPermitidos
      : ['eduzz.com'];
    return lista.map((d) => String(d).trim().toLowerCase().replace(/^\.+/, '')).filter(Boolean);
  }

  // Confere um link de checkout. Só libera https:// de um domínio permitido.
  function analisarCheckout(valor) {
    const texto = typeof valor === 'string' ? valor.trim() : '';
    if (!texto) return { ok: false, motivo: 'vazio', url: '' };
    let url;
    try { url = new URL(texto); } catch (erro) { return { ok: false, motivo: 'invalido', url: texto }; }
    if (url.protocol !== 'https:') return { ok: false, motivo: 'sem-https', url: texto };
    const host = url.hostname.toLowerCase();
    const permitido = dominiosPermitidos().some((d) => host === d || host.endsWith('.' + d));
    if (!permitido) return { ok: false, motivo: 'dominio', url: texto };
    return { ok: true, motivo: 'ok', url: url.href };
  }

  // Aceita caminhos do próprio site ("amostras/x.pdf") ou endereços http(s).
  function urlSegura(valor) {
    const texto = typeof valor === 'string' ? valor.trim() : '';
    if (!texto) return '';
    if (/^https?:\/\//i.test(texto)) return texto;
    if (/^[a-z][a-z0-9+.-]*:/i.test(texto) || texto.startsWith('//')) return '';
    return texto;
  }

  const ehArquivoDoSite = (url) => !!url && !/^https?:\/\//i.test(url);

  function linkWhatsapp(mensagem) {
    const loja = config.loja || {};
    const numero = String(loja.whatsapp || '').replace(/\D/g, '');
    if (numero.length < 12 || numero.length > 15) return '';
    const texto = mensagem || loja.mensagemWhatsapp || '';
    return 'https://wa.me/' + numero + (texto ? '?text=' + encodeURIComponent(texto) : '');
  }

  function linkDe(disciplinaId, chave, versaoId) {
    const doProduto = (links[disciplinaId] || {})[chave];
    if (versaoId == null) return typeof doProduto === 'string' ? doProduto : '';
    return doProduto && typeof doProduto === 'object' ? doProduto[versaoId] || '' : '';
  }

  // Junta o modelo de produtos com os dados e links de uma disciplina.
  function resolverDisciplina(d) {
    // Só vende o que estiver marcado exatamente como "disponivel".
    const emPreparacao = d.status !== 'disponivel';
    const modelos = config.produtos || {};
    const materiais = d.materiais || {};
    const versoesCfg = config.versoes || {};

    const precoDe = (chave, versaoId) => {
      const m = materiais[chave] || {};
      const base = modelos[chave] || {};
      if (m.precos && versaoId && m.precos[versaoId] != null) return centavos(m.precos[versaoId]);
      return centavos(m.preco != null ? m.preco : base.preco);
    };

    const produtos = Object.keys(modelos).map((chave) => {
      const base = modelos[chave] || {};
      const m = materiais[chave] || {};
      if (m.status === 'oculto') return null;
      const disponivel = !emPreparacao && (m.status == null || m.status === '' || m.status === 'disponivel');
      const status = disponivel ? 'disponivel' : 'em-preparacao';
      const inclui = Array.isArray(base.inclui) ? base.inclui.filter((c) => modelos[c]) : [];

      const idsVersoes = Array.isArray(m.versoes) ? m.versoes
        : (Array.isArray(base.versoes) && base.versoes.length ? base.versoes : [null]);

      const versoes = idsVersoes.map((vid) => {
        const cfg = vid ? versoesCfg[vid] || {} : {};
        const preco = precoDe(chave, vid);
        const precoSeparado = inclui.length ? centavos(inclui.reduce((soma, c) => soma + precoDe(c, vid), 0)) : 0;
        const checkout = analisarCheckout(linkDe(d.id, chave, vid));
        return {
          id: vid,
          nome: vid ? cfg.nome || vid : '',
          icone: cfg.icone || '',
          descricao: cfg.descricao || '',
          preco,
          precoSeparado,
          economia: inclui.length ? centavos(precoSeparado - preco) : 0,
          checkout,
          estado: !disponivel ? 'em-preparacao' : checkout.ok ? 'ativo' : 'em-breve',
        };
      });

      return {
        chave,
        nome: m.nome || base.nome || chave,
        descricao: m.descricao || base.descricao || '',
        icone: base.icone || 'resumo',
        destaque: !!base.destaque,
        selo: base.selo || '',
        inclui: inclui.map((c) => modelos[c].nome || c),
        edicao: m.edicao || '',
        atualizacao: m.atualizacao || '',
        status,
        versoes,
      };
    }).filter(Boolean);

    const precos = [];
    produtos.forEach((p) => p.versoes.forEach((v) => { if (v.preco > 0) precos.push(v.preco); }));

    return Object.assign({}, d, {
      emPreparacao,
      produtos,
      precoMinimo: precos.length ? Math.min.apply(null, precos) : 0,
      vendasAtivas: produtos.some((p) => p.versoes.some((v) => v.estado === 'ativo')),
      amostraUrl: urlSegura(d.amostra),
      capaUrl: urlSegura(d.capa),
      sumario: Array.isArray(d.sumario) ? d.sumario : [],
    });
  }

  function disciplinas() {
    return (Array.isArray(config.disciplinas) ? config.disciplinas : [])
      .filter((d) => d && d.id && d.nome && d.status !== 'oculto')
      .map(resolverDisciplina);
  }

  const ehPreviaLocal = () => location.protocol === 'file:'
    || ['localhost', '127.0.0.1', '[::1]', ''].includes(location.hostname);

  window.Loja = {
    config,
    links,
    MOTIVOS,
    esc,
    formatarPreco,
    formatarData,
    analisarCheckout,
    dominiosPermitidos,
    urlSegura,
    ehArquivoDoSite,
    linkWhatsapp,
    disciplinas,
    ehPreviaLocal,
  };
})();
