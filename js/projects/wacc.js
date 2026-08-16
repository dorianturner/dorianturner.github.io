window.projectData = {
  slug: "wacc",
  title: "WACC compiler",
  source: "wacc_05",
  category: "Scala / compiler backend",
  summary: "A Scala compiler for WACC programs with parsing, renaming, type checking, TAC generation, CFG optimisation, register mapping, and x86-64 or ARM32 output.",
  facts: [["Stack", "Scala · Parsley · Cats"], ["Targets", "x86-64 · ARM32"], ["Optimisations", "Constant · copy · dead code"]],
  diagram: [["Source", ".wacc program"], ["Frontend", "lex · parse · typecheck"], ["TAC", "lower typed AST"], ["CFG", "repeat optimisations"], ["Backend", "assembly target"]],
  overview: "Main.scala parses a source file, resolves imports, renames identifiers, type checks the typed AST, lowers it to TAC, optionally optimises the CFG, virtualises registers, maps them to a target, expands instructions, and emits assembly.",
  sections: [
    ["Frontend", "The lexer and parser produce an AST. ImportResolver merges imported functions, renamer resolves identifier identity, and typechecker applies structural constraints before code generation."],
    ["Middle-end", "tacifier lowers typed expressions and statements into blocks with labels and terminators. The optimiser repeats constant folding, constant propagation, dead-code elimination, and copy propagation until stable."],
    ["Backend", "virtualiser creates target-sized virtual registers and GC metadata. The selected ARM32 or x86 path maps registers, expands TAC operations, emits runtime helpers, and writes assembly."],
  ],
  sourceFiles: ["src/main/wacc/Main.scala", "src/main/wacc/frontend/parser.scala", "src/main/wacc/frontend/typechecker.scala", "src/main/wacc/backend/shared/tacifier.scala", "src/main/wacc/backend/cfg/tacoptim.scala"],
  sourceUrl: "https://gitlab.doc.ic.ac.uk/lab2526_spring/wacc_05",
  visual: {
    type: "diagram",
    widget: "wacc",
    heading: "Compiler phases",
    description: "Select a phase to follow the representation as it changes from source text to target assembly. The diagram follows Main.scala’s actual compile order.",
  },
};
