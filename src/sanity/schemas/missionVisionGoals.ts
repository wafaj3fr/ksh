  // schemas/missionVisionGoals.ts

const missionVisionGoals = {
  name: "missionVisionGoals",
  title: "Mission, Vision, Goals",
  type: "document",
  fields: [
    {
      name: "mission",
      title: "Mission",
      type: "text",
    },
    {
      name: "vision",
      title: "Vision",
      type: "text",
    },
    {
      name: "goals",
      title: "Goals",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
};

export default missionVisionGoals;
