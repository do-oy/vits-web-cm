const D = "https://cdnjs.cloudflare.com/ajax/libs/onnxruntime-web/1.18.0/", h = "https://cdn.jsdelivr.net/npm/@diffusionstudio/piper-wasm@1.0.0/build/piper_phonemize";
async function y(e, t) {
  try {
    const a = await (await navigator.storage.getDirectory()).getDirectoryHandle("piper", { create: !0 }), r = e.split("/").pop(), i = await (await a.getFileHandle(r, { create: !0 })).createWritable();
    await i.write(t), await i.close();
  } catch (n) {
    console.error("[OPFS] Write error:", n);
  }
}
async function $(e) {
  try {
    return await (await (await (await navigator.storage.getDirectory()).getDirectoryHandle("piper", { create: !0 })).getFileHandle(e)).getFile();
  } catch {
    return;
  }
}
async function O(e) {
  try {
    await (await (await navigator.storage.getDirectory()).getDirectoryHandle("piper")).removeEntry(e);
  } catch (t) {
    console.error("[OPFS] Remove error:", t);
  }
}
async function W() {
  const t = await (await navigator.storage.getDirectory()).getDirectoryHandle("piper", { create: !0 }), n = [];
  for await (const a of t.keys())
    n.push(a);
  return n;
}
async function v(e, t) {
  var l;
  const n = await fetch(e), a = (l = n.body) == null ? void 0 : l.getReader(), r = +(n.headers.get("Content-Length") ?? 0);
  let o = 0, i = [];
  for (; a; ) {
    const { done: d, value: w } = await a.read();
    if (d)
      break;
    i.push(w), o += w.length, t == null || t({
      url: e,
      total: r,
      loaded: o
    });
  }
  return new Blob(i, { type: n.headers.get("Content-Type") ?? void 0 });
}
function F(e, t, n) {
  const a = e.length, r = 44, o = new DataView(new ArrayBuffer(a * t * 2 + r));
  o.setUint32(0, 1179011410, !0), o.setUint32(4, o.buffer.byteLength - 8, !0), o.setUint32(8, 1163280727, !0), o.setUint32(12, 544501094, !0), o.setUint32(16, 16, !0), o.setUint16(20, 1, !0), o.setUint16(22, t, !0), o.setUint32(24, n, !0), o.setUint32(28, t * 2 * n, !0), o.setUint16(32, t * 2, !0), o.setUint16(34, 16, !0), o.setUint32(36, 1635017060, !0), o.setUint32(40, 2 * a, !0);
  let i = r;
  for (let l = 0; l < a; l++) {
    const d = e[l];
    d >= 1 ? o.setInt16(i, 32767, !0) : d <= -1 ? o.setInt16(i, -32768, !0) : o.setInt16(i, d * 32768 | 0, !0), i += 2;
  }
  return o.buffer;
}
let u, s;
async function T(e, t) {
  u = u ?? await import("./piper-DeOu3H9E.js"), s = s ?? await import("onnxruntime-web");
  const n = `/models/${e.voiceId}/${e.voiceId}`, a = await g(`${n}.onnx.json`, t), r = JSON.parse(await a.text());
  let o = [], i = e.text;
  const l = JSON.stringify([{ text: i.trim() }]);
  s.env.allowLocalModels = !0, s.env.wasm.numThreads = navigator.hardwareConcurrency, s.env.wasm.wasmPaths = D;
  const d = {};
  for (const [p, m] of Object.entries(r.phoneme_id_map))
    for (const c of m)
      d[c] = p;
  const w = await new Promise(async (p) => {
    (await u.createPiperPhonemize({
      print: (c) => {
        p(JSON.parse(c).phoneme_ids);
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
  o = w.map((p) => d[p] || p);
  const b = 0, x = r.audio.sample_rate, B = r.inference.noise_scale, S = r.inference.length_scale, _ = r.inference.noise_w, j = await g(`${n}.onnx`, t), U = await s.InferenceSession.create(await j.arrayBuffer()), f = {
    input: new s.Tensor("int64", w, [1, w.length]),
    input_lengths: new s.Tensor("int64", [w.length]),
    scales: new s.Tensor("float32", [B, S, _])
  };
  Object.keys(r.speaker_id_map).length && Object.assign(f, { sid: new s.Tensor("int64", [b]) });
  const {
    output: { data: P }
  } = await U.run(f);
  return {
    audio: new Blob([F(P, 1, x)], { type: "audio/x-wav" }),
    phonemes: w,
    ipa: o
  };
}
async function g(e, t) {
  let n = await $(e);
  return n || (n = await v(e, t), await y(e, n)), n;
}
async function H(e, t) {
  const n = [`/models/${e}.onnx`, `/models/${e}.onnx.json`];
  await Promise.all(
    n.map(async (a) => {
      const r = await v(a, a.endsWith(".onnx") ? t : void 0);
      await y(a, r);
    })
  );
}
async function L(e) {
  const t = [`/models/${e}.onnx`, `/models/${e}.onnx.json`];
  await Promise.all(t.map(O));
}
async function I() {
  const e = await W(), t = /* @__PURE__ */ new Set();
  for (const n of e)
    (n.endsWith(".onnx") || n.endsWith(".onnx.json")) && t.add(n.replace(".onnx", "").replace(".json", ""));
  return [...t];
}
async function N() {
  try {
    await (await (await navigator.storage.getDirectory()).getDirectoryHandle("piper")).remove({ recursive: !0 });
  } catch (e) {
    console.error("[OPFS] Flush error:", e);
  }
}
async function A() {
  const n = [...(await (await fetch("/models/")).text()).matchAll(/href="([^"]+\.onnx\.json)"/g)].map((r) => r[1]);
  return [...new Set(n.map((r) => r.replace(/\.onnx\.json$/, "")))];
}
export {
  D as ONNX_BASE,
  h as WASM_BASE,
  H as download,
  N as flush,
  T as predict,
  L as remove,
  I as stored,
  A as voices
};
