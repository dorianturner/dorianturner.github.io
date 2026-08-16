window.projectData = {
  slug: "tac-shooter",
  title: "Sightline",
  source: "tac_shooter",
  category: "Multiplayer game / simulation",
  summary: "A server-authoritative 2D tactical shooter prototype built around temporary information control, repositioning, and environmental adaptation.",
  facts: [["Stack", "TypeScript · Phaser · Node.js"], ["Simulation", "60 Hz server tick"], ["Visibility", "Line of sight · smoke · sensors"]],
  diagram: [["Command", "client input"], ["Room state", "60 Hz server"], ["Visibility", "walls · smoke · sensors"], ["Snapshot", "filtered state"], ["Phaser", "client renderer"]],
  overview: "The client renders Phaser scenes and sends player commands. The server owns room state, movement, combat, gadgets, bots, detections, replays, and filtered snapshots, so hidden enemy state is not sent to clients.",
  sections: [
    ["Visibility", "The visibility module casts a cone against map walls and smoke. Wall endpoints and smoke tangents are added as ray angles, then the closest intersections form the visible polygon."],
    ["Information", "Cameras, motion and sound sensors produce detections with confidence and expiry ticks. Explored points persist separately from the current visible cone."],
    ["Environment", "Doors, breakable walls, smoke, molotovs, cameras, sound sensors, and deployable walls are part of the authoritative room state and affect future commands."],
  ],
  sourceFiles: ["apps/server/src/sim.ts", "apps/server/src/sim/visibility.ts", "apps/server/src/sim/config.ts", "apps/client/src/scenes/PlayScene.ts", "packages/shared/src/types.ts"],
  sourceUrl: "https://github.com/dorianturner/2D-Tac-Shooter",
  visual: {
    type: "screenshots",
    heading: "The game state on screen",
    description: "This captured game view shows the result of the server-owned simulation: players, walls, sensors, smoke, and a visibility cone rendered together in the Phaser client.",
    images: [["../assets/sightline/game-view.png", "Sightline tactical game view", "The client renders the current room, player positions, sensor ranges, and the active line-of-sight cone."]],
  },
};
