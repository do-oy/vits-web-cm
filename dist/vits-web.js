const D = "https://cdnjs.cloudflare.com/ajax/libs/onnxruntime-web/1.18.0/", h = "https://cdn.jsdelivr.net/npm/@diffusionstudio/piper-wasm@1.0.0/build/piper_phonemize";
async function y(t, e) {
  try {
    const a = await (await navigator.storage.getDirectory()).getDirectoryHandle("tts^", { create: !0 }), r = t.split("/").pop(), s = await (await a.getFileHandle(r, { create: !0 })).createWritable();
    await s.write(e), await s.close();
  } catch (n) {
    console.error("[OPFS] Write error:", n);
  }
}
async function O(t) {
  try {
    return await (await (await (await navigator.storage.getDirectory()).getDirectoryHandle("tts^", { create: !0 })).getFileHandle(t)).getFile();
  } catch {
    return;
  }
}
async function $(t) {
  try {
    await (await (await navigator.storage.getDirectory()).getDirectoryHandle("tts^")).removeEntry(t);
  } catch (e) {
    console.error("[OPFS] Remove error:", e);
  }
}
async function W() {
  const e = await (await navigator.storage.getDirectory()).getDirectoryHandle("tts^", { create: !0 }), n = [];
  for await (const a of e.keys())
    n.push(a);
  return n;
}
async function v(t, e) {
  var l;
  const n = await fetch(t), a = (l = n.body) == null ? void 0 : l.getReader(), r = +(n.headers.get("Content-Length") ?? 0);
  let o = 0, s = [];
  for (; a; ) {
    const { done: d, value: w } = await a.read();
    if (d)
      break;
    s.push(w), o += w.length, e == null || e({
      url: t,
      total: r,
      loaded: o
    });
  }
  return new Blob(s, { type: n.headers.get("Content-Type") ?? void 0 });
}
function F(t, e, n) {
  const a = t.length, r = 44, o = new DataView(new ArrayBuffer(a * e * 2 + r));
  o.setUint32(0, 1179011410, !0), o.setUint32(4, o.buffer.byteLength - 8, !0), o.setUint32(8, 1163280727, !0), o.setUint32(12, 544501094, !0), o.setUint32(16, 16, !0), o.setUint16(20, 1, !0), o.setUint16(22, e, !0), o.setUint32(24, n, !0), o.setUint32(28, e * 2 * n, !0), o.setUint16(32, e * 2, !0), o.setUint16(34, 16, !0), o.setUint32(36, 1635017060, !0), o.setUint32(40, 2 * a, !0);
  let s = r;
  for (let l = 0; l < a; l++) {
    const d = t[l];
    d >= 1 ? o.setInt16(s, 32767, !0) : d <= -1 ? o.setInt16(s, -32768, !0) : o.setInt16(s, d * 32768 | 0, !0), s += 2;
  }
  return o.buffer;
}
let f, i;
async function T(t, e) {
  f = f ?? await import("./piper-DeOu3H9E.js"), i = i ?? await import("onnxruntime-web");
  const n = `/models/${t.voiceId}`, a = await g(`${n}.onnx.json`, e), r = JSON.parse(await a.text());
  let o = [], s = t.text;
  const l = JSON.stringify([{ text: s.trim() }]);
  i.env.allowLocalModels = !0, i.env.wasm.numThreads = navigator.hardwareConcurrency, i.env.wasm.wasmPaths = D;
  const d = {};
  for (const [u, m] of Object.entries(r.phoneme_id_map))
    for (const c of m)
      d[c] = u;
  const w = await new Promise(async (u) => {
    (await f.createPiperPhonemize({
      print: (c) => {
        u(JSON.parse(c).phoneme_ids);
      },
      printErr: (c) => {
        throw new Error(c);
      },
      locateFile: (c) => c.endsWith(".wasm") ? `${h}.wasm` : c.endsWith(".data") ? `${h}.data` : c
    })).callMain([
      "-l",
      r.espeak.voice,
      "--input",
      l,
      "--espeak_data",
      "/espeak-ng-data"
    ]);
  });
  o = w.map((u) => d[u] || u);
  const b = 0, x = r.audio.sample_rate, B = r.inference.noise_scale, S = r.inference.length_scale, _ = r.inference.noise_w, j = await g(`${n}.onnx`, e), U = await i.InferenceSession.create(await j.arrayBuffer()), p = {
    input: new i.Tensor("int64", w, [1, w.length]),
    input_lengths: new i.Tensor("int64", [w.length]),
    scales: new i.Tensor("float32", [B, S, _])
  };
  Object.keys(r.speaker_id_map).length && Object.assign(p, { sid: new i.Tensor("int64", [b]) });
  const {
    output: { data: P }
  } = await U.run(p);
  return {
    audio: new Blob([F(P, 1, x)], { type: "audio/x-wav" }),
    phonemes: w,
    ipa: o
  };
}
async function g(t, e) {
  let n = await O(t);
  return n || (n = await v(t, e), await y(t, n)), n;
}
async function H(t, e) {
  const n = [`/models/${t}.onnx`, `/models/${t}.onnx.json`];
  await Promise.all(
    n.map(async (a) => {
      const r = await v(a, a.endsWith(".onnx") ? e : void 0);
      await y(a, r);
    })
  );
}
async function L(t) {
  const e = [`/models/${t}.onnx`, `/models/${t}.onnx.json`];
  await Promise.all(e.map($));
}
async function N() {
  const t = await W(), e = /* @__PURE__ */ new Set();
  for (const n of t)
    (n.endsWith(".onnx") || n.endsWith(".onnx.json")) && e.add(n.replace(".onnx", "").replace(".json", ""));
  return [...e];
}
async function A() {
  try {
    await (await (await navigator.storage.getDirectory()).getDirectoryHandle("tts^")).remove({ recursive: !0 });
  } catch (t) {
    console.error("[OPFS] Flush error:", t);
  }
}
async function E() {
  const n = [...(await (await fetch("/models/")).text()).matchAll(/href="([^"]+\.onnx\.json)"/g)].map((r) => r[1]);
  return [...new Set(n.map((r) => r.replace(/\.onnx\.json$/, "")))];
}
export {
  D as ONNX_BASE,
  h as WASM_BASE,
  H as download,
  A as flush,
  T as predict,
  L as remove,
  N as stored,
  E as voices
};
