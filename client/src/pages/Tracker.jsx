import "../../node_modules/@syncfusion/ej2-base";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "../index.css";
import {
  GanttComponent,
  Resize,
  Inject,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-gantt";

import { registerLicense } from "@syncfusion/ej2-base";
import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { nanoid } from "nanoid";

// Registering Syncfusion license key
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NAaF5cWWJCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdgWH1ccXRSQ2VfVE13XUs="
);

export const loader = async ({ request, params }) => {
  try {
    const { data } = await customFetch.get(`/projects`);
    console.log("BLIB", data);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard/all-projects");
  }
};

function formatCourseDate(date) {
  const dateObj = new Date(date + "T00:00:00");
  return new Intl.DateTimeFormat("en-US").format(dateObj);
}

function formatDate(date, format) {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear(),
  };

  return format.replace(/mm|dd|yy|yyy/gi, (matched) => map[matched]);
}

const getDuration = (firstDate, secondDate) => {
  // this is for changing the dates coming from the database to a date format the Gantt chart needs to see
  if (firstDate === "") {
    return 1;
  }
  console.log("f", firstDate);
  console.log("s", secondDate);

  const modifiedDate1 = formatCourseDate(firstDate);
  // const modifiedDate1 = new Date().toLocaleDateString();
  console.log("MD1", modifiedDate1);

  const modifiedDate2 = formatCourseDate(secondDate);
  console.log("MD2", modifiedDate2);

  var date1 = new Date(modifiedDate1);
  console.log("date1", date1);
  var date2 = new Date(modifiedDate2);
  console.log("date2", date2);
  var duration =
    Math.ceil(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);
  var duration2 = Math.ceil(Math.abs(date2 - date1));
  console.log("duration", duration);
  console.log("duration2", duration2 / (1000 * 3600 * 24));
  return duration;
};

const checkIfTrue = (
  item,
  item2,
  item3,
  item4,
  item5,
  item6,
  indexValue,
  subIndexValue,
  taskName1,
  taskName2,
  taskName3
) => {
  let subTaskArray = [];
  if (item !== "") {
    subTaskArray.push({
      TaskID: indexValue + 1 + "." + (subIndexValue + 1.1),
      TaskName: taskName1,
      StartDate: item,
      // new Date(formatCourseDate(item)).getTime() -
      //   new Date(new Date().toLocaleDateString()).getTime() <
      // 0
      //   ? new Date()
      //   : item,
      Duration: getDuration(item, item2),
    });
  }
  if (item3 !== "") {
    subTaskArray.push({
      TaskID: indexValue + 1 + "." + (subIndexValue + 1.2),
      TaskName: taskName2,
      StartDate: item3,

      Duration: getDuration(item3, item4),
    });
  }
  if (item5 !== "") {
    subTaskArray.push({
      TaskID: indexValue + 1 + "." + (subIndexValue + 1.2),
      TaskName: taskName3,
      StartDate: item5,

      Duration: getDuration(item5, item6),
    });
  }
  return subTaskArray;
};

const blob = () => {
  // alert(Date());
  const { projects } = useLoaderData();
  console.log(projects);
  let newProjects = projects.map((project, index) => {
    return {
      TaskID: index + 1,
      ProjectNo: project.projectNumber,
      TaskName: project.projectTitle,

      subtasks: project.workItems.map((workItem, subIndex) => {
        {
          console.log("blobaasfd", formatCourseDate(workItem.designStart));
          console.log("blobaasfd", new Date().toLocaleDateString());
          console.log(
            "blobaasfd",
            new Date(formatCourseDate(workItem.designStart)).getTime() -
              new Date(new Date().toLocaleDateString()).getTime()
          );
        }
        return {
          TaskID: index + 1 + "." + (subIndex + 1),
          TaskName: workItem.name,

          subtasks: checkIfTrue(
            workItem.designStart,
            workItem.designEnd,
            workItem.workshopStart,
            workItem.workshopEnd,
            workItem.siteStart,
            workItem.siteEnd,
            index,
            subIndex,
            "Design",
            "Workshop",
            "Site"
          ),
        };
      }),
    };
  });

  console.log("newProjects", newProjects);

  return newProjects;
};

const splitterSettings = {
  position: "35%",
};

const timelineSettings = {
  timelineUnitSize: 80,
  timelineViewMode: "Month",

  bottomTier: {
    unit: "Month",
  },
};

function GanttChart() {
  const { projects } = useLoaderData();
  const GanttData = blob();

  const taskFields = {
    id: "TaskID",
    name: "TaskName",
    startDate: "StartDate",
    duration: "Duration",
    progress: "51",
    child: "subtasks",
  };
  function queryTaskbarInfo(args) {
    console.log(args);
    if (args.data.TaskName === "Turriff WTW Chloramination Dosing") {
      args.baselineColor = "red";
      args.leftLabelColor = "blue";
      args.progressBarBgColor = "blue";
      args.taskbarBgColor = "red";
      args.taskLabelColor = "red";
      args.taskbarBgColor = "red";
    }
    if (args.data.ProjectNo !== null) {
      args.taskbarBgColor = "#123456";
    }
    if (args.data.Progress > 8) {
      args.progressBarBgColor = "lightgreen";
    }
  }

  return (
    <div style={{ position: "fixed" }}>
      <GanttComponent
        dataSource={GanttData}
        taskFields={taskFields}
        height="600px"
        width="1350px"
        splitterSettings={splitterSettings}
        allowResizing={false}
        timelineSettings={timelineSettings}
        collapseAllParentTasks={true}
        queryTaskbarInfo={queryTaskbarInfo}
        includeWeekend={true}
      >
        <ColumnsDirective maxWidth="100" minWidth="100" width="100">
          <ColumnDirective
            gridLines="Both"
            field="TaskID"
            width="65"
            maxWidth="65"
            minWidth="65"
          ></ColumnDirective>
          <ColumnDirective
            field="ProjectNo"
            headerText="Project No"
            width="60"
            allowResizing={false}
            maxWidth="60"
            minWidth="60"
          ></ColumnDirective>
          <ColumnDirective
            field="TaskName"
            headerText="Project Title"
            width="200"
            maxWidth="100"
            minWidth="100"
          ></ColumnDirective>
        </ColumnsDirective>
        <Inject services={[Resize]} />
      </GanttComponent>
    </div>
  );
}

export default GanttChart;
