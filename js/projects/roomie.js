window.projectData = {
  slug: "roomie",
  title: "Roomie",
  source: "Roomie",
  category: "Kotlin / Android",
  summary: "Flatmate matching app for university students using preference-based swiping and group compatibility.",
  facts: [["Stack", "Kotlin · Android"], ["Interaction", "Swipe-based matching"], ["Audience", "University students"]],
  diagram: [["Profile", "student preferences"], ["Swipe", "one decision"], ["Score", "compatibility"], ["Group", "matching result"]],
  overview: "Roomie models flatmate discovery as a sequence of preference decisions and exposes compatible groups through an Android interface.",
  sections: [["Input", "Student preferences become the signals used for matching."], ["Interaction", "A swipe-based flow reduces the amount of information shown at one time."], ["Output", "The app surfaces groups with similar preferences for further contact."]],
  sourceFiles: ["Repository source"],
  sourceUrl: "https://github.com/dorianturner/Roomie",
  visual: {
    type: "screenshots",
    heading: "The product identity",
    description: "Roomie’s supplied product artwork captures the social matching idea: helping students find a compatible home and group of flatmates.",
    images: [["../assets/roomie/poster.png", "Roomie product artwork", "The Roomie mark combines a search motif with people, reflecting discovery and compatibility."]],
  },
};
