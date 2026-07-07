const $ = (selector, root = document) => root.querySelector(selector);

const DATA_INDEX = './data/index.json';

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function formatDate(dateText) {
  try {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric', month: 'long', day: 'numeric', weekday: 'short'
    }).format(new Date(`${dateText}T00:00:00+09:00`));
  } catch {
    return dateText;
  }
}

function getConfidenceMeta(item) {
  const confidence = item.confidence || item.source_confidence || '';
  if (!confidence) return '';
  const normalized = String(confidence).toLowerCase();
  const cls = normalized.includes('high') || confidence.includes('高') ? 'success' : 'warning';
  return `<span class="meta-pill ${cls}">可信度：${escapeHtml(confidence)}</span>`;
}

function renderSources(sources = []) {
  const valid = sources.filter(s => s && (s.title || s.url));
  if (!valid.length) {
    return '<div class="source-links"><span class="source-empty">未配置来源链接</span></div>';
  }

  return `<div class="source-links">${valid.map((s, index) => {
    const label = escapeHtml(s.title || `来源 ${index + 1}`);
    if (s.url) {
      return `<a href="${escapeHtml(s.url)}" target="_blank" rel="noreferrer">${label}</a>`;
    }
    return `<span>${label}</span>`;
  }).join('')}</div>`;
}

function renderBrief(brief, index) {
  const tpl = $('#briefTpl');
  const node = tpl.content.firstElementChild.cloneNode(true);
  node.id = `brief-${brief.date}`;
  $('.date', node).textContent = formatDate(brief.date);
  $('h3', node).textContent = brief.title || '中文每日简报';
  $('.summary', node).textContent = brief.summary || '';

  $('.topics', node).innerHTML = (brief.topics || [])
    .map(topic => `<span class="topic">${escapeHtml(topic)}</span>`)
    .join('');

  const items = brief.items || [];
  $('.items', node).innerHTML = items.length ? items.map((item, itemIndex) => {
    const sourceCount = Array.isArray(item.sources) ? item.sources.length : 0;
    return `
      <section class="item">
        <div class="item-top">
          <h4>${String(itemIndex + 1).padStart(2, '0')} · ${escapeHtml(item.title || '未命名重点')}</h4>
          ${item.category ? `<span class="category">${escapeHtml(item.category)}</span>` : ''}
        </div>
        <div class="meta-row">
          <span class="meta-pill">来源：${sourceCount}</span>
          ${getConfidenceMeta(item)}
          ${item.risk_level ? `<span class="meta-pill warning">风险：${escapeHtml(item.risk_level)}</span>` : ''}
        </div>
        <dl>
          <div class="item-row"><dt>发生了什么</dt><dd>${escapeHtml(item.what_happened || '')}</dd></div>
          <div class="item-row"><dt>为什么重要</dt><dd>${escapeHtml(item.why_it_matters || '')}</dd></div>
          <div class="item-row"><dt>对你意味着</dt><dd>${escapeHtml(item.what_it_means_for_you || '')}</dd></div>
        </dl>
        ${renderSources(item.sources)}
      </section>
    `;
  }).join('') : '<div class="empty-state">今天还没有简报条目。</div>';

  const signals = brief.signals || [];
  $('.signals', node).innerHTML = signals.length ? signals.map((signal, signalIndex) => `
    <div class="signal">
      <strong>${String(signalIndex + 1).padStart(2, '0')} · ${escapeHtml(signal.title || '关注信号')}</strong>
      <p>${escapeHtml(signal.reason || '')}</p>
    </div>
  `).join('') : '<div class="empty-state">暂无需要持续关注的信号。</div>';

  if (index !== 0) $('.badge', node)?.remove();
  return node;
}

function renderNav(entries) {
  $('#briefNav').innerHTML = entries.length ? entries.map((entry, index) => `
    <a class="nav-item" href="#brief-${escapeHtml(entry.date)}">
      ${index === 0 ? '最新 · ' : ''}${escapeHtml(entry.date)}
    </a>
  `).join('') : '<div class="empty-state">暂无历史简报。</div>';
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

    if (!entries.length) {
      briefList.innerHTML = '<div class="empty-state">还没有可展示的简报 JSON。</div>';
      return;
    }

    const briefs = await Promise.all(entries.map(async entry => {
      const res = await fetch(`${entry.path}?t=${Date.now()}`);
      if (!res.ok) throw new Error(`${entry.path} ${res.status}`);
      return res.json();
    }));

    briefList.innerHTML = '';
    briefs.forEach((brief, index) => briefList.appendChild(renderBrief(brief, index)));
  } catch (error) {
    briefList.innerHTML = `<div class="error">数据加载失败：${escapeHtml(error.message)}</div>`;
    $('#updatedAt').textContent = '加载失败';
  }
}

$('#refreshBtn').addEventListener('click', loadBriefs);
loadBriefs();
