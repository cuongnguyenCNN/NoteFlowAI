"use client";
import { useRouter } from "next/navigation";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { useEffect } from "react";
import CustomNode from "./customnode";

function convertStyleStringToObject(styleString: string) {
  const styleObject: { [key: string]: string } = {};

  styleString.split(";").forEach((style) => {
    if (style.trim()) {
      const [property, value] = style.split(":");
      if (property && value) {
        const camelCaseProperty = property
          .trim()
          .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()); // Convert to camelCase
        styleObject[camelCaseProperty] = value.trim();
      }
    }
  });

  return styleObject;
}

const nodeTypes = {
  custom: CustomNode,
};
// const nodes = [
//   {
//     id: "0",
//     data: {
//       label: "Unstoppable Mindset and the Journey to Success",
//       onEdit: () => console.log("Edit"),
//       onDelete: () => console.log("Delete"),
//     },
//     position: { x: 0, y: 0 },
//     type: "custom",
//   },

//   // Level 1
//   {
//     id: "1",
//     data: {
//       label: "The Role of Hard Work",
//       onEdit: () => console.log("Edit"),
//       onDelete: () => console.log("Delete"),
//     },
//     position: { x: -300, y: 100 },
//     type: "custom",
//   },
//   {
//     id: "2",
//     data: {
//       label: "Risk and Growth",
//       onEdit: () => console.log("Edit"),
//       onDelete: () => console.log("Delete"),
//     },
//     position: { x: 0, y: 100 },
//     type: "custom",
//   },
//   {
//     id: "3",
//     data: {
//       label: "Conclusion",
//       onEdit: () => console.log("Edit"),
//       onDelete: () => console.log("Delete"),
//     },
//     position: { x: 300, y: 100 },
//     type: "custom",
//   },
//   {
//     id: "4",
//     data: {
//       label: "Overcoming Obstacles",
//       onEdit: () => console.log("Edit"),
//       onDelete: () => console.log("Delete"),
//     },
//     position: { x: -400, y: 200 },
//     type: "custom",
//   },
//   {
//     id: "5",
//     data: {
//       label: "The Importance of Discipline",
//       onEdit: () => console.log("Edit"),
//       onDelete: () => console.log("Delete"),
//     },
//     position: { x: -200, y: 200 },
//     type: "custom",
//   },
//   {
//     id: "6",
//     data: {
//       label: "Introduction",
//       onEdit: () => console.log("Edit"),
//       onDelete: () => console.log("Delete"),
//     },
//     position: { x: 100, y: 200 },
//     type: "custom",
//   },
//   {
//     id: "7",
//     data: {
//       label: "Key Themes",
//       onEdit: () => console.log("Edit"),
//       onDelete: () => console.log("Delete"),
//     },
//     position: { x: -100, y: 300 },
//     type: "custom",
//   },

//   // Sub-nodes (Level 2+)
//   {
//     id: "8",
//     data: {
//       label: "Hard Work is Non-Negotiable",
//       onEdit: () => console.log("Edit"),
//       onDelete: () => console.log("Delete"),
//     },
//     position: { x: -500, y: 250 },
//     type: "custom",
//   },
//   {
//     id: "9",
//     data: {
//       label: "Temporary Imbalance for Greatness",
//       onEdit: () => console.log("Edit"),
//       onDelete: () => console.log("Delete"),
//     },
//     position: { x: -600, y: 300 },
//     type: "custom",
//   },
//   {
//     id: "10",
//     data: {
//       label: "Embracing Challenges",
//       onEdit: () => console.log("Edit"),
//       onDelete: () => console.log("Delete"),
//     },
//     position: { x: -700, y: 350 },
//     type: "custom",
//   },
//   {
//     id: "11",
//     data: {
//       label: "Taking Risks for Growth",
//       onEdit: () => console.log("Edit"),
//       onDelete: () => console.log("Delete"),
//     },
//     position: { x: -100, y: 150 },
//     type: "custom",
//   },
//   {
//     id: "12",
//     data: {
//       label: "True Freedom from Risks",
//       onEdit: () => console.log("Edit"),
//       onDelete: () => console.log("Delete"),
//     },
//     position: { x: 0, y: 150 },
//     type: "custom",
//   },
//   {
//     id: "13",
//     data: {
//       label: "Powerful Message",
//       onEdit: () => console.log("Edit"),
//       onDelete: () => console.log("Delete"),
//     },
//     position: { x: 350, y: 200 },
//     type: "custom",
//   },
//   {
//     id: "14",
//     data: {
//       label: "Encouragement to Strive for Dreams",
//       onEdit: () => console.log("Edit"),
//       onDelete: () => console.log("Delete"),
//     },
//     position: { x: 400, y: 250 },
//     type: "custom",
//   },
//   {
//     id: "15",
//     data: {
//       label: "Personal Anecdotes",
//       onEdit: () => console.log("Edit"),
//       onDelete: () => console.log("Delete"),
//     },
//     position: { x: -200, y: 150 },
//     type: "custom",
//   },
//   {
//     id: "16",
//     data: {
//       label: "Personal Experiences",
//       onEdit: () => console.log("Edit"),
//       onDelete: () => console.log("Delete"),
//     },
//     position: { x: -250, y: 250 },
//     type: "custom",
//   },
//   {
//     id: "17",
//     data: {
//       label: "Discipline Defined",
//       onEdit: () => console.log("Edit"),
//       onDelete: () => console.log("Delete"),
//     },
//     position: { x: -300, y: 350 },
//     type: "custom",
//   },
//   {
//     id: "18",
//     data: {
//       label: "The Journey vs. Destination",
//       onEdit: () => console.log("Edit"),
//       onDelete: () => console.log("Delete"),
//     },
//     position: { x: -200, y: 400 },
//     type: "custom",
//   },
//   {
//     id: "19",
//     data: {
//       label: "Facing Challenges",
//       onEdit: () => console.log("Edit"),
//       onDelete: () => console.log("Delete"),
//     },
//     position: { x: -100, y: 450 },
//     type: "custom",
//   },
//   {
//     id: "20",
//     data: {
//       label: "Work Ethic",
//       onEdit: () => console.log("Edit"),
//       onDelete: () => console.log("Delete"),
//     },
//     position: { x: 0, y: 500 },
//     type: "custom",
//   },
//   {
//     id: "21",
//     data: {
//       label: "Self-Validation",
//       onEdit: () => console.log("Edit"),
//       onDelete: () => console.log("Delete"),
//     },
//     position: { x: 100, y: 550 },
//     type: "custom",
//   },
//   {
//     id: "22",
//     data: {
//       label: "Hard Work in Tough Times",
//       onEdit: () => console.log("Edit"),
//       onDelete: () => console.log("Delete"),
//     },
//     position: { x: -200, y: 600 },
//     type: "custom",
//   },
//   {
//     id: "23",
//     data: {
//       label: "The “S. Loser” Mindset",
//       onEdit: () => console.log("Edit"),
//       onDelete: () => console.log("Delete"),
//     },
//     position: { x: -100, y: 650 },
//     type: "custom",
//   },
//   {
//     id: "24",
//     data: {
//       label: "Overcome Adversity",
//       onEdit: () => console.log("Edit"),
//       onDelete: () => console.log("Delete"),
//     },
//     position: { x: 0, y: 700 },
//     type: "custom",
//   },
//   {
//     id: "25",
//     data: {
//       label: "Outwork Yourself",
//       onEdit: () => console.log("Edit"),
//       onDelete: () => console.log("Delete"),
//     },
//     position: { x: 100, y: 750 },
//     type: "custom",
//   },
//   {
//     id: "26",
//     data: {
//       label: "Avoid Public Validation",
//       onEdit: () => console.log("Edit"),
//       onDelete: () => console.log("Delete"),
//     },
//     position: { x: 200, y: 800 },
//     type: "custom",
//   },
// ];

