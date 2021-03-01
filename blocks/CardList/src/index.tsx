import React, { useState, useEffect } from 'react';
import { Input, Card, Tag, Divider, Spin,Row, Col } from 'antd';
import { PlusOutlined } from "@ant-design/icons";

import styles from './index.module.less';

const { CheckableTag } = Tag;
// const { Cell } = ResponsiveGrid;
export interface ICardItem {
  title?: string;
  content?: string;
  link?: string[];
}

export interface DataSource {
  cards: ICardItem[];
  tagsA: string[];
  tagA: string;
  tagsB: string[];
  tagB: string;
}
export interface CardListProps{
  dataSource?: DataSource;
  onSearch?: () => void;
}
const DEFAULT_DATA: DataSource = {
  tagsA: ['类目一', '类目二', '类目三', '类目四', '类目五', '类目六', '类目七', '类目八', '类目九', '类目十'],
  tagA: '类目一',
  tagsB: ['不到一年', '一年以上三年以下', '三年以上五年以下', '五年以上'],
  tagB: '一年以上三年以下',
  cards: new Array(7).fill({
    title: '图片型卡片标题',
    content: '图片型卡片描述图片型卡片描述图片型卡片描述图片型卡片描述图片型卡片描述',
    link: ['链接一', '链接二'],
  }),
};

const CardList: React.FunctionComponent<CardListProps> = (props: CardListProps): JSX.Element => {
  const {
    dataSource = DEFAULT_DATA,
    onSearch = (): void => { },
  } = props;
  const { Search } = Input;

  const [tagAValue, setTagAValue] = useState(dataSource.tagA);
  const [tagBValue, setTagBValue] = useState(dataSource.tagB);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
      <Col span={6} className={styles.ListItem} key={i}>
        <div className={styles.main}>
          <img src="https://shadow.elemecdn.com/app/element/list.76b098b1-1732-11ea-948d-7d2ddf6d1c39.png" alt="img" />
          <div className={styles.content}>
            <div className={styles.title}>
              {c.title}
            </div>
            <div className={styles.info}>
              {c.content}
            </div>
            <div className={styles.link}>
              <a href="#">{c.link ? c.link[0] : ''}</a>
              <a href="#">{c.link ? c.link[1] : ''}</a>
            </div>
          </div>
        </div>
      </Col>
    ));
  };

  return (
    <>
      <Card className={styles.CardList}>
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
        <Divider dashed style={{ margin: '24px 0' }} />
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
      </Card>
      <Spin spinning={loading} style={{ display: 'block'}}>
        <Row gutter={20}>
          <Col span={6} className={styles.ListItem}>
            <div className={styles.add}>
              <PlusOutlined className={styles.icon}/>
              <div className={styles.addText}>添加内容</div>
            </div>
          </Col>
          {renderCards()}
          </Row>
      </Spin>
    </>
  );
};

export default CardList;
