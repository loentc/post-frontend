"use client";
import React, { useEffect, useState } from "react";
import { TableProps, Tag, Input, Table, Card } from "antd";
import axios from "axios";
import moment from "moment";
import PostModal from "./post-modal";
import "./post-table.css";
import { PostResponse } from "@/interface/post-response.interface";
import { useSession } from "next-auth/react";
import axiosInstance from "@/config/axios";

const { Search } = Input;

function PostTable() {
  const [post, setPost] = useState<PostDataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<PostDataType>({
    key: "",
    title: "",
    postedAt: "",
    postedBy: "",
    content: "",
    tags: [],
  });
  const [search, setSearch] = useState("");
  const [totalDocs, setTotalDocs] = useState(10);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleFetchData = async () => {
      setLoading(true);
      const postApi = await axiosInstance
        .get<PostResponse>(
          `http://localhost:8100/post?pageSize=${pageSize}&page=${page}&search=${search}`,
        )
        .then((value) => {
          setPost(value.data.data);
          setTotalDocs(value.data.totalDoc);
        })
        .catch(console.log);
      setLoading(false);
    };
    handleFetchData();
  }, [page, pageSize, search]);

  const onSearch = (value: string) => {
    setSearch(value);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePaginate = (page: number) => {
    setPage(page)
  }

  const columns: TableProps<PostDataType>["columns"] = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
      width: "5%",
      sorter: (a, b) => Number(a.key) - Number(b.key),
      // onFilter: (value, record) => {
      //   return (
      //     String(record.key).includes(value as string) ||
      //     String(record.title)
      //       .toLowerCase()
      //       .includes((value as string).toLowerCase()) ||
      //     String(record.postedBy)
      //       .toLowerCase()
      //       .includes((value as string).toLowerCase()) ||
      //     record.tags.filter((item) => item.includes(value as string))
      //       .length !== 0
      //   );
      // },
      // filteredValue: [search],
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "50%",
      render: (text) => <p>{text}</p>,
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Posted At",
      dataIndex: "postedAt",
      key: "postedAt",
      width: "15%",
      sorter: (a, b) => moment(a.postedAt).unix() - moment(b.postedAt).unix(),
      render: (value) => <p>{moment(value).format("DD/MM/YYYY HH:mm:ss")}</p>,
    },
    {
      title: "Posted By",
      dataIndex: "postedBy",
      key: "postedBy",
      width: "10%",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      width: "20%",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  return (
    <div>
      <Card className="p-2">
        <div className="flex justify-end">
          <Search
            placeholder="Search"
            onSearch={onSearch}
            // onChange={(value) => setSearch(value.target.value)}
            style={{ width: 320 }}
            className="m-4"
          />
        </div>

        <Table
          loading={loading}
          columns={columns}
          dataSource={post}
          pagination={{
            pageSize: pageSize,
            total: totalDocs,
            onChange: (page) => handlePaginate(page),
            showSizeChanger: false,
            position: ["bottomRight"],
            className: "pagination_style",
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                setModalData(record);
                setIsModalOpen(true);
              },
            };
          }}
          bordered
        />
      </Card>

      <PostModal
        handleOk={handleOk}
        handleCancel={handleCancel}
        isModalOpen={isModalOpen}
        data={modalData}
      />
    </div>
  );
}

export default PostTable;
