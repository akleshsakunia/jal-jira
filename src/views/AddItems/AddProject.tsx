import { Dispatch, SetStateAction } from "react";
import { DatePicker, Form, Input, Modal, Select } from "antd";
import api from "../../api";

const dateFormat = "YYYY-MM-DD";

export default ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    setOpen(false);
  };

  const onCreate = async (values: any) => {
    const finalValue = {
      ...values,
      start_date: values?.start_date?.format(dateFormat),
      end_date: values?.end_date?.format(dateFormat),
    };
    await api.projects.addProject(finalValue);
    console.log(finalValue);
  };

  return (
    <>
      <Modal
        title="Create Project"
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
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="Project Title"
            name="project_title"
            rules={[{ required: true, message: "Please add Project Title!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Abbr[2-5 char]"
            name="abbr"
            rules={[{ required: true, message: "Please add abbreviation!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Short Description"
            name="short_description"
            rules={[{ required: true, message: "Please add description!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Project Start Date" name="start_date">
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Project End Date"
            name="end_date"
            help={"Note: End date should be later than start date"}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Select>
              <Select.Option value="ACT">Active</Select.Option>
              <Select.Option value="INACT">In-Active</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
