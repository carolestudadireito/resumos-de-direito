/* =====================================================================
   Resumos de Direito · página de conferência (verificar.html)
   Mostra, para cada matéria e coletânea de Escrevente TJSP, se o botão
   de compra está ativo, pendente ou com problema no link.
   ===================================================================== */
(function () {
  'use strict';

  const alvo = document.getElementById('verificacao');
  if (!alvo) return;
  const L = window.Loja;
  if (!L) {
    alvo.innerHTML = '<ul class="v-lista"><li class="erro">O arquivo js/nucleo.js não foi carregado.</li></ul>';
    return;
  }

  const { config, esc } = L;
  const problemas = []; // { nivel: 'erro' | 'aviso' | 'ok', texto }
  const anotar = (nivel, texto) => problemas.push({ nivel, texto });

  if (!window.LOJA_CONFIG) anotar('erro', 'O arquivo <code>config/loja.js</code> não pôde ser lido. Provável erro de digitação: confira aspas, vírgulas e chaves perto da última alteração.');
  if (!window.ESCREVENTE_CONFIG) anotar('erro', 'O arquivo <code>config/escrevente.js</code> não pôde ser lido. Provável erro de digitação: confira aspas, vírgulas e chaves perto da última alteração.');

  const materias = Array.isArray(window.ESCREVENTE_CONFIG) ? window.ESCREVENTE_CONFIG : [];

  /* ---------- Conferência da configuração ---------- */

  const ids = new Set();
  materias.forEach((m, i) => {
    if (!m || !m.id) { anotar('erro', `O item nº ${i + 1} de <code>config/escrevente.js</code> está sem <code>id</code>.`); return; }
    if (ids.has(m.id)) anotar('erro', `O id <code>${esc(m.id)}</code> aparece em mais de um item.`);
    ids.add(m.id);
    if (!/^[a-z0-9-]+$/.test(m.id)) anotar('aviso', `O id <code>${esc(m.id)}</code> deve ter só letras minúsculas sem acento, números e hífens.`);
    if (!m.imagem) anotar('aviso', `${esc(m.nome || m.id)}: sem imagem cadastrada.`);
  });

  const loja = config.loja || {};
  (Array.isArray(loja.capasNoTopo) ? loja.capasNoTopo : []).forEach((id) => {
    if (!ids.has(id)) anotar('aviso', `<code>capasNoTopo</code> cita <code>${esc(id)}</code>, que não existe em <code>config/escrevente.js</code>.`);
  });

  if (L.linkWhatsapp()) anotar('ok', 'WhatsApp configurado.');
  else anotar('aviso', 'WhatsApp não configurado (ou número incompleto). Os botões de atendimento ficam ocultos no site publicado. Use o formato 55 + DDD + número.');
  ['instagram', 'tiktok'].forEach((rede) => {
    if (!loja[rede]) anotar('aviso', `Endereço do ${rede === 'tiktok' ? 'TikTok' : 'Instagram'} não preenchido (o link fica oculto no rodapé).`);
  });

  /* ---------- Links de checkout ---------- */

  const usos = new Map();
  materias.forEach((m) => {
    const c = L.analisarCheckout(m.checkout);
    if (!c.url) return;
    const lista = usos.get(c.url) || [];
    lista.push(m.nome || m.id);
    usos.set(c.url, lista);
  });
  const repetidos = new Set();
  usos.forEach((lista, url) => {
    if (lista.length > 1) {
      repetidos.add(url);
      anotar('aviso', `O mesmo link foi usado em: ${lista.map(esc).join('; ')}. Confira se é intencional.`);
    }
  });

  let ativos = 0;
  let comErro = 0;
  const linhas = materias.map((m) => {
    const c = L.analisarCheckout(m.checkout);
    let classe;
    let texto;
    if (c.ok) {
      ativos += 1;
      [classe, texto] = repetidos.has(c.url) ? ['aviso', 'Ativo · link repetido'] : ['ok', 'Ativo'];
    } else if (c.motivo === 'vazio') {
      [classe, texto] = ['pendente', 'Em breve · sem link'];
    } else {
      comErro += 1;
      [classe, texto] = ['erro', L.MOTIVOS[c.motivo] || 'Link com problema'];
    }
    const link = c.url
      ? (c.ok ? `<a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.url)}</a>` : `<code>${esc(c.url)}</code>`)
      : '—';
    return `
      <tr>
        <td>${esc(m.nome || m.id)}</td>
        <td>${m.coletanea ? 'Coletânea' : 'Matéria'}</td>
        <td><span class="v-situacao ${classe}">${esc(texto)}</span></td>
        <td>${link}</td>
      </tr>`;
  });
  if (comErro) anotar('erro', `${comErro} link(s) com problema. Esses botões ficam bloqueados até a correção.`);

  /* ---------- Endereços para o Linktree ---------- */

  const base = new URL('./', location.href).href;
  const publicado = !L.ehPreviaLocal();
  const enderecos = [
    ['Conheça meus materiais', base],
    ['Escrevente TJSP', base + '#escrevente'],
    ['Coletâneas de Escrevente TJSP', base + '#coletaneas-titulo'],
  ].concat(materias.map((m) => [m.nome || m.id, base + '#escrevente-' + m.id]));
  const zap = L.linkWhatsapp();
  if (zap) enderecos.splice(3, 0, ['Dúvidas? Entre em contato', zap]);

  /* ---------- Montagem ---------- */

  const ordem = { erro: 0, aviso: 1, ok: 2 };
  problemas.sort((a, b) => ordem[a.nivel] - ordem[b.nivel]);

  alvo.innerHTML = `
    <div class="v-resumo">
      <div class="v-cartao"><strong>${ativos}<small style="font-size:.5em"> / ${materias.length}</small></strong><span>botões de compra ativos</span></div>
      <div class="v-cartao"><strong>${materias.length - ativos - comErro}</strong><span>itens sem checkout (em breve)</span></div>
      <div class="v-cartao"><strong>${comErro}</strong><span>links com problema</span></div>
      <div class="v-cartao"><strong>${materias.filter((m) => !m.coletanea).length}</strong><span>matérias individuais</span></div>
      <div class="v-cartao"><strong>${materias.filter((m) => m.coletanea).length}</strong><span>coletâneas</span></div>
    </div>

    <section class="v-bloco" aria-labelledby="v-avisos">
      <h2 id="v-avisos">Avisos</h2>
      <ul class="v-lista">${problemas.map((p) => `<li class="${p.nivel}">${p.texto}</li>`).join('') || '<li class="ok">Nenhum problema encontrado.</li>'}</ul>
      <p style="margin-top:1rem;color:var(--marrom-3);font-size:.9rem">Domínios aceitos para checkout: ${L.dominiosPermitidos().map((d) => `<code>${esc(d)}</code>`).join(', ')}.</p>
    </section>

    <section class="v-bloco" aria-labelledby="v-produtos">
      <h2 id="v-produtos">Escrevente TJSP · produtos e links</h2>
      <div class="v-tabela-caixa v-bloco">
        <table class="v-tabela">
          <caption>Matérias e coletâneas</caption>
          <thead><tr><th scope="col">Produto</th><th scope="col">Tipo</th><th scope="col">Situação</th><th scope="col">Link de checkout</th></tr></thead>
          <tbody>${linhas.join('')}</tbody>
        </table>
      </div>
    </section>

    <section class="v-bloco" aria-labelledby="v-linktree">
      <h2 id="v-linktree">Endereços para o Linktree</h2>
      ${publicado ? '' : '<p style="color:var(--marrom-3)">Você está vendo a cópia do seu computador. Depois de publicar, abra esta página pelo endereço do site para ver os links definitivos.</p>'}
      <ul class="v-lista">
        ${enderecos.map(([rotulo, url]) => `
          <li><div><strong>${esc(rotulo)}</strong></div>
            <div class="v-copiar"><code>${esc(url)}</code><button type="button" data-copiar="${esc(url)}">Copiar</button></div></li>`).join('')}
      </ul>
    </section>`;

  alvo.addEventListener('click', (e) => {
    const botao = e.target.closest('[data-copiar]');
    if (!botao || !navigator.clipboard) return;
    navigator.clipboard.writeText(botao.dataset.copiar).then(() => {
      botao.textContent = 'Copiado';
      setTimeout(() => { botao.textContent = 'Copiar'; }, 1600);
    }).catch(() => {});
  });
})();