const nodes = [
  {
    id: "0",
    data: {
      label: "Unstoppable Mindset and the Journey to Success",
      onEdit: () => console.log("Edit"),
      onDelete: () => console.log("Delete"),
    },
    position: { x: 0, y: 0 },
    type: "custom",
  },

  // Level 1
  {
    id: "1",
    data: {
      label: "The Role of Hard Work",
      onEdit: () => console.log("Edit"),
      onDelete: () => console.log("Delete"),
    },
    position: { x: -300, y: 100 },
    type: "custom",
  },
  { id: "2", data: { label: "Risk and Growth" }, position: { x: 0, y: 100 } },
  { id: "3", data: { label: "Conclusion" }, position: { x: 300, y: 100 } },
  {
    id: "4",
    data: { label: "Overcoming Obstacles" },
    position: { x: -400, y: 200 },
  },
  {
    id: "5",
    data: { label: "The Importance of Discipline" },
    position: { x: -200, y: 200 },
  },
  { id: "6", data: { label: "Introduction" }, position: { x: 100, y: 200 } },
  { id: "7", data: { label: "Key Themes" }, position: { x: -100, y: 300 } },

  // Sub-nodes (Level 2+)
  {
    id: "8",
    data: { label: "Hard Work is Non-Negotiable" },
    position: { x: -500, y: 250 },
  },
  {
    id: "9",
    data: { label: "Temporary Imbalance for Greatness" },
    position: { x: -600, y: 300 },
  },
  {
    id: "10",
    data: { label: "Embracing Challenges" },
    position: { x: -700, y: 350 },
  },

  {
    id: "11",
    data: { label: "Taking Risks for Growth" },
    position: { x: -100, y: 150 },
  },
  {
    id: "12",
    data: { label: "True Freedom from Risks" },
    position: { x: 0, y: 150 },
  },

  {
    id: "13",
    data: { label: "Powerful Message" },
    position: { x: 350, y: 200 },
  },
  {
    id: "14",
    data: { label: "Encouragement to Strive for Dreams" },
    position: { x: 400, y: 250 },
  },

  {
    id: "15",
    data: { label: "Personal Anecdotes" },
    position: { x: -200, y: 150 },
  },
  {
    id: "16",
    data: { label: "Personal Experiences" },
    position: { x: -250, y: 250 },
  },

  {
    id: "17",
    data: { label: "Discipline Defined" },
    position: { x: -300, y: 350 },
  },
  {
    id: "18",
    data: { label: "The Journey vs. Destination" },
    position: { x: -200, y: 400 },
  },
  {
    id: "19",
    data: { label: "Facing Challenges" },
    position: { x: -100, y: 450 },
  },
  { id: "20", data: { label: "Work Ethic" }, position: { x: 0, y: 500 } },
  {
    id: "21",
    data: { label: "Self-Validation" },
    position: { x: 100, y: 550 },
  },

  // Level 3 / Examples / Deep Leaves
  {
    id: "22",
    data: { label: "Hard Work in Tough Times" },
    position: { x: -200, y: 600 },
  },
  {
    id: "23",
    data: { label: "The “S. Loser” Mindset" },
    position: { x: -100, y: 650 },
  },
  {
    id: "24",
    data: { label: "Overcome Adversity" },
    position: { x: 0, y: 700 },
  },
  {
    id: "25",
    data: { label: "Outwork Yourself" },
    position: { x: 100, y: 750 },
  },
  {
    id: "26",
    data: { label: "Avoid Public Validation" },
    position: { x: 200, y: 800 },
  },
];
const edges = [
  // Level 1
  { id: "e0-1", source: "0", target: "1" },
  { id: "e0-2", source: "0", target: "2" },
  { id: "e0-3", source: "0", target: "3" },
  { id: "e0-4", source: "0", target: "4" },
  { id: "e0-5", source: "0", target: "5" },
  { id: "e0-6", source: "0", target: "6" },
  { id: "e0-7", source: "0", target: "7" },

  // The Role of Hard Work
  { id: "e1-8", source: "1", target: "8" },
  { id: "e8-9", source: "8", target: "9" },
  { id: "e9-10", source: "9", target: "10" },
  { id: "e1-15", source: "1", target: "15" },

  // Risk and Growth
  { id: "e2-11", source: "2", target: "11" },
  { id: "e2-12", source: "2", target: "12" },

  // Conclusion
  { id: "e3-13", source: "3", target: "13" },
  { id: "e3-14", source: "3", target: "14" },

  // Overcoming Obstacles
  { id: "e4-10", source: "4", target: "10" },

  // Importance of Discipline
  { id: "e5-16", source: "5", target: "16" },
  { id: "e5-17", source: "5", target: "17" },

  // Key Themes
  { id: "e7-18", source: "7", target: "18" },
  { id: "e7-19", source: "7", target: "19" },
  { id: "e7-20", source: "7", target: "20" },
  { id: "e7-21", source: "7", target: "21" },

  // Leaves
  { id: "e18-22", source: "18", target: "22" },
  { id: "e18-23", source: "18", target: "23" },
  { id: "e19-24", source: "19", target: "24" },
  { id: "e20-25", source: "20", target: "25" },
  { id: "e21-26", source: "21", target: "26" },
];

