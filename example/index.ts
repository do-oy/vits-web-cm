import * as tts from '../src';
import Worker from './worker.ts?worker';
import { flush, stored } from '../src/storage';

// required for e2e
Object.assign(window, { tts });

const worker = new Worker();

// Получаем список моделей динамически
let allModelIds: string[] = [];

async function fetchModelIds() {
  const res = await fetch('/models/models.json');
  if (!res.ok) return [];
  const models = await res.json();
  return models.map((m: any) => m.id);
}

document.querySelector('#app')!.innerHTML = `
  <h2>🧪 TTS Demo</h2>
  <textarea id="text" rows="4" cols="60">Привет, мир!</textarea><br>
  <select id="voice"></select>
  <button id="predict">🔊 Озвучить</button>
  <button id="clear">🧹 Очистить модели</button>
  <p><b>Загруженные модели (OPFS):</b></p>
  <ul id="cache-list"></ul>
  <p><b>Не загруженные:</b></p>
  <ul id="missing-list"></ul>
  <hr>
  <audio id="player" controls></audio>
`;

const textInput = document.getElementById('text') as HTMLTextAreaElement;
const voiceSelect = document.getElementById('voice') as HTMLSelectElement;
const player = document.getElementById('player') as HTMLAudioElement;
const cacheList = document.getElementById('cache-list')!;
const missingList = document.getElementById('missing-list')!;
const predictBtn = document.getElementById('predict')!;
const clearBtn = document.getElementById('clear')!;

// ✅ Заполняем селектор динамически
async function populateVoiceSelector() {
  allModelIds = await fetchModelIds();
  voiceSelect.innerHTML = allModelIds.map(id => `<option value="${id}">${id}</option>`).join('');
}

predictBtn.addEventListener('click', () => {
  const text = textInput.value.trim();
  const voiceId = voiceSelect.value;
  if (!text || !voiceId) return;

  worker.postMessage({
    type: 'init',
    text,
    voiceId,
  });
});

worker.addEventListener('message', (event: MessageEvent<{ type: string, audio?: Blob }>) => {
  if (event.data.type === 'result' && event.data.audio) {
    const url = URL.createObjectURL(event.data.audio);
    player.src = url;
    player.play();
    refreshCacheList();
  }
});

clearBtn.addEventListener('click', async () => {
  await flush();
  refreshCacheList();
});

async function refreshCacheList() {
  const modelsFromCache = new Set<string>(await stored());
  cacheList.innerHTML = [...modelsFromCache].map(k => `<li>${k}</li>`).join('');
  const missing = allModelIds.filter(id => !modelsFromCache.has(id));
  missingList.innerHTML = missing.map(k => `<li>${k}</li>`).join('');
}

await populateVoiceSelector();
await refreshCacheList();
