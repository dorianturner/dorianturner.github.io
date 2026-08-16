window.projectData = {
  slug: "harness",
  title: "Harness",
  source: "harness",
  category: "Rust / terminal runtime",
  summary: "A Nix-first terminal AI coding runtime built around typed events, provider-independent model adapters, conversation persistence, and reproducible command execution.",
  facts: [["Stack", "Rust · Tokio · Nix"], ["Runtime", "Terminal UI"], ["Boundaries", "Events · providers · tools"]],
  diagram: [["Prompt", "user event"], ["EventBus", "typed routing"], ["Provider", "token stream"], ["Tool", "approval boundary"], ["Session", "history + rollback"]],
  overview: "main.rs builds an event bus, selects a model provider, starts the core session task, and runs the terminal UI. The session coordinates prompt streams, tool approvals, persistence, agent loops, and rollback state.",
  sections: [
    ["Event bus", "User prompts, model tokens, provider changes, tool approvals, command output, persistence, and rollback are represented as typed Event variants."],
    ["Model boundary", "ModelProvider exposes a stream of ModelEvent values. The OpenAI adapter converts the shared request model into Responses API input and emits token, usage, and completion events."],
    ["Tool boundary", "RunCommand, WriteFile, ApplyPatch, and RollbackLastChange are explicit ToolRequest variants. Approval and result events keep execution separate from model streaming."],
  ],
  sourceFiles: ["src/main.rs", "src/core/events.rs", "src/core/session.rs", "src/core/model.rs", "src/providers/openai.rs", "src/tools/mod.rs"],
  sourceUrl: "https://github.com/dorianturner/harness",
  visual: {
    type: "diagram",
    widget: "harness",
    heading: "The runtime architecture",
    description: "Harness keeps the terminal UI, model provider, tool execution, and conversation state loosely coupled through a typed event bus. Context is assembled at the session boundary before each model request.",
  },
};
