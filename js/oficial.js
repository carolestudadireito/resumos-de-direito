(function () {
  'use strict';
  const L = window.Loja;
  const lista = document.getElementById('lista-oficial');
  const completo = document.getElementById('lista-oficial-completo');
  const menu = document.getElementById('menu-oficial');
  if (!L || !lista || !menu) return;
  const materias = Array.isArray(window.OFICIAL_CONFIG) ? window.OFICIAL_CONFIG : [];
  const { esc } = L;
  menu.innerHTML = materias.map((m) => `<a href="#oficial-${esc(m.id)}">${esc(m.menu || m.nome)}</a>`).join('');
  function card(m) {
    const checkout = L.analisarCheckout(m.checkout);
    const heading = m.coletanea ? 'h4' : 'h3';
    return `<li><article class="escrevente-card" id="oficial-${esc(m.id)}">
      <div class="escrevente-card__imagem"><img src="${esc(L.urlSegura(m.imagem))}" alt="Arte do material de ${esc(m.nome)} para Oficial de Justiça TJSP" width="720" height="900" loading="lazy" decoding="async"></div>
      <div class="escrevente-card__info"><p class="escrevente-card__tipo">${esc(m.tipo || 'Oficial de Justiça TJSP · PDF em lettering')}</p>
      <${heading}>${esc(m.nome)}</${heading}><p>${esc(m.descricao)}</p>
      ${checkout.ok ? `<a class="botao botao--primario botao--largo" href="${esc(checkout.url)}">Ver preço e comprar <svg class="ico" aria-hidden="true"><use href="#i-seta"></use></svg><span class="sr-only">: ${esc(m.nome)} para Oficial de Justiça TJSP</span></a>` : '<span class="etiqueta etiqueta--breve">Em breve</span>'}
      </div></article></li>`;
  }
  lista.innerHTML = materias.filter((m) => !m.coletanea).map(card).join('');
  if (completo) completo.innerHTML = materias.filter((m) => m.coletanea).map(card).join('');
})();
