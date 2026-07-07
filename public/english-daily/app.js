const state = {
  lessons: [],
  currentLesson: null,
  remembered: new Set(),
};

const $ = (selector) => document.querySelector(selector);

async function fetchJson(path) {
  const response = await fetch(path, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }
  return response.json();
}

function formatDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  });
}

function storageKey(date) {
  return `english-daily:${date}:remembered`;
}

function loadRemembered(date) {
  try {
    const raw = localStorage.getItem(storageKey(date));
    return new Set(raw ? JSON.parse(raw) : []);
  } catch (_) {
    return new Set();
  }
}

function saveRemembered() {
  if (!state.currentLesson) return;
  localStorage.setItem(storageKey(state.currentLesson.date), JSON.stringify([...state.remembered]));
}

function renderMeta() {
  const lesson = state.currentLesson;
  const total = lesson?.words?.length || 0;
  const count = state.remembered.size;
  const percent = total ? Math.round((count / total) * 100) : 0;

  $('#todayLabel').textContent = lesson ? formatDate(lesson.date) : 'No lesson';
  $('#progressLabel').textContent = `${count} / ${total}`;

  const bar = $('#progressBar');
  if (bar) bar.style.width = `${percent}%`;

  const tip = $('#progressTip');
  if (tip) tip.textContent = percent >= 100 ? '今日完成' : percent >= 60 ? '继续巩固' : '开始今天的学习';
}

function renderQuiz() {
  const list = $('#quizList');
  list.innerHTML = '';
  const quiz = state.currentLesson?.reviewQuiz || [];

  if (!quiz.length) {
    list.innerHTML = '<p class="muted">今天还没有复习题。</p>';
    return;
  }

  quiz.forEach((item, index) => {
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'quiz-item';
    row.innerHTML = `<span>${index + 1}. ${item.zh} → ______</span><code>${item.answer}</code>`;
    row.addEventListener('click', () => row.classList.toggle('revealed'));
    list.appendChild(row);
  });
}

function renderCategoryTabs() {
  const container = $('#categoryTabs');
  if (!container) return;
  const categories = ['全部', ...new Set(state.currentLesson.words.map((item) => item.category))];
  container.innerHTML = categories.map((category) => `<button type="button">${category}</button>`).join('');
  [...container.querySelectorAll('button')].forEach((button, index) => {
    if (index === 0) button.classList.add('active');
    button.addEventListener('click', () => {
      [...container.querySelectorAll('button')].forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      renderWords(button.textContent);
    });
  });
}

function renderWords(category = '全部') {
  const grid = $('#wordGrid');
  const template = $('#wordCardTemplate');
  grid.innerHTML = '';

  state.currentLesson.words
    .filter((item) => category === '全部' || item.category === category)
    .forEach((item) => {
      const card = template.content.firstElementChild.cloneNode(true);
      card.dataset.word = item.word;
      card.dataset.category = item.category;
      card.querySelector('.word').textContent = item.word;
      card.querySelector('.phonetic').textContent = item.phonetic;
      card.querySelector('.tag').textContent = item.category;
      card.querySelector('.meaning').textContent = item.meaning;
      card.querySelector('.phrase').textContent = `短语：${item.phrase}`;
      card.querySelector('.sentence').textContent = `例句：${item.sentence}`;

      const copyButton = card.querySelector('.copy-button');
      if (copyButton) copyButton.addEventListener('click', () => copyButton.textContent = '已展开例句');

      const button = card.querySelector('.remember-button');
      const sync = () => {
        const remembered = state.remembered.has(item.word);
        card.classList.toggle('remembered', remembered);
        button.textContent = remembered ? '已记住' : '标记已记住';
      };

      button.addEventListener('click', () => {
        if (state.remembered.has(item.word)) {
          state.remembered.delete(item.word);
        } else {
          state.remembered.add(item.word);
        }
        saveRemembered();
        sync();
        renderMeta();
      });

      sync();
      grid.appendChild(card);
    });
}

function renderFocus() {
  const list = $('#focusList');
  list.innerHTML = '';
  state.currentLesson.focus.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });
}

async function loadLesson(date) {
  const meta = state.lessons.find((item) => item.date === date) || state.lessons[0];
  state.currentLesson = await fetchJson(meta.path);
  state.remembered = loadRemembered(state.currentLesson.date);
  renderMeta();
  renderQuiz();
  renderCategoryTabs();
  renderWords();
  renderFocus();
}

async function init() {
  const index = await fetchJson('./data/index.json');
  state.lessons = index.lessons;

  const select = $('#lessonSelect');
  select.innerHTML = state.lessons.map((item) => `<option value="${item.date}">${formatDate(item.date)}</option>`).join('');
  select.addEventListener('change', () => loadLesson(select.value));

  $('#resetProgress').addEventListener('click', () => {
    state.remembered.clear();
    saveRemembered();
    renderMeta();
    renderWords();
  });

  await loadLesson(index.latest);
  select.value = state.currentLesson.date;
}

init().catch((error) => {
  document.body.innerHTML = `<main class="app-shell"><section class="panel"><h1>加载失败</h1><p>${error.message}</p></section></main>`;
});
