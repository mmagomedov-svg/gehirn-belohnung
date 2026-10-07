// Video und Sprecherstimme gemeinsam abspielen (die Stimme ist eine eigene Tonspur)
window.Intro = (() => {
  const OFF = 0.3;                                   // der Ton beginnt kurz nach dem ersten Bild
  const audio = document.getElementById("introAudio");
  const vids = [...document.querySelectorAll("video[data-intro]")];
  // Einzelne Datei: Das Video steckt in der Seite, als MP4 und als WebM. Genommen wird, was der Browser abspielen kann.
  const probe = document.createElement("video");
  let cand = (window.INTRO_SRC || []).filter(s => probe.canPlayType(s.test) !== "");
  if (!cand.length) cand = window.INTRO_SRC || [];
  const made = {}; let si = 0, mode = "blob", busy = false;
  function address(s) {
    if (mode === "blob") {
      try {
        if (!made[s.mime]) { const bin = atob(s.b64), buf = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i); made[s.mime] = URL.createObjectURL(new Blob([buf], { type: s.mime })); }
        return made[s.mime];
      } catch (e) { mode = "data"; }
    }
    return "data:" + s.mime + ";base64," + s.b64;
  }
  function giveUp() {
    document.querySelectorAll("[data-player]").forEach(p => { if (p.querySelector(".vnote")) return; const n = document.createElement("p"); n.className = "vnote"; n.textContent = "Dieser Browser kann das Video hier nicht abspielen. Öffnet die Seite in Chrome, Edge oder Firefox."; p.appendChild(n); });
  }
  function load() {
    const s = cand[si]; if (!s) { giveUp(); return; }
    const u = address(s);
    vids.forEach(v => { v.src = u; v.load(); });
    document.querySelectorAll("[data-intro-download]").forEach(a => { a.href = u; a.download = "Dopamin_in_einer_Minute." + (s.mime === "video/mp4" ? "mp4" : "webm"); });
  }
  if (cand.length) {
    vids.forEach(v => v.addEventListener("error", () => {           // klappt eine Variante nicht, kommt die nächste
      if (busy) return; busy = true;
      setTimeout(() => { busy = false; if (mode === "blob") mode = "data"; else { mode = "blob"; si++; } load(); }, 0);
    }));
    load();
  }
  let active = null, voiceFailed = false;
  const wrap = v => v.closest("[data-player]");
  function noVoice() { voiceFailed = true; document.querySelectorAll("[data-player] .vnote").forEach(n => { n.hidden = false; }); }
  if (audio) { const last = audio.querySelector("source:last-of-type"); if (last) last.addEventListener("error", noVoice); }
  function sync(v) {
    if (!audio || voiceFailed) return;
    if (v !== active) return;
    if (v.paused || v.ended) { audio.pause(); return; }
    const want = v.currentTime - OFF;
    if (want < 0 || want >= (audio.duration || 1e9)) { audio.pause(); return; }
    if (Math.abs(audio.currentTime - want) > 0.35) { try { audio.currentTime = want; } catch (e) {} }
    audio.muted = v.muted; audio.volume = v.volume;
    if (audio.paused) audio.play().catch(() => {});
  }
  vids.forEach(v => {
    v.addEventListener("play", () => { if (active && active !== v) active.pause(); active = v; wrap(v).classList.add("playing"); sync(v); });
    ["pause", "ended"].forEach(ev => v.addEventListener(ev, () => { wrap(v).classList.remove("playing"); sync(v); }));
    ["timeupdate", "seeked", "volumechange"].forEach(ev => v.addEventListener(ev, () => sync(v)));
  });
  document.querySelectorAll("[data-player] .vplay").forEach(b => b.addEventListener("click", e => { e.stopPropagation(); const v = wrap(b).querySelector("video"); v.paused ? v.play().catch(() => {}) : v.pause(); }));
  return {
    toggle(v) { v.paused ? v.play().catch(() => {}) : v.pause(); },
    restart(v) { try { v.currentTime = 0; } catch (e) {} v.play().catch(() => {}); },
    stop(v) { v.pause(); },
    stopAll() { vids.forEach(v => v.pause()); },
  };
})();
