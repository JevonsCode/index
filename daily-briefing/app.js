const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const DATA_INDEX = './data/index.json';

function formatDate(dateText) {
  try {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric', month: 'long', day: 'numeric', weekday: 'short'
    }).format(new Date(`${dateText}T00:00:00+09:00`));
  } catch {
    return dateText;
  }
}

function renderSources(sources = []) {
  const valid = sources.filter(s => s && (s.title || s.url));
  if (!valid.length) return '';
  return `<div class="source-links">${valid.map((s, index) => {
    const label = s.title || `来源 ${index + 1}`;
    if (s.url) return `<a href="${s.url}" target="_blank" rel="noreferrer">${label}</a>`;
    return `<a>${label}</a>`;
  }).join('')}</div>`;
}

function renderBrief(brief, index) {
  const tpl = $('#briefTpl');
  const node = tpl.content.firstElementChild.cloneNode(true);
  node.id = `brief-${brief.date}`;
  $('.date', node).textContent = formatDate(brief.date);
  $('h3', node).textContent = brief.title || '中文每日简报';
  $('.summary', node).textContent = brief.summary || '';

  $('.topics', node).innerHTML = (brief.topics || []).map(topic => `<span class="topic">${topic}</span>`).join('');

  $('.items', node).innerHTML = (brief.items || []).map(item => `
    <section class="item">
      <div class="item-top">
        <h4>${item.title || '未命名重点'}</h4>
        ${item.category ? `<span class="category">${item.category}</span>` : ''}
      </div>
      <dl>
        <div class="item-row"><dt>发生了什么</dt><dd>${item.what_happened || ''}</dd></div>
        <div class="item-row"><dt>为什么重要</dt><dd>${item.why_it_matters || ''}</dd></div>
        <div class="item-row"><dt>对你意味着</dt><dd>${item.what_it_means_for_you || ''}</dd></div>
      </dl>
      ${renderSources(item.sources)}
    </section>
  `).join('');

  $('.signals', node).innerHTML = (brief.signals || []).map(signal => `
    <div class="signal">
      <strong>${signal.title || '关注信号'}</strong>
      <p>${signal.reason || ''}</p>
    </div>
  `).join('');

  if (index !== 0) $('.badge', node).remove();
  return node;
}

function renderNav(entries) {
  $('#briefNav').innerHTML = entries.map((entry, index) => `
    <a class="nav-item" href="#brief-${entry.date}">
      ${index === 0 ? '最新 · ' : ''}${entry.date}
    </a>
  `).join('');
}

async function loadBriefs() {
  const briefList = $('#briefList');
  briefList.innerHTML = '<div class="skeleton"></div><div class="skeleton short"></div>';

  try {
    const indexRes = await fetch(`${DATA_INDEX}?t=${Date.now()}`);
    if (!indexRes.ok) throw new Error(`index.json ${indexRes.status}`);
    const indexData = await indexRes.json();

    const entries = [...(indexData.briefs || [])].sort((a, b) => b.date.localeCompare(a.date));
    $('#updatedAt').textContent = indexData.updated_at ? `更新于 ${indexData.updated_at}` : '已加载';
    $('#briefCount').textContent = `${entries.length} 篇`;
    renderNav(entries);

    const briefs = await Promise.all(entries.map(async entry => {
      const res = await fetch(`${entry.path}?t=${Date.now()}`);
      if (!res.ok) throw new Error(`${entry.path} ${res.status}`);
      return res.json();
    }));

    briefList.innerHTML = '';
    briefs.forEach((brief, index) => briefList.appendChild(renderBrief(brief, index)));
  } catch (error) {
    briefList.innerHTML = `<div class="error">数据加载失败：${error.message}</div>`;
    $('#updatedAt').textContent = '加载失败';
  }
}

$('#refreshBtn').addEventListener('click', loadBriefs);
loadBriefs();
