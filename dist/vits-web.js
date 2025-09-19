const W = "https://cdnjs.cloudflare.com/ajax/libs/onnxruntime-web/1.18.0/", x = "https://cdn.jsdelivr.net/npm/@diffusionstudio/piper-wasm@1.0.0/build/piper_phonemize";
async function j(t, e) {
  try {
    const o = await (await navigator.storage.getDirectory()).getDirectoryHandle("tts^", { create: !0 }), a = t.split("/").pop(), r = await (await o.getFileHandle(a, { create: !0 })).createWritable();
    await r.write(e), await r.close();
  } catch (n) {
    console.error("[OPFS] Write error:", n);
  }
}
async function T(t) {
  try {
    return await (await (await (await navigator.storage.getDirectory()).getDirectoryHandle("tts^", { create: !0 })).getFileHandle(t)).getFile();
  } catch {
    return;
  }
}
async function H(t) {
  try {
    await (await (await navigator.storage.getDirectory()).getDirectoryHandle("tts^")).removeEntry(t);
  } catch (e) {
    console.error("[OPFS] Remove error:", e);
  }
}
async function L() {
  const e = await (await navigator.storage.getDirectory()).getDirectoryHandle("tts^", { create: !0 }), n = [];
  for await (const o of e.keys())
    n.push(o);
  return n;
}
async function P(t, e) {
  var c;
  const n = await fetch(t), o = (c = n.body) == null ? void 0 : c.getReader(), a = +(n.headers.get("Content-Length") ?? 0);
  let s = 0, r = [];
  for (; o; ) {
    const { done: d, value: f } = await o.read();
    if (d)
      break;
    r.push(f), s += f.length, e == null || e({
      url: t,
      total: a,
      loaded: s
    });
  }
  return new Blob(r, { type: n.headers.get("Content-Type") ?? void 0 });
}
function N(t, e, n) {
  const o = t.length, a = 44, s = new DataView(new ArrayBuffer(o * e * 2 + a));
  s.setUint32(0, 1179011410, !0), s.setUint32(4, s.buffer.byteLength - 8, !0), s.setUint32(8, 1163280727, !0), s.setUint32(12, 544501094, !0), s.setUint32(16, 16, !0), s.setUint16(20, 1, !0), s.setUint16(22, e, !0), s.setUint32(24, n, !0), s.setUint32(28, e * 2 * n, !0), s.setUint16(32, e * 2, !0), s.setUint16(34, 16, !0), s.setUint32(36, 1635017060, !0), s.setUint32(40, 2 * o, !0);
  let r = a;
  for (let c = 0; c < o; c++) {
    const d = t[c];
    d >= 1 ? s.setInt16(r, 32767, !0) : d <= -1 ? s.setInt16(r, -32768, !0) : s.setInt16(r, d * 32768 | 0, !0), r += 2;
  }
  return s.buffer;
}
let m, i, p = null;
async function E() {
  return p || (p = await (await fetch("/models/models.json")).json()), p;
}
async function v(t, e) {
  if (!(await E()).find((a) => a.id === t)) throw new Error(`Model ${t} not found in models.json`);
  return `/models/${t}/${t}${e}`;
}
async function M(t, e) {
  m = m ?? await import("./piper-DeOu3H9E.js"), i = i ?? await import("onnxruntime-web");
  const n = t.voiceId, o = await v(n, ".onnx.json"), a = await v(n, ".onnx"), s = await b(o, e), r = JSON.parse(await s.text());
  let c = [], d = t.text;
  const f = JSON.stringify([{ text: d.trim() }]);
  i.env.allowLocalModels = !0, i.env.wasm.numThreads = navigator.hardwareConcurrency, i.env.wasm.wasmPaths = W;
  const h = {};
  for (const [w, y] of Object.entries(r.phoneme_id_map))
    for (const l of y)
      h[l] = w;
  const u = await new Promise(async (w) => {
    (await m.createPiperPhonemize({
      print: (l) => {
        w(JSON.parse(l).phoneme_ids);
      },
      printErr: (l) => {
        throw new Error(l);
      },
      locateFile: (l) => l.endsWith(".wasm") ? `${x}.wasm` : l.endsWith(".data") ? `${x}.data` : l
    })).callMain([
      "-l",
      r.espeak.voice,
      "--input",
      f,
      "--espeak_data",
      "/espeak-ng-data"
    ]);
  });
  c = u.map((w) => h[w] || w);
  const S = 0, B = r.audio.sample_rate, _ = r.inference.noise_scale, U = r.inference.length_scale, D = r.inference.noise_w, O = await b(a, e), $ = await i.InferenceSession.create(await O.arrayBuffer()), g = {
    input: new i.Tensor("int64", u, [1, u.length]),
    input_lengths: new i.Tensor("int64", [u.length]),
    scales: new i.Tensor("float32", [_, U, D])
  };
  Object.keys(r.speaker_id_map).length && Object.assign(g, { sid: new i.Tensor("int64", [S]) });
  const {
    output: { data: F }
  } = await $.run(g);
  return {
    audio: new Blob([N(F, 1, B)], { type: "audio/x-wav" }),
    phonemes: u,
    ipa: c
  };
}
async function b(t, e) {
  const n = t.split("/").pop();
  let o = await T(n);
  return o || (o = await P(t, e), await j(n, o)), o;
}
async function A(t, e) {
  const n = [`/models/${t}.onnx`, `/models/${t}.onnx.json`];
  await Promise.all(
    n.map(async (o) => {
      const a = await P(o, o.endsWith(".onnx") ? e : void 0);
      await j(o, a);
    })
  );
}
async function I(t) {
  const e = [`/models/${t}.onnx`, `/models/${t}.onnx.json`];
  await Promise.all(e.map(H));
}
async function k() {
  const t = await L(), e = /* @__PURE__ */ new Set();
  for (const n of t)
    (n.endsWith(".onnx") || n.endsWith(".onnx.json")) && e.add(n.replace(".onnx", "").replace(".json", ""));
  return [...e];
}
async function z() {
  try {
    await (await (await navigator.storage.getDirectory()).getDirectoryHandle("tts^")).remove({ recursive: !0 });
  } catch (t) {
    console.error("[OPFS] Flush error:", t);
  }
}
async function C() {
  const n = [...(await (await fetch("/models/")).text()).matchAll(/href="([^"]+\.onnx\.json)"/g)].map((a) => a[1]);
  return [...new Set(n.map((a) => a.replace(/\.onnx\.json$/, "")))];
}
export {
  W as ONNX_BASE,
  x as WASM_BASE,
  A as download,
  z as flush,
  M as predict,
  I as remove,
  k as stored,
  C as voices
};
