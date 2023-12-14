import React from "react";
import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { CONTRACT_TYPE, SITE_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const loader = async ({ request, params }) => {
  try {
    console.log(params);
    const { data } = await customFetch.get(
      "/projects/65775bd9add9384a0d6bc545"
    );
    console.log(data);
    return;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/projects/${params.id}`, data);
    toast.success("Project edited successfully");
    return redirect("/dashboard/all-projects");
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const EditProject = () => {
  const { project } = useLoaderData();
  console.log(project);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  console.log("goodbye");
  return (
    <Wrapper>
      <Form method="POST" className="form">
        <h4 className="form-title">Edit project</h4>
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

export default EditProject;
