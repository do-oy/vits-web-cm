[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/diffusion-studio/ffmpeg-js/graphs/commit-activity)
[![TypeScript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://typescriptlang.org)

# VITS Web (Custom Models)

Run VITS/Piper-based text-to-speech models directly in the browser using [ONNX Runtime](https://onnxruntime.ai/).

## Features
- **Local models only** — all models are stored in the `models/` folder on your server, no Hugging Face required.
- **Automatic model discovery** — available models are listed in `models/models.json`.
- **Model caching in OPFS** — after the first load, models are cached in the browser.

## Model Structure

```
models/
  model_id_1/
    model_id_1.onnx
    model_id_1.onnx.json
  model_id_2/
    model_id_2.onnx
    model_id_2.onnx.json
  models.json
```

**models.json** — a list of available models:
```json
[
  {
    "id": "ru_RU-sidorovich",
    "name": "ru_RU-sidorovich",
    "language": "ru",
    "sample_rate": 22050
  },
  {
    "id": "ru_RU-oldray",
    "name": "ru_RU-oldray",
    "language": "ru",
    "sample_rate": 22050
  }
]
```

## Usage

Install the library:
```bash
npm i @diffusionstudio/vits-web
```

Import the library:
```typescript
import * as tts from '@diffusionstudio/vits-web';
```

Synthesize speech:
```typescript
const wav = await tts.predict({
  text: "Hello, world!",
  voiceId: 'ru_RU-sidorovich',
});

const audio = new Audio();
audio.src = URL.createObjectURL(wav);
audio.play();
```

### Preload a model
```typescript
await tts.download('ru_RU-sidorovich', (progress) => {
  console.log(`Downloading ${progress.url} - ${Math.round(progress.loaded * 100 / progress.total)}%`);
});
```

### Check cached models
```typescript
console.log(await tts.stored());
// e.g. ['ru_RU-sidorovich']
```

### Remove models from cache
```typescript
await tts.remove('ru_RU-sidorovich');
// or remove all
await tts.flush();
```

### Get available models
```typescript
console.log(await tts.voices());
// returns the array from models.json
```

---

**Happy coding!**
