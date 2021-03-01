import React, { useState, useEffect } from "react";
import {
  Card,
  Tag,
  Divider,
  Button,
  Pagination,
  Input,
  Spin,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";

import styles from "./index.module.less";

const { CheckableTag } = Tag;

export interface ICardItem {
  title?: string;
  content?: string;
  subContent?: string;
}
export interface DataSource {
  cards: ICardItem[];
  tagsA: string[];
  tagA: string;
  tagsB: string[];
  tagB: string;
}
export interface BasicListProps {
  dataSource?: DataSource;
  onSearch?: () => void;
}

const DEFAULT_DATA: DataSource = {
  tagsA: [
    "类目一",
    "类目二",
    "类目三",
    "类目四",
    "类目五",
    "类目六",
    "类目七",
    "类目八",
    "类目九",
    "类目十",
  ],
  tagA: "类目一",
  tagsB: ["不到一年", "一年以上三年以下", "三年以上五年以下", "五年以上"],
  tagB: "一年以上三年以下",
  cards: new Array(5).fill({
    title: "构建一套产品化设计系统",
    content:
      "随着互联网行业的聚变式发展，在电商业务从“信息透出” 到 “在线交易” 的过程中，网站 UI 构建也经历了“体验一致性”、“设计效率”、“UI系统构建/应用效率”、“多端适配” …",
    subContent: "谢瑶 3 小时前更新",
  }),
};

const BasicList: React.FunctionComponent<BasicListProps> = (
  props: BasicListProps
): JSX.Element => {
  const { dataSource = DEFAULT_DATA, onSearch = (): void => {} } = props;

  const { Search } = Input;
  const [tagAValue, setTagAValue] = useState(dataSource.tagA);
  const [tagBValue, setTagBValue] = useState(dataSource.tagB);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  const onTagAValueChange = (v: string) => {
    setLoading(true);
    setTagAValue(v);
  };

  const onTagBValueChange = (v: string) => {
    setLoading(true);
    setTagBValue(v);
  };

  const onSearchClick = () => {
    setLoading(true);
    onSearch();
  };

  const onPaginationChange = () => {
    setLoading(true);
  };

  const renderTagListA = () => {
    return dataSource.tagsA.map((name: string) => (
      <CheckableTag
        key={name}
        checked={tagAValue === name}
        onChange={() => onTagAValueChange(name)}
      >
        {name}
      </CheckableTag>
    ));
  };

  const renderTagListB = () => {
    return dataSource.tagsB.map((name: string) => (
      <CheckableTag
        key={name}
        checked={tagBValue === name}
        onChange={() => onTagBValueChange(name)}
      >
        {name}
      </CheckableTag>
    ));
  };

  const renderCards = () => {
    return dataSource.cards.map((c: ICardItem, i: number) => (
      <div className={styles.ListItem} key={i}>
        <div className={styles.main}>
          <div className={styles.left}>
            <img
              src="https://shadow.elemecdn.com/app/element/list.62a82841-1bcb-11ea-a71c-17428dec1b82.png"
              alt="img"
            />
            <div>
              <div className={styles.title}>{c.title}</div>
              <div className={styles.content}>{c.content}</div>
              <div className={styles.subContent}>{c.subContent}</div>
            </div>
          </div>
          <div className={styles.right}>
            <Button type="link">编辑</Button>
            <Button type="link">订阅</Button>
            <Button type="link">删除</Button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      <Card className={styles.BasicList}>
        <div className={styles.search}>
          <Search
            placeholder="请输入"
            allowClear
            enterButton="搜索"
            size="large"
            onSearch={onSearchClick}
            style={{ width: "600px" }}
          />
        </div>
        <Divider dashed style={{ margin: "24px 0" }} />
        <div className={styles.TagBox}>
          <div className={styles.TagBoxItem}>
            <span className={styles.TagTitleName}>内容分类:</span>
            {renderTagListA()}
          </div>
          <div className={styles.TagBoxItem}>
            <span className={styles.TagTitleName}>时间:</span>
            {renderTagListB()}
          </div>
        </div>

        <Spin spinning={loading} className={styles.MainList}>
          <div className={styles.MainContent}>
            <div className={styles.ListItem}>
              <div className={styles.add}>
                <PlusOutlined className={styles.icon}/>
                <div className={styles.addText}>添加内容</div>
              </div>
            </div>
            {renderCards()}
            <div className={styles.footer}>
              <div className={styles.total}>
                共<span>200</span>条需求
              </div>
              <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onPaginationChange} />
            </div>
          </div>
        </Spin>
      </Card>
    </>
  );
};

export default BasicList;
