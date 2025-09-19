import * as tts from '../src/index';

async function main(event: MessageEvent<tts.InferenceConfig & { type: 'init' }>) {
  if (event.data?.type != 'init') return;

  const start = performance.now();
  const result = await tts.predict({
    text: event.data.text,
    voiceId: event.data.voiceId,
  });
  console.log('Time taken:', performance.now() - start + ' ms');

  self.postMessage({ 
    type: 'result', 
    audio: result.audio, // Используем поле audio
    phonemes: result.phonemes, // Передаем фонемы
    ipa: result.ipa // Передаем IPA транскрипцию
  });
}

self.addEventListener('message', main);
