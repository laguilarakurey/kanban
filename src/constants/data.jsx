export const ITEMS = [
    { id: "a", content: "A) Make a Rocket" },
    { id: "b", content: "B) Test the Rocket" },
    { id: "c", content: "C) Lauch the Rocket" },
    { id: "d", content: "D) Conquer Mars" },
    { id: "e", content: "E) Get back to Home" },
  ];
export  const COLUMNS = {
    assigned: {
      id: "assigned",
      name: "Assigned",
      items: ITEMS,
    },
    progress: {
      id: "progress",
      name: "In Progress",
      items: [],
    },
    done: {
      id: "done",
      name: "Done",
      items: [],
    },
  };