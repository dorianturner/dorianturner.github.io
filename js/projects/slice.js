window.projectData = {
  slug: "slice",
  title: "Slice",
  source: "slice",
  category: "C++ / Linux percentile profiler",
  summary: "A focused profiler for one question: what does the call stack look like during the slowest executions of one C++ function?",
  facts: [["Stack", "Rust · C · eBPF · perf"], ["Target", "One exact ELF function"], ["Output", "Percentile-conditioned flame graph"]],
  diagram: [["Symbols", "demangled ELF function"], ["Attach", "launch or PID"], ["Trace", "invocation + stacks"], ["Population", "latency distribution"], ["Tail", "p95:p100 paths"]],
  overview: "I liked the functionality of Firefox Profiler, but wanted to learn more about the p95–p99 case of my programs. Slice grew from the design questions that appear when the slow tail—not the average—is the thing you want to explain.",
  overviewWidget: {
    label: "The investigation loop",
    lead: "We want to learn more about the tail case, so we define the unit of work, and trace it, then inspect it.",
    steps: [
      ["01 / Define", "Define the unit of work", "Treat one exact function execution as the comparable unit we can rank."],
      ["02 / Trace", "Trace each invocation", "Pair entry and exit with sampled stacks, threads, and scheduler activity."],
      ["03 / Inspect", "Inspect the slow tail", "Use time, thread, and percentile selection to make p95–p99 explainable."],
    ],
  },
  sections: [
    ["Start with the tail", "Firefox Profiler makes program activity inspectable. Slice narrows that idea around percentile latency, so the interesting question becomes: which stacks are present in the slowest few invocations, and what work or scheduler wait makes them slow?"],
    ["Define a unit of work", "A useful percentile needs a population of comparable events. Slice treats one exact function execution as that unit, recording entry and exit so every invocation has a duration that can be ranked."],
    ["Make the trace attributable", "The target must be a real demangled ELF symbol, not a vague process-wide sample. Invocation timing is paired with sampled user stacks and scheduler activity so the tail can be connected back to code and off-CPU time."],
    ["Keep the answer usable", "The interface makes time-window selection, thread selection, and histogram latency selection first-class controls. These filters let a dense capture become a small, inspectable population before reading the flame graph."],
  ],
  sourceFiles: ["crates/slice-cli/src/main.rs", "crates/slice-collector/src/lib.rs", "crates/slice-ebpf/bpf/slice.bpf.c", "crates/slice-render/src/lib.rs"],
  sourceUrl: "https://github.com/dorianturner/slice",
  visual: {
    type: "widget",
    widget: "slice",
    sectionLabel: "03 / Slice profiler",
    heading: "From symbol to slow tail",
    description: "Try the three decisions that shape a Slice investigation: discover the exact function, capture a population of executions, then reduce it with time, thread, and percentile controls.",
  },
};
