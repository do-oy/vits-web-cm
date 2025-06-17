const u = "https://huggingface.co/diffusionstudio/piper-voices/resolve/main", B = "https://cdnjs.cloudflare.com/ajax/libs/onnxruntime-web/1.18.0/", x = "https://cdn.jsdelivr.net/npm/@diffusionstudio/piper-wasm@1.0.0/build/piper_phonemize", c = {
  "ar_JO-kareem-low": "ar/ar_JO/kareem/low/ar_JO-kareem-low.onnx",
  "ar_JO-kareem-medium": "ar/ar_JO/kareem/medium/ar_JO-kareem-medium.onnx",
  "ca_ES-upc_ona-medium": "ca/ca_ES/upc_ona/medium/ca_ES-upc_ona-medium.onnx",
  "ca_ES-upc_ona-x_low": "ca/ca_ES/upc_ona/x_low/ca_ES-upc_ona-x_low.onnx",
  "ca_ES-upc_pau-x_low": "ca/ca_ES/upc_pau/x_low/ca_ES-upc_pau-x_low.onnx",
  "cs_CZ-jirka-low": "cs/cs_CZ/jirka/low/cs_CZ-jirka-low.onnx",
  "cs_CZ-jirka-medium": "cs/cs_CZ/jirka/medium/cs_CZ-jirka-medium.onnx",
  "da_DK-talesyntese-medium": "da/da_DK/talesyntese/medium/da_DK-talesyntese-medium.onnx",
  "de_DE-eva_k-x_low": "de/de_DE/eva_k/x_low/de_DE-eva_k-x_low.onnx",
  "de_DE-karlsson-low": "de/de_DE/karlsson/low/de_DE-karlsson-low.onnx",
  "de_DE-kerstin-low": "de/de_DE/kerstin/low/de_DE-kerstin-low.onnx",
  "de_DE-mls-medium": "de/de_DE/mls/medium/de_DE-mls-medium.onnx",
  "de_DE-pavoque-low": "de/de_DE/pavoque/low/de_DE-pavoque-low.onnx",
  "de_DE-ramona-low": "de/de_DE/ramona/low/de_DE-ramona-low.onnx",
  "de_DE-thorsten-high": "de/de_DE/thorsten/high/de_DE-thorsten-high.onnx",
  "de_DE-thorsten-low": "de/de_DE/thorsten/low/de_DE-thorsten-low.onnx",
  "de_DE-thorsten-medium": "de/de_DE/thorsten/medium/de_DE-thorsten-medium.onnx",
  "de_DE-thorsten_emotional-medium": "de/de_DE/thorsten_emotional/medium/de_DE-thorsten_emotional-medium.onnx",
  "el_GR-rapunzelina-low": "el/el_GR/rapunzelina/low/el_GR-rapunzelina-low.onnx",
  "en_GB-alan-low": "en/en_GB/alan/low/en_GB-alan-low.onnx",
  "en_GB-alan-medium": "en/en_GB/alan/medium/en_GB-alan-medium.onnx",
  "en_GB-alba-medium": "en/en_GB/alba/medium/en_GB-alba-medium.onnx",
  "en_GB-aru-medium": "en/en_GB/aru/medium/en_GB-aru-medium.onnx",
  "en_GB-cori-high": "en/en_GB/cori/high/en_GB-cori-high.onnx",
  "en_GB-cori-medium": "en/en_GB/cori/medium/en_GB-cori-medium.onnx",
  "en_GB-jenny_dioco-medium": "en/en_GB/jenny_dioco/medium/en_GB-jenny_dioco-medium.onnx",
  "en_GB-northern_english_male-medium": "en/en_GB/northern_english_male/medium/en_GB-northern_english_male-medium.onnx",
  "en_GB-semaine-medium": "en/en_GB/semaine/medium/en_GB-semaine-medium.onnx",
  "en_GB-southern_english_female-low": "en/en_GB/southern_english_female/low/en_GB-southern_english_female-low.onnx",
  "en_GB-vctk-medium": "en/en_GB/vctk/medium/en_GB-vctk-medium.onnx",
  "en_US-amy-low": "en/en_US/amy/low/en_US-amy-low.onnx",
  "en_US-amy-medium": "en/en_US/amy/medium/en_US-amy-medium.onnx",
  "en_US-arctic-medium": "en/en_US/arctic/medium/en_US-arctic-medium.onnx",
  "en_US-danny-low": "en/en_US/danny/low/en_US-danny-low.onnx",
  "en_US-hfc_female-medium": "en/en_US/hfc_female/medium/en_US-hfc_female-medium.onnx",
  "en_US-hfc_male-medium": "en/en_US/hfc_male/medium/en_US-hfc_male-medium.onnx",
  "en_US-joe-medium": "en/en_US/joe/medium/en_US-joe-medium.onnx",
  "en_US-kathleen-low": "en/en_US/kathleen/low/en_US-kathleen-low.onnx",
  "en_US-kristin-medium": "en/en_US/kristin/medium/en_US-kristin-medium.onnx",
  "en_US-kusal-medium": "en/en_US/kusal/medium/en_US-kusal-medium.onnx",
  "en_US-l2arctic-medium": "en/en_US/l2arctic/medium/en_US-l2arctic-medium.onnx",
  "en_US-lessac-high": "en/en_US/lessac/high/en_US-lessac-high.onnx",
  "en_US-lessac-low": "en/en_US/lessac/low/en_US-lessac-low.onnx",
  "en_US-lessac-medium": "en/en_US/lessac/medium/en_US-lessac-medium.onnx",
  "en_US-libritts-high": "en/en_US/libritts/high/en_US-libritts-high.onnx",
  "en_US-libritts_r-medium": "en/en_US/libritts_r/medium/en_US-libritts_r-medium.onnx",
  "en_US-ljspeech-high": "en/en_US/ljspeech/high/en_US-ljspeech-high.onnx",
  "en_US-ljspeech-medium": "en/en_US/ljspeech/medium/en_US-ljspeech-medium.onnx",
  "en_US-ryan-high": "en/en_US/ryan/high/en_US-ryan-high.onnx",
  "en_US-ryan-low": "en/en_US/ryan/low/en_US-ryan-low.onnx",
  "en_US-ryan-medium": "en/en_US/ryan/medium/en_US-ryan-medium.onnx",
  "es_ES-carlfm-x_low": "es/es_ES/carlfm/x_low/es_ES-carlfm-x_low.onnx",
  "es_ES-davefx-medium": "es/es_ES/davefx/medium/es_ES-davefx-medium.onnx",
  "es_ES-mls_10246-low": "es/es_ES/mls_10246/low/es_ES-mls_10246-low.onnx",
  "es_ES-mls_9972-low": "es/es_ES/mls_9972/low/es_ES-mls_9972-low.onnx",
  "es_ES-sharvard-medium": "es/es_ES/sharvard/medium/es_ES-sharvard-medium.onnx",
  "es_MX-ald-medium": "es/es_MX/ald/medium/es_MX-ald-medium.onnx",
  "es_MX-claude-high": "es/es_MX/claude/high/es_MX-claude-high.onnx",
  "fa_IR-amir-medium": "fa/fa_IR/amir/medium/fa_IR-amir-medium.onnx",
  "fa_IR-gyro-medium": "fa/fa_IR/gyro/medium/fa_IR-gyro-medium.onnx",
  "fi_FI-harri-low": "fi/fi_FI/harri/low/fi_FI-harri-low.onnx",
  "fi_FI-harri-medium": "fi/fi_FI/harri/medium/fi_FI-harri-medium.onnx",
  "fr_FR-gilles-low": "fr/fr_FR/gilles/low/fr_FR-gilles-low.onnx",
  "fr_FR-mls-medium": "fr/fr_FR/mls/medium/fr_FR-mls-medium.onnx",
  "fr_FR-mls_1840-low": "fr/fr_FR/mls_1840/low/fr_FR-mls_1840-low.onnx",
  "fr_FR-siwis-low": "fr/fr_FR/siwis/low/fr_FR-siwis-low.onnx",
  "fr_FR-siwis-medium": "fr/fr_FR/siwis/medium/fr_FR-siwis-medium.onnx",
  "fr_FR-tom-medium": "fr/fr_FR/tom/medium/fr_FR-tom-medium.onnx",
  "fr_FR-upmc-medium": "fr/fr_FR/upmc/medium/fr_FR-upmc-medium.onnx",
  "hu_HU-anna-medium": "hu/hu_HU/anna/medium/hu_HU-anna-medium.onnx",
  "hu_HU-berta-medium": "hu/hu_HU/berta/medium/hu_HU-berta-medium.onnx",
  "hu_HU-imre-medium": "hu/hu_HU/imre/medium/hu_HU-imre-medium.onnx",
  "is_IS-bui-medium": "is/is_IS/bui/medium/is_IS-bui-medium.onnx",
  "is_IS-salka-medium": "is/is_IS/salka/medium/is_IS-salka-medium.onnx",
  "is_IS-steinn-medium": "is/is_IS/steinn/medium/is_IS-steinn-medium.onnx",
  "is_IS-ugla-medium": "is/is_IS/ugla/medium/is_IS-ugla-medium.onnx",
  "it_IT-riccardo-x_low": "it/it_IT/riccardo/x_low/it_IT-riccardo-x_low.onnx",
  "ka_GE-natia-medium": "ka/ka_GE/natia/medium/ka_GE-natia-medium.onnx",
  "kk_KZ-iseke-x_low": "kk/kk_KZ/iseke/x_low/kk_KZ-iseke-x_low.onnx",
  "kk_KZ-issai-high": "kk/kk_KZ/issai/high/kk_KZ-issai-high.onnx",
  "kk_KZ-raya-x_low": "kk/kk_KZ/raya/x_low/kk_KZ-raya-x_low.onnx",
  "lb_LU-marylux-medium": "lb/lb_LU/marylux/medium/lb_LU-marylux-medium.onnx",
  "ne_NP-google-medium": "ne/ne_NP/google/medium/ne_NP-google-medium.onnx",
  "ne_NP-google-x_low": "ne/ne_NP/google/x_low/ne_NP-google-x_low.onnx",
  "nl_BE-nathalie-medium": "nl/nl_BE/nathalie/medium/nl_BE-nathalie-medium.onnx",
  "nl_BE-nathalie-x_low": "nl/nl_BE/nathalie/x_low/nl_BE-nathalie-x_low.onnx",
  "nl_BE-rdh-medium": "nl/nl_BE/rdh/medium/nl_BE-rdh-medium.onnx",
  "nl_BE-rdh-x_low": "nl/nl_BE/rdh/x_low/nl_BE-rdh-x_low.onnx",
  "nl_NL-mls-medium": "nl/nl_NL/mls/medium/nl_NL-mls-medium.onnx",
  "nl_NL-mls_5809-low": "nl/nl_NL/mls_5809/low/nl_NL-mls_5809-low.onnx",
  "nl_NL-mls_7432-low": "nl/nl_NL/mls_7432/low/nl_NL-mls_7432-low.onnx",
  "no_NO-talesyntese-medium": "no/no_NO/talesyntese/medium/no_NO-talesyntese-medium.onnx",
  "pl_PL-darkman-medium": "pl/pl_PL/darkman/medium/pl_PL-darkman-medium.onnx",
  "pl_PL-gosia-medium": "pl/pl_PL/gosia/medium/pl_PL-gosia-medium.onnx",
  "pl_PL-mc_speech-medium": "pl/pl_PL/mc_speech/medium/pl_PL-mc_speech-medium.onnx",
  "pl_PL-mls_6892-low": "pl/pl_PL/mls_6892/low/pl_PL-mls_6892-low.onnx",
  "pt_BR-edresson-low": "pt/pt_BR/edresson/low/pt_BR-edresson-low.onnx",
  "pt_BR-faber-medium": "pt/pt_BR/faber/medium/pt_BR-faber-medium.onnx",
  "pt_PT-tugão-medium": "pt/pt_PT/tugão/medium/pt_PT-tugão-medium.onnx",
  "ro_RO-mihai-medium": "ro/ro_RO/mihai/medium/ro_RO-mihai-medium.onnx",
  "ru_RU-denis-medium": "ru/ru_RU/denis/medium/ru_RU-denis-medium.onnx",
  "ru_RU-dmitri-medium": "ru/ru_RU/dmitri/medium/ru_RU-dmitri-medium.onnx",
  "ru_RU-irina-medium": "ru/ru_RU/irina/medium/ru_RU-irina-medium.onnx",
  "ru_RU-ruslan-medium": "ru/ru_RU/ruslan/medium/ru_RU-ruslan-medium.onnx",
  "sk_SK-lili-medium": "sk/sk_SK/lili/medium/sk_SK-lili-medium.onnx",
  "sl_SI-artur-medium": "sl/sl_SI/artur/medium/sl_SI-artur-medium.onnx",
  "sr_RS-serbski_institut-medium": "sr/sr_RS/serbski_institut/medium/sr_RS-serbski_institut-medium.onnx",
  "sv_SE-nst-medium": "sv/sv_SE/nst/medium/sv_SE-nst-medium.onnx",
  "sw_CD-lanfrica-medium": "sw/sw_CD/lanfrica/medium/sw_CD-lanfrica-medium.onnx",
  "tr_TR-dfki-medium": "tr/tr_TR/dfki/medium/tr_TR-dfki-medium.onnx",
  "tr_TR-fahrettin-medium": "tr/tr_TR/fahrettin/medium/tr_TR-fahrettin-medium.onnx",
  "tr_TR-fettah-medium": "tr/tr_TR/fettah/medium/tr_TR-fettah-medium.onnx",
  "uk_UA-lada-x_low": "uk/uk_UA/lada/x_low/uk_UA-lada-x_low.onnx",
  "uk_UA-ukrainian_tts-medium": "uk/uk_UA/ukrainian_tts/medium/uk_UA-ukrainian_tts-medium.onnx",
  "vi_VN-25hours_single-low": "vi/vi_VN/25hours_single/low/vi_VN-25hours_single-low.onnx",
  "vi_VN-vais1000-medium": "vi/vi_VN/vais1000/medium/vi_VN-vais1000-medium.onnx",
  "vi_VN-vivos-x_low": "vi/vi_VN/vivos/x_low/vi_VN-vivos-x_low.onnx",
  "zh_CN-huayan-medium": "zh/zh_CN/huayan/medium/zh_CN-huayan-medium.onnx",
  "zh_CN-huayan-x_low": "zh/zh_CN/huayan/x_low/zh_CN-huayan-x_low.onnx"
};
async function g(e, i) {
  if (e.match("https://huggingface.co"))
    try {
      const m = await (await navigator.storage.getDirectory()).getDirectoryHandle("piper", {
        create: !0
      }), t = e.split("/").at(-1), a = await (await m.getFileHandle(t, { create: !0 })).createWritable();
      await a.write(i), await a.close();
    } catch (n) {
      console.error(n);
    }
}
async function b(e) {
  try {
    const n = await (await navigator.storage.getDirectory()).getDirectoryHandle("piper"), m = e.split("/").at(-1);
    await (await n.getFileHandle(m)).remove();
  } catch (i) {
    console.error(i);
  }
}
async function D(e) {
  if (e.match("https://huggingface.co"))
    try {
      const n = await (await navigator.storage.getDirectory()).getDirectoryHandle("piper", {
        create: !0
      }), m = e.split("/").at(-1);
      return await (await n.getFileHandle(m)).getFile();
    } catch {
      return;
    }
}
async function S(e, i) {
  var r;
  let n = await f(e);
  if (!n.ok && G(e)) {
    const _ = F(e);
    console.warn(`[vits-web] Fallback to: ${_}`), n = await f(_);
  }
  const m = (r = n.body) == null ? void 0 : r.getReader(), t = +(n.headers.get("Content-Length") ?? 0);
  let o = 0, a = [];
  for (; m; ) {
    const { done: _, value: d } = await m.read();
    if (_) break;
    a.push(d), o += d.length, i == null || i({
      url: e,
      total: t,
      loaded: o
    });
  }
  return new Blob(a, { type: n.headers.get("Content-Type") ?? void 0 });
}
async function f(e) {
  try {
    return await fetch(e);
  } catch {
    return console.warn(`[vits-web] Fetch failed: ${e}`), new Response(null, { status: 404 });
  }
}
function G(e) {
  return e.includes("huggingface.co");
}
function F(e) {
  const i = e.match(/models\/([^/]+)\/(model\.onnx(?:\.json)?)/);
  if (!i) return e;
  const [n, m, t] = i;
  return `/models/${m}.${t}`;
}
function I(e, i, n) {
  const m = e.length, t = 44, o = new DataView(new ArrayBuffer(m * i * 2 + t));
  o.setUint32(0, 1179011410, !0), o.setUint32(4, o.buffer.byteLength - 8, !0), o.setUint32(8, 1163280727, !0), o.setUint32(12, 544501094, !0), o.setUint32(16, 16, !0), o.setUint16(20, 1, !0), o.setUint16(22, i, !0), o.setUint32(24, n, !0), o.setUint32(28, i * 2 * n, !0), o.setUint16(32, i * 2, !0), o.setUint16(34, 16, !0), o.setUint32(36, 1635017060, !0), o.setUint32(40, 2 * m, !0);
  let a = t;
  for (let r = 0; r < m; r++) {
    const _ = e[r];
    _ >= 1 ? o.setInt16(a, 32767, !0) : _ <= -1 ? o.setInt16(a, -32768, !0) : o.setInt16(a, _ * 32768 | 0, !0), a += 2;
  }
  return o.buffer;
}
let h, s;
async function L(e, i) {
  h = h ?? await import("./piper-DeOu3H9E.js"), s = s ?? await import("onnxruntime-web");
  const n = c[e.voiceId], m = JSON.stringify([{ text: e.text.trim() }]);
  s.env.allowLocalModels = !1, s.env.wasm.numThreads = navigator.hardwareConcurrency, s.env.wasm.wasmPaths = B;
  const t = await p(`${u}/${n}.json`), o = JSON.parse(await t.text()), a = await new Promise(async (R) => {
    (await h.createPiperPhonemize({
      print: (l) => {
        R(JSON.parse(l).phoneme_ids);
      },
      printErr: (l) => {
        throw new Error(l);
      },
      locateFile: (l) => l.endsWith(".wasm") ? `${x}.wasm` : l.endsWith(".data") ? `${x}.data` : l
    })).callMain([
      "-l",
      o.espeak.voice,
      "--input",
      m,
      "--espeak_data",
      "/espeak-ng-data"
    ]);
  }), r = 0, _ = o.audio.sample_rate, d = o.inference.noise_scale, U = o.inference.length_scale, k = o.inference.noise_w, y = await p(`${u}/${n}`, i), E = await s.InferenceSession.create(await y.arrayBuffer()), w = {
    input: new s.Tensor("int64", a, [1, a.length]),
    input_lengths: new s.Tensor("int64", [a.length]),
    scales: new s.Tensor("float32", [d, U, k])
  };
  Object.keys(o.speaker_id_map).length && Object.assign(w, { sid: new s.Tensor("int64", [r]) });
  const {
    output: { data: v }
  } = await E.run(w);
  return new Blob([I(v, 1, _)], { type: "audio/x-wav" });
}
async function p(e, i) {
  let n = await D(e);
  return n || (n = await S(e, i), await g(e, n)), n;
}
async function j(e, i) {
  const n = c[e], m = [`${u}/${n}`, `${u}/${n}.json`];
  await Promise.all(
    m.map(async (t) => {
      g(t, await S(t, t.endsWith(".onnx") ? i : void 0));
    })
  );
}
async function P(e) {
  const i = c[e], n = [`${u}/${i}`, `${u}/${i}.json`];
  await Promise.all(n.map((m) => b(m)));
}
async function T() {
  const i = await (await navigator.storage.getDirectory()).getDirectoryHandle("piper", {
    create: !0
  }), n = [];
  for await (const m of i.keys()) {
    const t = m.split(".")[0];
    m.endsWith(".onnx") && t in c && n.push(t);
  }
  return n;
}
async function H() {
  try {
    await (await (await navigator.storage.getDirectory()).getDirectoryHandle("piper")).remove({ recursive: !0 });
  } catch (e) {
    console.error(e);
  }
}
async function O() {
  const e = await fetch(`${u}/voices.json`);
  if (!e.ok)
    throw new Error("Could not retrieve voices file from huggingface");
  return Object.values(await e.json());
}
export {
  u as HF_BASE,
  B as ONNX_BASE,
  c as PATH_MAP,
  x as WASM_BASE,
  j as download,
  H as flush,
  L as predict,
  P as remove,
  T as stored,
  O as voices
};
