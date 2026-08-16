window.projectData = {
  slug: "fed-up",
  title: "Fed Up",
  source: "drp03",
  category: "Web application / recommendation system",
  summary: "Fed Up makes healthy, affordable eating easier to maintain when deadlines compress a student’s time, energy, budget, and headspace.",
  facts: [["Stack", "React 19 · TypeScript · Bun · Firebase"], ["Product model", "Deadline-aware planning"], ["Core flow", "Constraints → strategy → plan → reminders"]],
  diagram: [["Deadline week", "workload events"], ["Constraints", "budget · time · kitchen"], ["Strategy", "three ranked modes"], ["Plan", "weekly meals"], ["Reminders", "calendar actions"]],
  overview: "When coursework and deadlines pile up, healthy eating becomes the option that requires the most planning. Fed Up treats that as a design problem: reduce the decisions, cost, and preparation effort needed to keep a healthy meal within reach.",
  sections: [
    ["The problem", "During deadline weeks, students have less time, energy, and headspace to cook. Healthy food competes with cheap convenience, late campus days, limited kitchen access, and a budget that still has to last."],
    ["Our question", "How might we make healthy, affordable eating the easiest choice during deadline weeks, so that university students can maintain a healthy diet?"],
  ],
  sourceFiles: ["src/deadline-food/DeadlineFoodApp.tsx", "src/domain/recommendationRules.ts", "src/domain/types.ts", "src/deadline-food/screens/PlanScreen.tsx"],
  sourceUrl: "https://github.com/KOLESNiii/Fed-Up",
  hideMap: true,
  hideSectionDescriptions: true,
  solution: {
    type: "screenshots",
    heading: "Solution: Fed Up in practice",
    description: "Fed Up combines deadlines with budget, kitchen access, cooking time, and dietary preferences. It ranks Prep Once, Mixed Mode, and No-Cook Rescue, then turns the choice into a weekly plan with reminders and a rescue route when the week changes. These screens show that journey in practice.",
    images: [
      ["../assets/fed-up/landing-screen.png", "01 / Start with the goal", "The landing screen names the real constraint—coursework—and makes starting a healthy meal plan feel like the easiest next step."],
      ["../assets/fed-up/calendar-select.png", "02 / Connect the week", "Calendar integration lets Fed Up detect busy study days, while the optional skip path keeps onboarding lightweight."],
      ["../assets/fed-up/preference-selection.png", "03 / Set realistic limits", "Students set the constraints the planner must respect: cooking time, weekly budget, kitchen access, planning window, and priorities."],
    ],
  },
  architectureVisual: {
    type: "screenshots",
    heading: "System architecture + tech stack",
    description: "The architecture connects the student-facing web app to Firebase functions, nutrition data, cached sessions, and the recommendation service behind the plan.",
    images: [
      ["../assets/fed-up/system-architecture.png", "01 / Support the recommendation", "The system brings together the web app, backend functions, student data, nutrition sources, and recommendation services that power Fed Up."],
      ["../assets/fed-up/tech-stack.png", "02 / Choose the right tools", "The stack combines React and TypeScript at the interface, Firebase for the serverless backend, and a dedicated recipe-intelligence layer for explainable recommendations."],
    ],
  },
};
