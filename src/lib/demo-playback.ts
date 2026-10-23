/** Start once when half the video is visible. A denied autoplay stays retryable. */
export function observeDemoPlayback(video: HTMLVideoElement): () => void {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let attempted = false;
  let started = false;
  const onPlay = () => { started = true; };
  const pauseWhenHidden = () => { if (document.hidden) video.pause(); };
  const onMotionChange = () => { if (motion.matches) video.pause(); };
  video.addEventListener("play", onPlay);
  document.addEventListener("visibilitychange", pauseWhenHidden);
  motion.addEventListener("change", onMotionChange);
  const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver((entries) => {
    const entry = entries.find((item) => item.target === video);
    if (!entry) return;
    if (!entry.isIntersecting) {
      video.pause();
      return;
    }
    if (entry.intersectionRatio >= 0.5 && !attempted && !started && !motion.matches && !document.hidden) {
      attempted = true;
      video.muted = true;
      void video.play().catch(() => { /* Leave the manual play button available. */ });
    }
  }, { threshold: [0, 0.5] });
  observer?.observe(video);
  return () => {
    observer?.disconnect();
    video.removeEventListener("play", onPlay);
    document.removeEventListener("visibilitychange", pauseWhenHidden);
    motion.removeEventListener("change", onMotionChange);
    video.pause();
  };
}
