import React from "react";
import { Col, Modal, Row, Tag } from "antd";
import HTMLReactParser from "html-react-parser/lib/index";
import "./post-modal.css";
import { PropModal } from "@/interface/post-modal.interface";
import moment from "moment";

const PostModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  data,
}: PropModal) => {
  return (
    <Modal
      title="Post Detail"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      width={1000}
      style={{ top: 8 }}
    >
      {/* title */}
      <Row>
        <Col span={4}>
          <p className="title_style">Title :</p>
        </Col>
        <Col span={20}>
          <p>{data.title}</p>
        </Col>
      </Row>
      {/* posted at */}
      <Row>
        <Col span={4}>
          <p className="title_style">Posted At :</p>
        </Col>
        <Col span={20}>
          <p>{moment(data.postedAt).format("DD/MM/YYYY HH:mm:ss")}</p>
        </Col>
      </Row>
      {/* posted by */}
      <Row>
        <Col span={4}>
          <p className="title_style">Posted By :</p>
        </Col>
        <Col span={20}>
          <p>{data.postedBy}</p>
        </Col>
      </Row>
      {/* tags */}
      <Row>
        <Col span={4}>
          <p className="title_style">Tags :</p>
        </Col>
        <Col span={20}>
          <div>
            {data.tags.map((item, idx) => {
              let color = item.length > 5 ? "geekblue" : "green";
              if (item === "loser") {
                color = "volcano";
              }
              return (
                <Tag color={color} key={idx}>
                  {item}
                </Tag>
              );
            })}
          </div>
        </Col>
      </Row>

      <p className="title_style">Content :</p>
      <div className="px-4">{HTMLReactParser(data.content)}</div>
    </Modal>
  );
};

export default PostModal;
