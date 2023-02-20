import { Dispatch, SetStateAction, useState } from "react";
import { DatePicker, Form, Input, Modal, Select } from "antd";
import api from "../../api";
import RichTextEditor from "../../components/RichTextEditor";
import ProjectDropdown from "../Board/ProjectDropdown";
import {
  ESTIMATE,
  ISSUE_STATUS,
  ISSUE_TYPE,
  PRIORITY,
} from "../../utils/globalVars";

const dateFormat = "YYYY-MM-DD";
const dateTimeFormat = "YYYY-MM-DD[T]H:mm:ss[Z]";

export default ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [form] = Form.useForm();
  const [description, setDescription] = useState("");
  const [project, setProject] = useState<number | undefined>();

  const handleCancel = () => {
    setOpen(false);
  };

  const onCreate = async (values: any) => {
    const finalValue = {
      ...values,
      description: description,
      reported_on: values?.reported_on?.format(dateTimeFormat),
      project: project,
    };
    console.log(finalValue);
    // await api.issues.addIssue(finalValue);
  };

  return (
    <>
      <Modal
        title="Create Issue"
        open={open}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
        okText="Create"
        cancelText="Cancel"
        onCancel={handleCancel}
        width={"70vw"}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="Issue title"
            name="issue_title"
            rules={[{ required: true, message: "Please add Issue Title!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <RichTextEditor onChange={setDescription} height={"30vh"} />
          </Form.Item>

          <Form.Item label="Start date" name="start_date">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Due date" name="resolution_date">
            <DatePicker />
          </Form.Item>

          <Form.Item label="Estimate" name="estimate">
            <Select options={ESTIMATE}></Select>
          </Form.Item>
          <Form.Item label="Issue Status" name="issue_status">
            <Select options={ISSUE_STATUS}></Select>
          </Form.Item>
          <Form.Item label="Issue type" name="issue_type">
            <Select options={ISSUE_TYPE}></Select>
          </Form.Item>
          <Form.Item label="Priority" name="priority">
            <Select options={PRIORITY}></Select>
          </Form.Item>

          <Form.Item label="project" name="project">
            <ProjectDropdown setSelectedProject={setProject} bordered={true} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
