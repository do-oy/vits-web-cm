const U = "https://cdnjs.cloudflare.com/ajax/libs/onnxruntime-web/1.18.0/", f = "https://cdn.jsdelivr.net/npm/@diffusionstudio/piper-wasm@1.0.0/build/piper_phonemize";
async function h(e, t) {
  try {
    const r = await (await navigator.storage.getDirectory()).getDirectoryHandle("piper", { create: !0 }), a = e.split("/").pop(), i = await (await r.getFileHandle(a, { create: !0 })).createWritable();
    await i.write(t), await i.close();
  } catch (n) {
    console.error("[OPFS] Write error:", n);
  }
}
async function j(e) {
  try {
    return await (await (await (await navigator.storage.getDirectory()).getDirectoryHandle("piper", { create: !0 })).getFileHandle(e)).getFile();
  } catch {
    return;
  }
}
async function _(e) {
  try {
    await (await (await navigator.storage.getDirectory()).getDirectoryHandle("piper")).removeEntry(e);
  } catch (t) {
    console.error("[OPFS] Remove error:", t);
  }
}
async function D() {
  const t = await (await navigator.storage.getDirectory()).getDirectoryHandle("piper", { create: !0 }), n = [];
  for await (const r of t.keys())
    n.push(r);
  return n;
}
async function m(e, t) {
  var c;
  const n = await fetch(e), r = (c = n.body) == null ? void 0 : c.getReader(), a = +(n.headers.get("Content-Length") ?? 0);
  let o = 0, i = [];
  for (; r; ) {
    const { done: l, value: w } = await r.read();
    if (l)
      break;
    i.push(w), o += w.length, t == null || t({
      url: e,
      total: a,
      loaded: o
    });
  }
  return new Blob(i, { type: n.headers.get("Content-Type") ?? void 0 });
}
function P(e, t, n) {
  const r = e.length, a = 44, o = new DataView(new ArrayBuffer(r * t * 2 + a));
  o.setUint32(0, 1179011410, !0), o.setUint32(4, o.buffer.byteLength - 8, !0), o.setUint32(8, 1163280727, !0), o.setUint32(12, 544501094, !0), o.setUint32(16, 16, !0), o.setUint16(20, 1, !0), o.setUint16(22, t, !0), o.setUint32(24, n, !0), o.setUint32(28, t * 2 * n, !0), o.setUint16(32, t * 2, !0), o.setUint16(34, 16, !0), o.setUint32(36, 1635017060, !0), o.setUint32(40, 2 * r, !0);
  let i = a;
  for (let c = 0; c < r; c++) {
    const l = e[c];
    l >= 1 ? o.setInt16(i, 32767, !0) : l <= -1 ? o.setInt16(i, -32768, !0) : o.setInt16(i, l * 32768 | 0, !0), i += 2;
  }
  return o.buffer;
}
let u, s;
async function O(e, t) {
  u = u ?? await import("./piper-DeOu3H9E.js"), s = s ?? await import("onnxruntime-web");
  const n = `/models/${e.voiceId}`, r = JSON.stringify([{ text: e.text.trim() }]);
  s.env.allowLocalModels = !0, s.env.wasm.numThreads = navigator.hardwareConcurrency, s.env.wasm.wasmPaths = U;
  const a = await g(`${n}.onnx.json`, t), o = JSON.parse(await a.text()), i = await new Promise(async (S) => {
    (await u.createPiperPhonemize({
      print: (d) => {
        S(JSON.parse(d).phoneme_ids);
      },
      printErr: (d) => {
        throw new Error(d);
      },
      locateFile: (d) => d.endsWith(".wasm") ? `${f}.wasm` : d.endsWith(".data") ? `${f}.data` : d
    })).callMain([
      "-l",
      o.espeak.voice,
      "--input",
      r,
      "--espeak_data",
      "/espeak-ng-data"
    ]);
  }), c = 0, l = o.audio.sample_rate, w = o.inference.noise_scale, y = o.inference.length_scale, v = o.inference.noise_w, b = await g(`${n}.onnx`, t), x = await s.InferenceSession.create(await b.arrayBuffer()), p = {
    input: new s.Tensor("int64", i, [1, i.length]),
    input_lengths: new s.Tensor("int64", [i.length]),
    scales: new s.Tensor("float32", [w, y, v])
  };
  Object.keys(o.speaker_id_map).length && Object.assign(p, { sid: new s.Tensor("int64", [c]) });
  const {
    output: { data: B }
  } = await x.run(p);
  return new Blob([P(B, 1, l)], { type: "audio/x-wav" });
}
async function g(e, t) {
  let n = await j(e);
  return n || (n = await m(e, t), await h(e, n)), n;
}
async function W(e, t) {
  const n = [`/models/${e}.onnx`, `/models/${e}.onnx.json`];
  await Promise.all(
    n.map(async (r) => {
      const a = await m(r, r.endsWith(".onnx") ? t : void 0);
      await h(r, a);
    })
  );
}
async function F(e) {
  const t = [`/models/${e}.onnx`, `/models/${e}.onnx.json`];
  await Promise.all(t.map(_));
}
async function H() {
  const e = await D(), t = /* @__PURE__ */ new Set();
  for (const n of e)
    (n.endsWith(".onnx") || n.endsWith(".onnx.json")) && t.add(n.replace(".onnx", "").replace(".json", ""));
  return [...t];
}
async function L() {
  try {
    await (await (await navigator.storage.getDirectory()).getDirectoryHandle("piper")).remove({ recursive: !0 });
  } catch (e) {
    console.error("[OPFS] Flush error:", e);
  }
}
async function N() {
  const n = [...(await (await fetch("/models/")).text()).matchAll(/href="([^"]+\.onnx\.json)"/g)].map((a) => a[1]);
  return [...new Set(n.map((a) => a.replace(/\.onnx\.json$/, "")))];
}
export {
  U as ONNX_BASE,
  f as WASM_BASE,
  W as download,
  L as flush,
  O as predict,
  F as remove,
  H as stored,
  N as voices
};
