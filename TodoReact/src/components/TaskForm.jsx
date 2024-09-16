import React, { useEffect } from "react";
import { Button, Input, Select, DatePicker, Form } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

function TaskForm({ task, onSubmit }) {
  const [form] = Form.useForm();

  // Prefill the form if editing a task
  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        title: task.title,
        description: task.description,
        // Convert dueDate string back to dayjs object for DatePicker
        dueDate: task.dueDate ? dayjs(task.dueDate, "YYYY-MM-DD") : null,
        priority: task.priority,
        status: task.status,
      });
    } else {
      form.resetFields();
    }
  }, [task, form]);

  const onFinish = (values) => {
    onSubmit({
      ...values,
      dueDate: values.dueDate ? values.dueDate.format("YYYY-MM-DD") : null,
      id: task ? task.id : Date.now(),
    });
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      style={{ width: "50%", margin: "auto" }}
    >
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input placeholder="Task title" />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea placeholder="Task description" />
      </Form.Item>
      <Form.Item name="dueDate" label="Due Date" rules={[{ required: true }]}>
        <DatePicker />
      </Form.Item>
      <Form.Item name="priority" label="Priority" rules={[{ required: true }]}>
        <Select placeholder="Select priority">
          <Option value="low">Low</Option>
          <Option value="medium">Medium</Option>
          <Option value="high">High</Option>
        </Select>
      </Form.Item>
      <Form.Item name="status" label="Status" rules={[{ required: true }]}>
        <Select placeholder="Select status">
          <Option value="in progress">In Progress</Option>
          <Option value="completed">Completed</Option>
        </Select>
      </Form.Item>
      <Button type="primary" htmlType="submit">
        {task ? "Update Task" : "Add Task"}
      </Button>
    </Form>
  );
}

export default TaskForm;
