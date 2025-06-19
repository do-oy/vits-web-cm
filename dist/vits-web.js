const U = "https://cdnjs.cloudflare.com/ajax/libs/onnxruntime-web/1.18.0/", f = "https://cdn.jsdelivr.net/npm/@diffusionstudio/piper-wasm@1.0.0/build/piper_phonemize";
async function h(t, o) {
  try {
    const a = await (await navigator.storage.getDirectory()).getDirectoryHandle("piper", {
      create: !0
    }), i = t.split("/").at(-1), r = await (await a.getFileHandle(i, { create: !0 })).createWritable();
    await r.write(o), await r.close();
  } catch (e) {
    console.error(e);
  }
}
async function _(t) {
  try {
    const e = await (await navigator.storage.getDirectory()).getDirectoryHandle("piper"), a = t.split("/").at(-1);
    await (await e.getFileHandle(a)).remove();
  } catch (o) {
    console.error(o);
  }
}
async function D(t) {
  try {
    const e = await (await navigator.storage.getDirectory()).getDirectoryHandle("piper", {
      create: !0
    }), a = t.split("/").at(-1);
    return await (await e.getFileHandle(a)).getFile();
  } catch {
    return;
  }
}
async function y(t, o) {
  var c;
  const e = await fetch(t), a = (c = e.body) == null ? void 0 : c.getReader(), i = +(e.headers.get("Content-Length") ?? 0);
  let n = 0, r = [];
  for (; a; ) {
    const { done: l, value: u } = await a.read();
    if (l)
      break;
    r.push(u), n += u.length, o == null || o({
      url: t,
      total: i,
      loaded: n
    });
  }
  return new Blob(r, { type: e.headers.get("Content-Type") ?? void 0 });
}
function j(t, o, e) {
  const a = t.length, i = 44, n = new DataView(new ArrayBuffer(a * o * 2 + i));
  n.setUint32(0, 1179011410, !0), n.setUint32(4, n.buffer.byteLength - 8, !0), n.setUint32(8, 1163280727, !0), n.setUint32(12, 544501094, !0), n.setUint32(16, 16, !0), n.setUint16(20, 1, !0), n.setUint16(22, o, !0), n.setUint32(24, e, !0), n.setUint32(28, o * 2 * e, !0), n.setUint16(32, o * 2, !0), n.setUint16(34, 16, !0), n.setUint32(36, 1635017060, !0), n.setUint32(40, 2 * a, !0);
  let r = i;
  for (let c = 0; c < a; c++) {
    const l = t[c];
    l >= 1 ? n.setInt16(r, 32767, !0) : l <= -1 ? n.setInt16(r, -32768, !0) : n.setInt16(r, l * 32768 | 0, !0), r += 2;
  }
  return n.buffer;
}
let d, s;
async function H(t, o) {
  d = d ?? await import("./piper-DeOu3H9E.js"), s = s ?? await import("onnxruntime-web");
  const e = t.voiceId, a = JSON.stringify([{ text: t.text.trim() }]);
  s.env.allowLocalModels = !0, s.env.wasm.numThreads = navigator.hardwareConcurrency, s.env.wasm.wasmPaths = U;
  const i = await g(`/models/${e}/${e}.onnx.json`), n = JSON.parse(await i.text()), r = await new Promise(async (B) => {
    (await d.createPiperPhonemize({
      print: (w) => {
        B(JSON.parse(w).phoneme_ids);
      },
      printErr: (w) => {
        throw new Error(w);
      },
      locateFile: (w) => w.endsWith(".wasm") ? `${f}.wasm` : w.endsWith(".data") ? `${f}.data` : w
    })).callMain([
      "-l",
      n.espeak.voice,
      "--input",
      a,
      "--espeak_data",
      "/espeak-ng-data"
    ]);
  }), c = 0, l = n.audio.sample_rate, u = n.inference.noise_scale, m = n.inference.length_scale, v = n.inference.noise_w, b = await g(`/models/${e}/${e}.onnx`, o), x = await s.InferenceSession.create(await b.arrayBuffer()), p = {
    input: new s.Tensor("int64", r, [1, r.length]),
    input_lengths: new s.Tensor("int64", [r.length]),
    scales: new s.Tensor("float32", [u, m, v])
  };
  Object.keys(n.speaker_id_map).length && Object.assign(p, { sid: new s.Tensor("int64", [c]) });
  const {
    output: { data: $ }
  } = await x.run(p);
  return new Blob([j($, 1, l)], { type: "audio/x-wav" });
}
async function g(t, o) {
  let e = await D(t);
  return e || (e = await y(t, o), await h(t, e)), e;
}
async function k(t, o) {
  const e = [
    `/models/${t}/${t}.onnx`,
    `/models/${t}/${t}.onnx.json`
  ];
  await Promise.all(
    e.map(async (a) => {
      h(a, await y(a, a.endsWith(".onnx") ? o : void 0));
    })
  );
}
async function L(t) {
  const o = [
    `/models/${t}/${t}.onnx`,
    `/models/${t}/${t}.onnx.json`
  ];
  await Promise.all(o.map((e) => _(e)));
}
async function W() {
  const o = await (await navigator.storage.getDirectory()).getDirectoryHandle("piper", {
    create: !0
  }), e = [];
  for await (const a of o.keys())
    if (a.endsWith(".onnx")) {
      const i = a.split(".")[0];
      e.push(i);
    }
  return e;
}
async function O() {
  try {
    await (await (await navigator.storage.getDirectory()).getDirectoryHandle("piper")).remove({ recursive: !0 });
  } catch (t) {
    console.error(t);
  }
}
async function P() {
  const t = await fetch("/models/models.json");
  if (!t.ok)
    throw new Error("Не удалось получить список моделей");
  return await t.json();
}
export {
  U as ONNX_BASE,
  f as WASM_BASE,
  k as download,
  O as flush,
  H as predict,
  L as remove,
  W as stored,
  P as voices
};
