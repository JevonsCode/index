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
  localStorage.setItem(
    storageKey(state.currentLesson.date),
    JSON.stringify([...state.remembered]),
  );
}

function renderMeta() {
  const lesson = state.currentLesson;
  $('#todayLabel').textContent = lesson ? lesson.title : 'No lesson';
  $('#progressLabel').textContent = `${state.remembered.size} / ${lesson?.words?.length || 0}`;
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

function renderWords() {
  const grid = $('#wordGrid');
  const template = $('#wordCardTemplate');
  grid.innerHTML = '';

  state.currentLesson.words.forEach((item) => {
    const card = template.content.firstElementChild.cloneNode(true);
    card.dataset.word = item.word;
    card.querySelector('.word').textContent = item.word;
    card.querySelector('.phonetic').textContent = item.phonetic;
    card.querySelector('.tag').textContent = item.category;
    card.querySelector('.meaning').textContent = item.meaning;
    card.querySelector('.phrase').textContent = `短语：${item.phrase}`;
    card.querySelector('.sentence').textContent = `例句：${item.sentence}`;

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
  renderWords();
  renderFocus();
}

async function init() {
  const index = await fetchJson('./data/index.json');
  state.lessons = index.lessons;

  const select = $('#lessonSelect');
  select.innerHTML = state.lessons
    .map((item) => `<option value="${item.date}">${item.title}</option>`)
    .join('');

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
