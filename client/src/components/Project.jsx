import {
  FaLocationArrow,
  FaBriefcase,
  FaCalendarAlt,
  FaFileContract,
} from "react-icons/fa";
import { PiProjectorScreenLight } from "react-icons/pi";
import {
  FaPersonWalkingWithCane,
  FaPersonHarassing,
  FaPersonDrowning,
  FaPersonCircleCheck,
} from "react-icons/fa6";
import { GiWaterTank } from "react-icons/gi";
import { IoOptions } from "react-icons/io5";

import { TbMoneybag } from "react-icons/tb";
import { MdOutlineScience } from "react-icons/md";
import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import ProjectInfo from "./ProjectInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const Project = ({
  _id,
  projectNumber,
  projectStatus,
  projectTitle,
  siteType,
  createdAt,
  chemicals,
  contractType,
}) => {
  const date = day(createdAt).format("DD MMM YYYY");
  let chemicalList = chemicals.join(", ");
  if (chemicals.length === 0) {
    chemicalList = "No Chemicals Listed";
  }
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{projectTitle.charAt(0)}</div>
        <div className="info">
          <h5>{projectNumber}</h5>
          <p>{projectTitle}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <ProjectInfo icon={<MdOutlineScience />} text={chemicalList} />

          <ProjectInfo icon={<GiWaterTank />} text={siteType} />
          <ProjectInfo
            icon={<FaPersonCircleCheck />}
            text={"client: Scottish Water"}
          />
          <ProjectInfo icon={<FaFileContract />} text={contractType} />
          <ProjectInfo
            icon={<FaPersonWalkingWithCane />}
            text={"PM: Steve Creene"}
          />
          <ProjectInfo
            icon={<FaPersonHarassing />}
            text={"SPM: Andrew Knight"}
          />

          <ProjectInfo
            icon={<FaPersonDrowning />}
            text={"Design Lead: Stuart Parker"}
          />
          <ProjectInfo icon={<IoOptions />} text={"Project Type: H&S"} />
          <ProjectInfo
            icon={<PiProjectorScreenLight />}
            text={`project stage: ${projectStatus}`}
          />
          <ProjectInfo
            icon={<TbMoneybag />}
            text={`Contract value: £1,000,000`}
          />
          <ProjectInfo icon={<FaCalendarAlt />} text={`added:  ${date}`} />
          <ProjectInfo
            icon={<FaCalendarAlt />}
            text={`Project Completed: ${date}`}
          />
        </div>
        <footer className="actions">
          <Link to={`../edit-project/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Link className="btn edit-btn">More Info</Link>
          <Form>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Project;
