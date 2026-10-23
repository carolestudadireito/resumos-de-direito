/* =====================================================================
   Resumos de Direito · montagem da vitrine
   Monta as capas do topo, as perguntas frequentes, os contatos e o menu
   a partir de config/loja.js e config/escrevente.js.
   Os cartões de Escrevente TJSP são montados por js/escrevente.js.
   Para mudar conteúdo, edite os arquivos da pasta config/.
   ===================================================================== */
(function () {
  'use strict';

  const L = window.Loja;
  if (!L) return;

  const { config, esc } = L;
  const loja = config.loja || {};
  const $ = (seletor, raiz = document) => raiz.querySelector(seletor);
  const $$ = (seletor, raiz = document) => Array.from(raiz.querySelectorAll(seletor));
  const materias = Array.isArray(window.ESCREVENTE_CONFIG) ? window.ESCREVENTE_CONFIG : [];
  const porId = new Map(materias.map((m) => [m.id, m]));

  function ico(nome, classe) {
    const id = nome && document.getElementById('i-' + nome) ? nome : 'balanca';
    return `<svg class="ico${classe ? ' ' + classe : ''}" aria-hidden="true" focusable="false"><use href="#i-${id}"></use></svg>`;
  }

  /* ---------- Topo: capas em leque ---------- */

  function montarCapasDoTopo() {
    const alvo = $('#hero-capas');
    if (!alvo) return;
    const ids = Array.isArray(loja.capasNoTopo) && loja.capasNoTopo.length
      ? loja.capasNoTopo
      : materias.slice(0, 3).map((m) => m.id);
    const selecionadas = ids.map((id) => porId.get(id)).filter((m) => m && m.imagem).slice(0, 3);
    const capas = selecionadas.slice(0, 2).map((m) => `
      <div class="capa capa--imagem capa--arte" aria-hidden="true"><img src="${esc(L.urlSegura(m.imagem))}" alt="" width="720" height="900" decoding="async"></div>`).join('');
    const folha = selecionadas[2]
      ? `<div class="hero__folha"><img src="${esc(L.urlSegura(selecionadas[2].imagem))}" alt="" width="720" height="900" fetchpriority="high"></div>`
      : '';
    alvo.innerHTML = capas + folha;
  }

  /* ---------- Perguntas frequentes ---------- */

  function montarFaq() {
    const alvo = $('#lista-faq');
    if (!alvo) return;
    const faq = Array.isArray(config.faq) ? config.faq.filter((f) => f && f.pergunta) : [];
    alvo.innerHTML = faq.map((f) => `
      <details class="faq__item">
        <summary><span>${esc(f.pergunta)}</span>${ico('chevron')}</summary>
        <div class="faq__resposta">${String(f.resposta || '').split(/\n{2,}/).map((t) => `<p>${esc(t.trim())}</p>`).join('')}</div>
      </details>`).join('');
  }

  /* ---------- Contatos ---------- */

  function mostrar(el, visivel) {
    el.hidden = !visivel;
    const grupo = el.closest('[data-contato]');
    if (grupo) grupo.hidden = !visivel;
  }

  function montarContatos() {
    const previa = L.ehPreviaLocal();
    $$('[data-whatsapp]').forEach((el) => {
      const link = L.linkWhatsapp(el.dataset.whatsappMsg);
      if (link) {
        el.href = link;
        el.target = '_blank';
        el.rel = 'noopener';
        mostrar(el, true);
      } else if (previa) {
        // Só no seu computador: mostra o botão para você ver o visual.
        el.href = 'verificar.html';
        el.title = 'Número de WhatsApp ainda não configurado (config/loja.js)';
        mostrar(el, true);
      } else {
        mostrar(el, false);
      }
    });

    ['instagram', 'tiktok'].forEach((rede) => {
      const url = L.urlSegura(loja[rede]);
      $$(`[data-social="${rede}"]`).forEach((el) => {
        const ok = /^https?:\/\//i.test(url);
        if (ok) { el.href = url; el.target = '_blank'; el.rel = 'noopener'; }
        mostrar(el, ok);
      });
    });

    const email = String(loja.email || '').trim();
    $$('[data-email]').forEach((el) => {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (ok) el.href = 'mailto:' + email;
      mostrar(el, ok);
    });
  }

  /* ---------- Menu do celular ---------- */

  function montarMenu() {
    const botao = $('.menu-botao');
    const menu = $('#menu-principal');
    if (!botao || !menu) return;
    const rotulo = $('span', botao);
    const definir = (aberto) => {
      botao.setAttribute('aria-expanded', String(aberto));
      menu.classList.toggle('is-aberto', aberto);
      if (rotulo) rotulo.textContent = aberto ? 'Fechar' : 'Menu';
    };
    botao.addEventListener('click', () => definir(botao.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) definir(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-aberto')) { definir(false); botao.focus(); }
    });
    const largo = window.matchMedia('(min-width: 860px)');
    const aoMudar = () => { if (largo.matches) definir(false); };
    if (largo.addEventListener) largo.addEventListener('change', aoMudar);
  }

  /* ---------- Faixa de pendências (só no seu computador) ---------- */

  function montarAvisoDePrevia() {
    const aviso = $('#aviso-previa');
    if (!aviso || !L.ehPreviaLocal() || config.mostrarAvisoDePrevia === false) return;
    const itens = [];
    if (!window.LOJA_CONFIG) itens.push('<strong>Erro ao ler config/loja.js</strong> (confira aspas e vírgulas)');
    if (!window.ESCREVENTE_CONFIG) itens.push('<strong>Erro ao ler config/escrevente.js</strong> (confira aspas e vírgulas)');
    const ativos = materias.filter((m) => L.analisarCheckout(m.checkout).ok).length;
    itens.push(`${ativos} de ${materias.length} botões de compra ativos`);
    if (!L.linkWhatsapp()) itens.push('WhatsApp não configurado');
    aviso.innerHTML = `<strong>Pré-visualização local</strong> (esta faixa não aparece no site publicado) · ${itens.join(' · ')} · <a href="verificar.html">Abrir verificação</a>`;
    aviso.hidden = false;
  }

  /* ---------- Início ---------- */

  montarCapasDoTopo();
  montarFaq();
  montarContatos();
  montarMenu();
  montarAvisoDePrevia();
  $$('[data-ano]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });
})();
