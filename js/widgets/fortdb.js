function renderFortdb(root) {
  root.innerHTML = `<div class="fortdb-diagrams fortdb-flow-stack">
    <article class="fortdb-diagram fortdb-flow-card">
      <div class="diagram-heading"><span>01 / CLI parse</span><h3>Turn a command into an instruction</h3></div>
      <div class="fortdb-flow-row">
        <div class="fortdb-flow-node"><small>interactive shell</small><code>delete users/alice/age</code></div>
        <i aria-hidden="true">→</i>
        <div class="fortdb-flow-node"><small>parser.c</small><strong>tokenise argv</strong><span>command · path</span></div>
        <i aria-hidden="true">→</i>
        <div class="fortdb-flow-node is-accent"><small>src/ir.h</small><strong>Instr</strong><span>DELETE + path</span></div>
      </div>
      <div class="fortdb-parse-options">
        <div><b>operation</b><span>DELETE</span></div>
        <div><b>target</b><span>users / alice / age</span></div>
        <div><b>version</b><span>global counter</span></div>
      </div>
      <p>The interactive CLI keeps parsing separate from execution: <code>parser.c</code> turns arguments into an AST-shaped <code>Instr</code> tagged union before the storage engine does any mutation.</p>
    </article>

    <article class="fortdb-diagram fortdb-flow-card">
      <div class="diagram-heading"><span>02 / Append-only write</span><h3>Delete an existing chain</h3></div>
      <div class="fortdb-flow-row">
        <div class="fortdb-flow-node"><small>instruction</small><code>DELETE users/alice/age</code></div>
        <i aria-hidden="true">→</i>
        <div class="fortdb-flow-node"><small>document path</small><strong>resolve field</strong><span>find current VersionNode chain</span></div>
        <i aria-hidden="true">→</i>
        <div class="fortdb-flow-node is-accent"><small>new node</small><strong>append tombstone</strong><span>never overwrite in place</span></div>
      </div>
      <div class="fortdb-chain-change">
        <div class="fortdb-chain-state"><small>existing chain</small><div class="fortdb-chain"><div class="fortdb-version"><b>v2</b><span>29</span></div><i aria-hidden="true">→</i><div class="fortdb-version"><b>v1</b><span>21</span></div></div></div>
        <i class="fortdb-big-arrow" aria-hidden="true">→</i>
        <div class="fortdb-chain-state is-result"><small>after delete</small><div class="fortdb-chain"><div class="fortdb-version is-tombstone"><b>v3</b><span>tombstone</span></div><i aria-hidden="true">→</i><div class="fortdb-version"><b>v2</b><span>29</span></div><i aria-hidden="true">→</i><div class="fortdb-version"><b>v1</b><span>21</span></div></div></div>
      </div>
      <p>DELETE appends a tombstone to the current chain, increments the version counters, and lets the serializer persist the new state. The previous values remain available for time-travel reads.</p>
    </article>

    <article class="fortdb-diagram fortdb-flow-card">
      <div class="diagram-heading"><span>03 / Historical read</span><h3>Walk the chain to the requested state</h3></div>
      <div class="fortdb-read-grid">
        <div class="fortdb-read-route"><div class="fortdb-flow-node"><small>latest read</small><code>get users/alice/age</code></div><i aria-hidden="true">→</i><div class="fortdb-flow-node is-accent"><small>result</small><strong>latest visible value</strong><span>skip tombstones, return current state</span></div></div>
        <div class="fortdb-read-route"><div class="fortdb-flow-node"><small>time travel</small><code>get users/alice/age --v=1</code></div><i aria-hidden="true">→</i><div class="fortdb-flow-node is-accent"><small>result</small><strong>v1 = 21</strong><span>follow <code>prev</code> until the requested local version</span></div></div>
      </div>
      <div class="fortdb-read-chain"><div class="fortdb-version is-tombstone"><b>v3</b><span>deleted</span></div><i aria-hidden="true">→</i><div class="fortdb-version"><b>v2</b><span>29</span></div><i aria-hidden="true">→</i><div class="fortdb-version is-selected"><b>v1</b><span>21 / selected</span></div></div>
      <p>A normal GET resolves the newest visible state. Supplying <code>--v</code> changes the stopping point, so the same chain can answer historical questions without restoring an old database snapshot.</p>
    </article>

    <article class="fortdb-diagram fortdb-flow-card">
      <div class="diagram-heading"><span>04 / Atomic compaction</span><h3>Keep the latest state, remove the history safely</h3></div>
      <div class="fortdb-flow-row fortdb-compaction-row">
        <div class="fortdb-flow-node"><small>before</small><strong>versioned file</strong><span>live values + tombstones + old nodes</span></div>
        <i aria-hidden="true">→</i>
        <div class="fortdb-flow-node is-accent"><small>compact / compact_db</small><strong>rewrite latest state</strong><span>discard obsolete versions and tombstones</span></div>
        <i aria-hidden="true">→</i>
        <div class="fortdb-flow-node"><small>after atomic swap</small><strong>smaller database</strong><span>latest values only, old file replaced safely</span></div>
      </div>
      <div class="fortdb-compaction-files"><div><b>old file</b><span>db.fort.tmp → discarded</span></div><i aria-hidden="true">⇄</i><div class="is-result"><b>new file</b><span>db.fort → atomically swapped in</span></div></div>
      <p>Compaction is explicit and atomic: FortDB writes a clean representation, removes tombstones, then swaps files so a crash cannot leave the database half-rewritten.</p>
    </article>
  </div>`;
}

window.projectWidgets = window.projectWidgets || {};
window.projectWidgets.fortdb = renderFortdb;
