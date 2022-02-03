import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  changeBucket,
  deleteBucketFB,
  updateBucketFB,
} from "./redux/modules/word";
import styled from 'styled-components';
import Button from "@material-ui/core/Button";
import { positions } from '@mui/system';

const Detail = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const bucket_index = params.index;
  const bucket_list = useSelector((state) => state.bucket.list);

  const change = () => {
    bucket_list[bucket_index].completed ?
      dispatch(updateBucketFB(bucket_list[bucket_index].id)) :
      dispatch(changeBucket(bucket_list[bucket_index].id))
  }
  return (
    <div style={{ textAlign: "center" }}>
      <ItemStyle>
        <h3>단어 : {bucket_list[bucket_index] ? bucket_list[bucket_index].text : ""}</h3>
        <h3>설명 : {bucket_list[bucket_index] ? bucket_list[bucket_index].explain : ""}</h3>
        <h3 style={{ color: "blue" }}>예시 : {bucket_list[bucket_index] ? bucket_list[bucket_index].example : ""}</h3>
        <div style={{ paddingTop: "40px" }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              change();
              history.push("/");
            }}
          >
            암기완료
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              dispatch(deleteBucketFB(bucket_list[bucket_index].id));
              history.goBack();
            }}
          >
            삭제하기
          </Button>
        </div>
      </ItemStyle>
    </div>
  );
};

const ItemStyle = styled.div`
  position: absolute;
  left: 50%;
  top: 35%;
  transform: translate(-50%, -50%);
  margin: 0px;
  height: 280px;
    width: 450px;
    padding:20px;
    border: 2px solid #96BAFF;
    border-radius: 10px;
    box-sizing: border-box;
`;

export default Detail;