function renderSlice(root) {
  root.innerHTML = `<div class="slice-demo-widget">
    <iframe class="slice-demo-frame" src="../assets/slice/bimodal.html" title="Interactive Slice profiler demo using a bimodal workload" loading="lazy"></iframe>
    <p class="slice-demo-note">This is the live Slice profile used for the writeup. <a href="../assets/slice/bimodal.html" target="_blank" rel="noopener noreferrer">Open the demo in a new tab ↗</a></p>
  </div>`;

  const frame = root.querySelector(".slice-demo-frame");
  const resizeFrame = () => {
    try {
      const documentHeight = Math.max(
        frame.contentDocument.documentElement.scrollHeight,
        frame.contentDocument.body.scrollHeight,
      );
      if (documentHeight) frame.style.height = `${documentHeight}px`;
    } catch (_) {
      // The fallback CSS height keeps the demo usable if the document is unavailable.
    }
  };

  frame.addEventListener("load", () => {
    resizeFrame();
    frame.contentWindow?.addEventListener("resize", resizeFrame);
  });
}

window.projectWidgets = window.projectWidgets || {};
window.projectWidgets.slice = renderSlice;
