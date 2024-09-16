import React from "react";
import { Table, Button, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function TaskList({ tasks, onEdit, onDelete }) {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Tag color={text === "completed" ? "green" : "blue"}>
          {text.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
            style={{ marginRight: "10px" }}
          />
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record.id)}
          />
        </>
      ),
    },
  ];

  return (
    <Table
      style={{ padding: "0% 5%" }}
      columns={columns}
      dataSource={tasks}
      rowKey="id"
    />
  );
}

export default TaskList;
