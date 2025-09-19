import * as tts from '../src';
import Worker from './worker.ts?worker';
import { clearBlobs, listBlobs } from '../src/opfs';

Object.assign(window, { tts });

const worker = new Worker();

// 🧪 here u can add custom models name
const allModelIds = ['ru_RU-ruslan-medium', 'ru_RU-denis-medium', 'boopy'];

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
  <div><b>Транскрипция фонем (ID):</b> <span id="phonemes"></span></div>
  <div><b>Транскрипция фонем (IPA):</b> <span id="ipa"></span></div>
`;

const textInput = document.getElementById('text') as HTMLTextAreaElement;
const voiceSelect = document.getElementById('voice') as HTMLSelectElement;
const player = document.getElementById('player') as HTMLAudioElement;
const cacheList = document.getElementById('cache-list')!;
const missingList = document.getElementById('missing-list')!;
const predictBtn = document.getElementById('predict')!;
const clearBtn = document.getElementById('clear')!;

// ✅ Заполняем селектор жёстко
function populateVoiceSelector() {
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
    // Показываем транскрипцию фонем (ID)
    const phonemeDiv = document.getElementById('phonemes');
    if (phonemeDiv && 'phonemes' in event.data && Array.isArray(event.data.phonemes)) {
      phonemeDiv.textContent = event.data.phonemes.join(' ');
    }
    // Показываем транскрипцию фонем (IPA)
    const ipaDiv = document.getElementById('ipa');
    if (ipaDiv && 'ipa' in event.data && Array.isArray(event.data.ipa)) {
      ipaDiv.textContent = event.data.ipa.join(' ');
    }
  }
});

clearBtn.addEventListener('click', async () => {
  await clearBlobs();
  refreshCacheList();
});

async function refreshCacheList() {
  const keys = await listBlobs();
  const modelsFromCache = new Set<string>();

  for (const name of keys) {
    const match = name.match(/^(.*)\.onnx(?:\.json)?$/);
    if (match) modelsFromCache.add(match[1]);
  }

  cacheList.innerHTML = [...modelsFromCache].map(k => `<li>${k}</li>`).join('');

  const missing = allModelIds.filter(id => !modelsFromCache.has(id));
  missingList.innerHTML = missing.map(k => `<li>${k}</li>`).join('');
}

populateVoiceSelector();
await refreshCacheList();
