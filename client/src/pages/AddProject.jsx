import React from "react";
import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useActionData, useOutletContext } from "react-router-dom";
import { CHEMICALS, CONTRACT_TYPE, SITE_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import MultiSelect from "multiselect-react-dropdown";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  data.chemicals = ["Sodium Hypochlorite", "Sodium Hydroxide"];
  try {
    await customFetch.post("/projects", data);
    toast.success("job added successfully");

    return redirect("all-projects");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddProject = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form className="form" method="POST">
        <h4 className="form-title">Add / Edit project details</h4>
        <div className="form-center">
          <FormRow
            type="number"
            name="projectNumber"
            labelText="Project Number"
          />
          <FormRow type="text" name="projectTitle" labelText="Project Title" />
          <FormRow type="number" name="contract Value" />
          <FormRowSelect
            name="siteType"
            labelText="site type"
            list={Object.values(SITE_TYPE)}
          />
          <FormRowSelect
            name="contractType"
            labelText="contract type"
            list={Object.values(CONTRACT_TYPE)}
          />
          <div className="form-row">
            <label className="form-label">
              Select Chemicals (Hold CTRL for multiple)
            </label>
            <select
              id="chemical"
              name="chemicals"
              multiple
              size="6"
              className="form-input form-select-multiple"
            >
              {Object.values(CHEMICALS).map((itemValue) => {
                return (
                  <option key={itemValue} value={itemValue}>
                    {itemValue}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-block form-btn "
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddProject;