export default function MindMap() {
  const router = useRouter();
  const handleClick = (path: string) => {
    if (window.location.pathname !== path) {
      router.push(path);
    }
  };
  useEffect(() => {}, []);
  return (
    <div className="w-[100vw] h-[100vh]">
      <div style={{ width: "100%", height: "600px" }}>
        <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
          <Background></Background>
          <Controls></Controls>
        </ReactFlow>
      </div>
      <div className="floatingedges">
        <div
          contentEditable="false"
          className="react-flow light"
          data-testid="rf__wrapper"
          style={convertStyleStringToObject(
            "background-color: rgb(242, 242, 247); width: 100%; height: 100%; overflow: hidden; position: relative; z-index: 0;"
          )}
        >
          <div
            className="react-flow__renderer"
            style={convertStyleStringToObject(
              "position: absolute; width: 100%; height: 100%; top: 0px; left: 0px;"
            )}
          >
            <div
              className="react-flow__pane draggable"
              style={convertStyleStringToObject(
                "position: absolute; width: 100%; height: 100%; top: 0px; left: 0px;"
              )}
            >
              <div
                className="react-flow__viewport xyflow__viewport react-flow__container"
                style={convertStyleStringToObject(
                  "transform: translate(227.585px, -67.1002px) scale(0.690315);"
                )}
              >
                <div className="react-flow__edges">
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="2-1"
                      data-testid="rf__edge-2-1"
                      aria-label="Edge from 1 to 2"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="2-1"
                        className="react-flow__edge-path"
                        d="M1144,536.2513668853915 C1157.2704858682089,536.2513668853915 1170.5409717364178,541.2640573544516 1170.5409717364178,546.2767478235116"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(196, 181, 253);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="3-1"
                      data-testid="rf__edge-3-1"
                      aria-label="Edge from 1 to 3"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="3-1"
                        className="react-flow__edge-path"
                        d="M1059.492888154531,543.5 C1059.492888154531,598.9927912181823 1079.2929490107495,598.9927912181823 1079.2929490107495,654.4855824363647"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(196, 181, 253);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="4-3"
                      data-testid="rf__edge-4-3"
                      aria-label="Edge from 3 to 4"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="4-3"
                        className="react-flow__edge-path"
                        d="M1105.3023581872865,690.4855824363647 C1105.3023581872865,741.9074419624428 1235.5606211848174,741.9074419624428 1235.5606211848174,793.3293014885211"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(253, 164, 175);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="5-4"
                      data-testid="rf__edge-5-4"
                      aria-label="Edge from 4 to 5"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="5-4"
                        className="react-flow__edge-path"
                        d="M1275.5321531848786,829.3293014885211 C1275.5321531848786,884.4547151476224 1380.7197762087108,884.4547151476224 1380.7197762087108,939.5801288067238"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(134, 239, 172);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="6-4"
                      data-testid="rf__edge-6-4"
                      aria-label="Edge from 4 to 6"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="6-4"
                        className="react-flow__edge-path"
                        d="M1270.5863222067205,829.3293014885211 C1270.5863222067205,894.7866268606513 1359.5175872310047,894.7866268606513 1359.5175872310047,960.2439522327816"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(134, 239, 172);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="7-4"
                      data-testid="rf__edge-7-4"
                      aria-label="Edge from 4 to 7"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="7-4"
                        className="react-flow__edge-path"
                        d="M1266.0748863148974,829.3293014885211 C1266.0748863148974,904.2222718795922 1330.2839062659436,904.2222718795922 1330.2839062659436,979.1152422706632"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(134, 239, 172);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="8-3"
                      data-testid="rf__edge-8-3"
                      aria-label="Edge from 3 to 8"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="8-3"
                        className="react-flow__edge-path"
                        d="M1094.2426429427444,690.4855824363647 C1094.2426429427444,758.8983457284725 1183.4715565100878,758.8983457284725 1183.4715565100878,827.3111090205803"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(253, 164, 175);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="9-8"
                      data-testid="rf__edge-9-8"
                      aria-label="Edge from 8 to 9"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="9-8"
                        className="react-flow__edge-path"
                        d="M1207.0643964296926,863.3111090205803 C1207.0643964296926,929.7187768101912 1294.5335052212563,929.7187768101912 1294.5335052212563,996.1264445998021"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(134, 239, 172);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="10-8"
                      data-testid="rf__edge-10-8"
                      aria-label="Edge from 8 to 10"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="10-8"
                        className="react-flow__edge-path"
                        d="M1203.4350999623537,863.3111090205803 C1203.4350999623537,937.2638862757253 1271.0204387466897,937.2638862757253 1271.0204387466897,1011.2166635308704"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(134, 239, 172);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="11-8"
                      data-testid="rf__edge-11-8"
                      aria-label="Edge from 8 to 11"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="11-8"
                        className="react-flow__edge-path"
                        d="M1200.0084859313924,863.3111090205803 C1200.0084859313924,943.821494508561 1242.9337006766398,943.821494508561 1242.9337006766398,1024.3318799965418"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(134, 239, 172);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="12-3"
                      data-testid="rf__edge-12-3"
                      aria-label="Edge from 3 to 12"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="12-3"
                        className="react-flow__edge-path"
                        d="M1086.6125693302854,690.4855824363647 C1086.6125693302854,769.9783736545471 1122.8999910435032,769.9783736545471 1122.8999910435032,849.4711648727294"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(253, 164, 175);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="13-12"
                      data-testid="rf__edge-13-12"
                      aria-label="Edge from 12 to 13"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="13-12"
                        className="react-flow__edge-path"
                        d="M1134.9214340053247,885.4711648727294 C1134.9214340053247,960.4481548992314 1200.843373160803,960.4481548992314 1200.843373160803,1035.4251449257333"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(134, 239, 172);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="14-12"
                      data-testid="rf__edge-14-12"
                      aria-label="Edge from 12 to 14"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="14-12"
                        className="react-flow__edge-path"
                        d="M1131.393699674632,885.4711648727294 C1131.393699674632,964.9639560909118 1170.1272342816824,964.9639560909118 1170.1272342816824,1044.4567473090942"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(134, 239, 172);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="15-12"
                      data-testid="rf__edge-15-12"
                      aria-label="Edge from 12 to 15"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="15-12"
                        className="react-flow__edge-path"
                        d="M1127.8358303871269,885.4711648727294 C1127.8358303871269,968.4327606134211 1135.4632900444817,968.4327606134211 1135.4632900444817,1051.394356354113"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(134, 239, 172);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="16-3"
                      data-testid="rf__edge-16-3"
                      aria-label="Edge from 3 to 16"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="16-3"
                        className="react-flow__edge-path"
                        d="M1080.1678164168666,690.4855824363647 C1080.1678164168666,774.7914045264453 1058.2823025146022,774.7914045264453 1058.2823025146022,859.0972266165259"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(253, 164, 175);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="17-16"
                      data-testid="rf__edge-17-16"
                      aria-label="Edge from 16 to 17"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="17-16"
                        className="react-flow__edge-path"
                        d="M1059.912893392915,895.0972266165259 C1059.912893392915,976.0909015068346 1095.612756726735,976.0909015068346 1095.612756726735,1057.0845763971433"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(134, 239, 172);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="18-16"
                      data-testid="rf__edge-18-16"
                      aria-label="Edge from 16 to 18"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="18-16"
                        className="react-flow__edge-path"
                        d="M1054.3340443750321,895.0972266165259 C1054.3340443750321,977.2986133082629 1039.6118877651738,977.2986133082629 1039.6118877651738,1059.5"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(134, 239, 172);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="19-3"
                      data-testid="rf__edge-19-3"
                      aria-label="Edge from 3 to 19"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="19-3"
                        className="react-flow__edge-path"
                        d="M1074.9942647693454,690.4855824363647 C1074.9942647693454,773.1827435717693 1005.9887945959204,773.1827435717693 1005.9887945959204,855.8799047071739"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(253, 164, 175);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="20-19"
                      data-testid="rf__edge-20-19"
                      aria-label="Edge from 19 to 20"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="20-19"
                        className="react-flow__edge-path"
                        d="M994.2941302846292,911.8799047071739 C994.2941302846292,984.4822405521586 994.2289780462484,984.4822405521586 994.2289780462484,1057.0845763971433"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(134, 239, 172);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="21-19"
                      data-testid="rf__edge-21-19"
                      aria-label="Edge from 19 to 21"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="21-19"
                        className="react-flow__edge-path"
                        d="M986.5927033003226,911.8799047071739 C986.5927033003226,980.8688289331758 948.5798534934331,980.8688289331758 948.5798534934331,1049.8577531591777"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(134, 239, 172);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="22-1"
                      data-testid="rf__edge-22-1"
                      aria-label="Edge from 1 to 22"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="22-1"
                        className="react-flow__edge-path"
                        d="M1014.0323456552363,543.5 C1014.0323456552363,579.683148246803 948.613809191429,579.683148246803 948.613809191429,615.8662964936059"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(196, 181, 253);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="23-22"
                      data-testid="rf__edge-23-22"
                      aria-label="Edge from 22 to 23"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="23-22"
                        className="react-flow__edge-path"
                        d="M914.8083566835274,671.8662964936059 C914.8083566835274,745.8769218272868 869.9067291031577,745.8769218272868 869.9067291031577,819.8875471609676"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(253, 164, 175);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="24-22"
                      data-testid="rf__edge-24-22"
                      aria-label="Edge from 22 to 24"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="24-22"
                        className="react-flow__edge-path"
                        d="M857.8679278601226,671.8662964936059 C857.8679278601226,690.3811086185497 771.3321931494435,690.3811086185497 771.3321931494435,708.8959207434933"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(253, 164, 175);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="25-1"
                      data-testid="rf__edge-25-1"
                      aria-label="Edge from 1 to 25"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="25-1"
                        className="react-flow__edge-path"
                        d="M960,490.78155339805824 C946,490.78155339805824 946,487.5194174757282 932,487.5194174757282"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(196, 181, 253);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="26-25"
                      data-testid="rf__edge-26-25"
                      aria-label="Edge from 25 to 26"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="26-25"
                        className="react-flow__edge-path"
                        d="M807.380251886953,495.5 C807.380251886953,522.0041867912629 693.6485832403175,522.0041867912629 693.6485832403175,548.5083735825258"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(253, 164, 175);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="27-25"
                      data-testid="rf__edge-27-25"
                      aria-label="Edge from 25 to 27"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="27-25"
                        className="react-flow__edge-path"
                        d="M803.1756661441078,459.5 C803.1756661441078,442.99581320873716 724.6444655697694,442.99581320873716 724.6444655697694,426.4916264174743"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(253, 164, 175);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="28-1"
                      data-testid="rf__edge-28-1"
                      aria-label="Edge from 1 to 28"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="28-1"
                        className="react-flow__edge-path"
                        d="M1021.2164531647397,459.5 C1021.2164531647397,399.31685175319706 932.9949882719362,399.31685175319706 932.9949882719362,339.13370350639406"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(196, 181, 253);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="29-28"
                      data-testid="rf__edge-29-28"
                      aria-label="Edge from 28 to 29"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="29-28"
                        className="react-flow__edge-path"
                        d="M879.7967593793442,303.13370350639406 C879.7967593793442,284.6188913814502 797.4978429555357,284.6188913814502 797.4978429555357,266.10407925650645"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(253, 164, 175);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="30-28"
                      data-testid="rf__edge-30-28"
                      aria-label="Edge from 28 to 30"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="30-28"
                        className="react-flow__edge-path"
                        d="M914.9182364376753,303.13370350639406 C914.9182364376753,219.12307817271312 869.330307543555,219.12307817271312 869.330307543555,135.1124528390322"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(253, 164, 175);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="31-1"
                      data-testid="rf__edge-31-1"
                      aria-label="Edge from 1 to 31"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="31-1"
                        className="react-flow__edge-path"
                        d="M1057.8505031745885,459.5 C1057.8505031745885,380.00720878181767 1079.9968282878679,380.00720878181767 1079.9968282878679,300.51441756363533"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(196, 181, 253);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="32-31"
                      data-testid="rf__edge-32-31"
                      aria-label="Edge from 31 to 32"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="32-31"
                        className="react-flow__edge-path"
                        d="M1079.3194204032084,264.51441756363533 C1079.3194204032084,190.00720878181767 1052.954081048085,190.00720878181767 1052.954081048085,115.5"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(253, 164, 175);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="33-31"
                      data-testid="rf__edge-33-31"
                      aria-label="Edge from 31 to 33"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="33-31"
                        className="react-flow__edge-path"
                        d="M1098.6100807150574,264.51441756363533 C1098.6100807150574,209.8134352013339 1196.4998828766768,209.8134352013339 1196.4998828766768,155.11245283903247"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(253, 164, 175);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="34-1"
                      data-testid="rf__edge-34-1"
                      aria-label="Edge from 1 to 34"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="34-1"
                        className="react-flow__edge-path"
                        d="M1115.0108630874504,459.5 C1115.0108630874504,434.1116260882442 1191.1891179715765,434.1116260882442 1191.1891179715765,408.72325217648836"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(196, 181, 253);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="35-34"
                      data-testid="rf__edge-35-34"
                      aria-label="Edge from 34 to 35"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="35-34"
                        className="react-flow__edge-path"
                        d="M1232.8642377482915,372.72325217648836 C1232.8642377482915,309.41366571649746 1336.0621288194043,309.41366571649746 1336.0621288194043,246.1040792565065"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(253, 164, 175);"
                        )}
                      ></path>
                    </g>
                  </svg>
                  <svg style={convertStyleStringToObject("z-index: 0;")}>
                    <g
                      className="react-flow__edge react-flow__edge-floating nopan selectable"
                      role="button"
                      data-id="36-34"
                      data-testid="rf__edge-36-34"
                      aria-label="Edge from 34 to 36"
                      aria-describedby="react-flow__edge-desc-1"
                    >
                      <path
                        id="36-34"
                        className="react-flow__edge-path"
                        d="M1296.1937735804838,393.48028367656275 C1323.0824692266065,393.48028367656275 1323.0824692266065,395.38112934046717 1349.9711648727293,395.38112934046717"
                        style={convertStyleStringToObject(
                          "stroke-width: 2; stroke: rgb(253, 164, 175);"
                        )}
                      ></path>
                    </g>
                  </svg>
                </div>
                <div className="react-flow__edgelabel-renderer"></div>
                <div
                  className="react-flow__nodes"
                  style={convertStyleStringToObject(
                    "position: absolute; width: 100%; height: 100%; top: 0px; left: 0px;"
                  )}
                >
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="1"
                    data-testid="rf__node-1"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(960px, 459.5px); pointer-events: all; visibility: visible; border: 2px solid rgb(193, 198, 215); padding: 10px; border-radius: 8px; background-color: rgb(242, 242, 247); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Unstoppable Mindset and the Journey to Success
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">🧠</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="1"
                      data-handlepos="top"
                      data-id="1-1-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="1"
                      data-handlepos="right"
                      data-id="1-1-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="2"
                    data-testid="rf__node-2"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(1140.19px, 546.277px); pointer-events: all; visibility: visible; border-radius: 8px; border: none; padding: 8px; font-size: 16px; background-color: rgb(196, 181, 253); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Introduction
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">📖</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r2o:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="2"
                      data-handlepos="top"
                      data-id="1-2-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="2"
                      data-handlepos="right"
                      data-id="1-2-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="3"
                    data-testid="rf__node-3"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(1004.5px, 654.486px); pointer-events: all; visibility: visible; border-radius: 8px; border: none; padding: 8px; font-size: 16px; background-color: rgb(196, 181, 253); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Key Themes
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">💡</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r2r:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="3"
                      data-handlepos="top"
                      data-id="1-3-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="3"
                      data-handlepos="right"
                      data-id="1-3-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="4"
                    data-testid="rf__node-4"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(1180.36px, 793.329px); pointer-events: all; visibility: visible; border-radius: 50px; border: none; padding: 8px; font-size: 14px; background-color: rgb(253, 164, 175); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Self-Validation
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">✅</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r2u:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="4"
                      data-handlepos="top"
                      data-id="1-4-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="4"
                      data-handlepos="right"
                      data-id="1-4-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="5"
                    data-testid="rf__node-5"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(1319.89px, 939.58px); pointer-events: all; visibility: visible; border-radius: 50px; border: none; padding: 8px; font-size: 12px; background-color: rgb(134, 239, 172); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Proving oneself
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">🔍</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r31:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="5"
                      data-handlepos="top"
                      data-id="1-5-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="5"
                      data-handlepos="right"
                      data-id="1-5-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="6"
                    data-testid="rf__node-6"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(1290.54px, 960.244px); pointer-events: all; visibility: visible; border-radius: 50px; border: none; padding: 8px; font-size: 12px; background-color: rgb(134, 239, 172); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Fear of Public Humiliation
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">😨</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r34:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="6"
                      data-handlepos="top"
                      data-id="1-6-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="6"
                      data-handlepos="right"
                      data-id="1-6-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="7"
                    data-testid="rf__node-7"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(1260px, 979.115px); pointer-events: all; visibility: visible; border-radius: 50px; border: none; padding: 8px; font-size: 12px; background-color: rgb(134, 239, 172); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Winning Mindset
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">🏆</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r37:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="7"
                      data-handlepos="top"
                      data-id="1-7-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="7"
                      data-handlepos="right"
                      data-id="1-7-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="8"
                    data-testid="rf__node-8"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(1117.21px, 827.311px); pointer-events: all; visibility: visible; border-radius: 50px; border: none; padding: 8px; font-size: 14px; background-color: rgb(253, 164, 175); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Facing Challenges
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">⚔️</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r3a:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="8"
                      data-handlepos="top"
                      data-id="1-8-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="8"
                      data-handlepos="right"
                      data-id="1-8-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="9"
                    data-testid="rf__node-9"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(1228.39px, 996.126px); pointer-events: all; visibility: visible; border-radius: 50px; border: none; padding: 8px; font-size: 12px; background-color: rgb(134, 239, 172); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Combatting Demons
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">👹</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r3d:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="9"
                      data-handlepos="top"
                      data-id="1-9-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="9"
                      data-handlepos="right"
                      data-id="1-9-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="10"
                    data-testid="rf__node-10"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(1195.82px, 1011.22px); pointer-events: all; visibility: visible; border-radius: 50px; border: none; padding: 8px; font-size: 12px; background-color: rgb(134, 239, 172); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Pushing Through Tiredness
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">💪</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r3g:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="10"
                      data-handlepos="top"
                      data-id="1-10-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="10"
                      data-handlepos="right"
                      data-id="1-10-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="11"
                    data-testid="rf__node-11"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(1162.4px, 1024.33px); pointer-events: all; visibility: visible; border-radius: 50px; border: none; padding: 8px; font-size: 12px; background-color: rgb(134, 239, 172); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Continuous Improvement
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">🔄</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r3j:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="11"
                      data-handlepos="top"
                      data-id="1-11-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="11"
                      data-handlepos="right"
                      data-id="1-11-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="12"
                    data-testid="rf__node-12"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(1049.01px, 849.471px); pointer-events: all; visibility: visible; border-radius: 50px; border: none; padding: 8px; font-size: 14px; background-color: rgb(253, 164, 175); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Work Ethic
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">🏋️‍♂️</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r3m:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="12"
                      data-handlepos="top"
                      data-id="1-12-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="12"
                      data-handlepos="right"
                      data-id="1-12-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="13"
                    data-testid="rf__node-13"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(1128.26px, 1035.43px); pointer-events: all; visibility: visible; border-radius: 50px; border: none; padding: 8px; font-size: 12px; background-color: rgb(134, 239, 172); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Hard Work Necessity
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">🔥</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r3p:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="13"
                      data-handlepos="top"
                      data-id="1-13-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="13"
                      data-handlepos="right"
                      data-id="1-13-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="14"
                    data-testid="rf__node-14"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(1093.51px, 1044.46px); pointer-events: all; visibility: visible; border-radius: 50px; border: none; padding: 8px; font-size: 12px; background-color: rgb(134, 239, 172); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Unstoppable Mindset
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">🚀</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r3s:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="14"
                      data-handlepos="top"
                      data-id="1-14-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="14"
                      data-handlepos="right"
                      data-id="1-14-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="15"
                    data-testid="rf__node-15"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(1058.29px, 1051.39px); pointer-events: all; visibility: visible; border-radius: 50px; border: none; padding: 8px; font-size: 12px; background-color: rgb(134, 239, 172); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Refusal to Stop
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">🏁</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r3v:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="15"
                      data-handlepos="top"
                      data-id="1-15-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="15"
                      data-handlepos="right"
                      data-id="1-15-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="16"
                    data-testid="rf__node-16"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(977.946px, 859.097px); pointer-events: all; visibility: visible; border-radius: 50px; border: none; padding: 8px; font-size: 14px; background-color: rgb(253, 164, 175); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Mindset Differences
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">🧗‍♂️</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r42:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="16"
                      data-handlepos="top"
                      data-id="1-16-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="16"
                      data-handlepos="right"
                      data-id="1-16-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="17"
                    data-testid="rf__node-17"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(1013.78px, 1057.08px); pointer-events: all; visibility: visible; border-radius: 50px; border: none; padding: 8px; font-size: 12px; background-color: rgb(134, 239, 172); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Champion vs. Loser Mindset
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">🏆</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r45:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="17"
                      data-handlepos="top"
                      data-id="1-17-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="17"
                      data-handlepos="right"
                      data-id="1-17-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="18"
                    data-testid="rf__node-18"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(960px, 1059.5px); pointer-events: all; visibility: visible; border-radius: 50px; border: none; padding: 8px; font-size: 12px; background-color: rgb(134, 239, 172); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Killer Mindset
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">💥</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r48:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="18"
                      data-handlepos="top"
                      data-id="1-18-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="18"
                      data-handlepos="right"
                      data-id="1-18-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="19"
                    data-testid="rf__node-19"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(906.307px, 855.88px); pointer-events: all; visibility: visible; border-radius: 50px; border: none; padding: 8px; font-size: 14px; background-color: rgb(253, 164, 175); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          The Journey vs. Destination
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">🛤️</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r4b:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="19"
                      data-handlepos="top"
                      data-id="1-19-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="19"
                      data-handlepos="right"
                      data-id="1-19-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="20"
                    data-testid="rf__node-20"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(906.216px, 1057.08px); pointer-events: all; visibility: visible; border-radius: 50px; border: none; padding: 8px; font-size: 12px; background-color: rgb(134, 239, 172); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Importance of the Journey
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">🛣️</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r4e:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="20"
                      data-handlepos="top"
                      data-id="1-20-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="20"
                      data-handlepos="right"
                      data-id="1-20-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="21"
                    data-testid="rf__node-21"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(852.866px, 1049.86px); pointer-events: all; visibility: visible; border-radius: 50px; border: none; padding: 8px; font-size: 12px; background-color: rgb(134, 239, 172); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Hard Work in Tough Times
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">⏳</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r4h:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="21"
                      data-handlepos="top"
                      data-id="1-21-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="21"
                      data-handlepos="right"
                      data-id="1-21-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="22"
                    data-testid="rf__node-22"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(835.302px, 615.866px); pointer-events: all; visibility: visible; border-radius: 8px; border: none; padding: 8px; font-size: 16px; background-color: rgb(196, 181, 253); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          The Importance of Discipline
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">📏</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r4k:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="22"
                      data-handlepos="top"
                      data-id="1-22-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="22"
                      data-handlepos="right"
                      data-id="1-22-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="23"
                    data-testid="rf__node-23"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(786.447px, 819.888px); pointer-events: all; visibility: visible; border-radius: 50px; border: none; padding: 8px; font-size: 14px; background-color: rgb(253, 164, 175); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Discipline Defined
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">🕰️</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r4n:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="23"
                      data-handlepos="top"
                      data-id="1-23-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="23"
                      data-handlepos="right"
                      data-id="1-23-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="24"
                    data-testid="rf__node-24"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(647.267px, 708.896px); pointer-events: all; visibility: visible; border-radius: 50px; border: none; padding: 8px; font-size: 14px; background-color: rgb(253, 164, 175); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Personal Experiences
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">🌅</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r4q:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="24"
                      data-handlepos="top"
                      data-id="1-24-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="24"
                      data-handlepos="right"
                      data-id="1-24-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="25"
                    data-testid="rf__node-25"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(760px, 459.5px); pointer-events: all; visibility: visible; border-radius: 8px; border: none; padding: 8px; font-size: 16px; background-color: rgb(196, 181, 253); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Overcoming Obstacles
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">🧗‍♀️</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r4t:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="25"
                      data-handlepos="top"
                      data-id="1-25-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="25"
                      data-handlepos="right"
                      data-id="1-25-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="26"
                    data-testid="rf__node-26"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(570.029px, 548.508px); pointer-events: all; visibility: visible; border-radius: 50px; border: none; padding: 8px; font-size: 14px; background-color: rgb(253, 164, 175); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Embracing Challenges
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">🌱</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r50:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="26"
                      data-handlepos="top"
                      data-id="1-26-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="26"
                      data-handlepos="right"
                      data-id="1-26-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="27"
                    data-testid="rf__node-27"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(570.029px, 370.492px); pointer-events: all; visibility: visible; border-radius: 50px; border: none; padding: 8px; font-size: 14px; background-color: rgb(253, 164, 175); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Temporary Imbalance for Greatness
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">⚖️</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r53:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="27"
                      data-handlepos="top"
                      data-id="1-27-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="27"
                      data-handlepos="right"
                      data-id="1-27-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="28"
                    data-testid="rf__node-28"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(835.302px, 303.134px); pointer-events: all; visibility: visible; border-radius: 8px; border: none; padding: 8px; font-size: 16px; background-color: rgb(196, 181, 253); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          The Role of Hard Work
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">💼</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r56:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="28"
                      data-handlepos="top"
                      data-id="1-28-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="28"
                      data-handlepos="right"
                      data-id="1-28-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="29"
                    data-testid="rf__node-29"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(647.267px, 210.104px); pointer-events: all; visibility: visible; border-radius: 50px; border: none; padding: 8px; font-size: 14px; background-color: rgb(253, 164, 175); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Hard Work is Non-Negotiable
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">🔑</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r59:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="29"
                      data-handlepos="top"
                      data-id="1-29-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="29"
                      data-handlepos="right"
                      data-id="1-29-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="30"
                    data-testid="rf__node-30"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(786.447px, 99.1125px); pointer-events: all; visibility: visible; border-radius: 50px; border: none; padding: 8px; font-size: 14px; background-color: rgb(253, 164, 175); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Personal Anecdotes
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">🏅</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r5c:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="30"
                      data-handlepos="top"
                      data-id="1-30-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="30"
                      data-handlepos="right"
                      data-id="1-30-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="31"
                    data-testid="rf__node-31"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(1004.5px, 264.514px); pointer-events: all; visibility: visible; border-radius: 8px; border: none; padding: 8px; font-size: 16px; background-color: rgb(196, 181, 253); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Risk and Growth
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">⚠️</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r5f:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="31"
                      data-handlepos="top"
                      data-id="1-31-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="31"
                      data-handlepos="right"
                      data-id="1-31-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="32"
                    data-testid="rf__node-32"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(960px, 59.5px); pointer-events: all; visibility: visible; border-radius: 50px; border: none; padding: 8px; font-size: 14px; background-color: rgb(253, 164, 175); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Taking Risks for Growth
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">📈</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r5i:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="32"
                      data-handlepos="top"
                      data-id="1-32-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="32"
                      data-handlepos="right"
                      data-id="1-32-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="33"
                    data-testid="rf__node-33"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(1133.55px, 99.1125px); pointer-events: all; visibility: visible; border-radius: 50px; border: none; padding: 8px; font-size: 14px; background-color: rgb(253, 164, 175); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          True Freedom from Risks
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">🕊️</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r5l:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="33"
                      data-handlepos="top"
                      data-id="1-33-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="33"
                      data-handlepos="right"
                      data-id="1-33-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="34"
                    data-testid="rf__node-34"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(1140.19px, 372.723px); pointer-events: all; visibility: visible; border-radius: 8px; border: none; padding: 8px; font-size: 16px; background-color: rgb(196, 181, 253); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Conclusion
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">🔚</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r5o:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="34"
                      data-handlepos="top"
                      data-id="1-34-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="34"
                      data-handlepos="right"
                      data-id="1-34-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="35"
                    data-testid="rf__node-35"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(1272.73px, 210.104px); pointer-events: all; visibility: visible; border-radius: 50px; border: none; padding: 8px; font-size: 14px; background-color: rgb(253, 164, 175); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Powerful Message
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">🎯</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r5r:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="35"
                      data-handlepos="top"
                      data-id="1-35-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="35"
                      data-handlepos="right"
                      data-id="1-35-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                  <div
                    className="react-flow__node react-flow__node-mindMap nopan selectable draggable"
                    data-id="36"
                    data-testid="rf__node-36"
                    role="button"
                    aria-describedby="react-flow__node-desc-1"
                    style={convertStyleStringToObject(
                      "z-index: 0; transform: translate(1349.97px, 370.492px); pointer-events: all; visibility: visible; border-radius: 50px; border: none; padding: 8px; font-size: 14px; background-color: rgb(253, 164, 175); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 justify-center min-w-[140px] max-w-[160px] w-full transition-all duration-200 active:scale-110">
                      <div className="flex items-center justify-between gap-1 w-full">
                        <p className="flex-1 font-bold text-sm text-center dark:text-black">
                          Encouragement to Strive for Dreams
                        </p>
                      </div>
                    </div>
                    <div className="w-full absolute -top-6 left-0 flex justify-center">
                      <div className=" h-8 w-8 shadow-md rounded-full flex items-center justify-center bg-white border-1 border-gray-200">
                        <p className="text-sm ml-[2px] text-center">🌟</p>
                      </div>
                    </div>
                    <div className="w-full absolute -bottom-10 left-0 flex justify-center gap-2 transition-all duration-300 opacity-100 translate-y-0">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-plus size-5"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 size-8">
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-8"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r5u:"
                        data-state="closed"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div
                      data-handleid="a"
                      data-nodeid="36"
                      data-handlepos="top"
                      data-id="1-36-a-target"
                      className="react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator"
                    ></div>
                    <div
                      data-handleid="b"
                      data-nodeid="36"
                      data-handlepos="right"
                      data-id="1-36-b-source"
                      className="react-flow__handle react-flow__handle-right nodrag nopan source connectable connectablestart connectableend connectionindicator"
                    ></div>
                  </div>
                </div>
                <div className="react-flow__viewport-portal"></div>
              </div>
            </div>
          </div>
          <div
            className="react-flow__panel react-flow__attribution bottom right"
            data-message="Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev"
            style={convertStyleStringToObject("pointer-events: all;")}
          >
            <a
              href="https://reactflow.dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="React Flow attribution"
            >
              React Flow
            </a>
          </div>
          <div
            id="react-flow__node-desc-1"
            style={convertStyleStringToObject("display: none;")}
          >
            Press enter or space to select a node.You can then use the arrow
            keys to move the node around. Press delete to remove it and escape
            to cancel.{" "}
          </div>
          <div
            id="react-flow__edge-desc-1"
            style={convertStyleStringToObject("display: none;")}
          >
            Press enter or space to select an edge. You can then press delete to
            remove it or escape to cancel.
          </div>
          <div
            id="react-flow__aria-live-1"
            aria-live="assertive"
            aria-atomic="true"
            style={convertStyleStringToObject(
              "position: absolute; width: 1px; height: 1px; margin: -1px; border: 0px; padding: 0px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); clip-path: inset(100%);"
            )}
          ></div>
        </div>
        <div className="absolute top-10 left-10">
          <button
            onClick={() => handleClick("/dashboard")}
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 active:bg-primary/50 gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-arrow-left size-4"
            >
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
            <p>Back</p>
          </button>
        </div>
        <div className="absolute top-10 right-10">
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 active:bg-primary/50 gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-download size-4"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" x2="12" y1="15" y2="3"></line>
            </svg>
            <p>Download</p>
          </button>
        </div>
        <div className="absolute w-fit gap-2 rounded-lg bg-background/60 bottom-10 px-3 py-2 border border-white/10 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          <button data-state="closed">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-10 active:bg-primary/50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-shrink size-6"
              >
                <path d="m15 15 6 6m-6-6v4.8m0-4.8h4.8"></path>
                <path d="M9 19.8V15m0 0H4.2M9 15l-6 6"></path>
                <path d="M15 4.2V9m0 0h4.8M15 9l6-6"></path>
                <path d="M9 4.2V9m0 0H4.2M9 9 3 3"></path>
              </svg>
            </button>
          </button>
          <button data-state="closed">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-10 active:bg-primary/50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-zoom-in size-6"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
                <line x1="11" x2="11" y1="8" y2="14"></line>
                <line x1="8" x2="14" y1="11" y2="11"></line>
              </svg>
            </button>
          </button>
          <button data-state="closed">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-10 active:bg-primary/50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-zoom-out size-6"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
                <line x1="8" x2="14" y1="11" y2="11"></line>
              </svg>
            </button>
          </button>
          <button data-state="closed">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-10 active:bg-primary/50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-check size-6"
              >
                <path d="M20 6 9 17l-5-5"></path>
              </svg>
            </button>
          </button>
        </div>
      </div>
    </div>
  );
}
