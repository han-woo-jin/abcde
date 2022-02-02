// 리액트 패키지를 불러옵니다.
import React from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SpeedDial, SpeedDialIcon } from '@mui/material';
import { Button } from '@material-ui/core';
import {
  deleteBucketFB,
  updateBucketFB,
  changeBucket,
  loadBucketFB,
} from "./redux/modules/word";
import Grid from '@mui/material/Grid';


const BucketList = (props) => {
  React.useEffect(async () => {
    dispatch(loadBucketFB());
  }, []);

  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const bucket_index = params.index;
  const bucket_list = useSelector((state) => state.bucket.list);
  const change = () => {
    bucket_list[bucket_index].completed ?
      dispatch(updateBucketFB(bucket_list[bucket_index].id)) :
      dispatch(changeBucket(bucket_list[bucket_index].id))
  }
  return (
    <ListStyle>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClick={() => {
          history.push("/add");
        }}
      >
      </SpeedDial>


      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} padding={1}>
        {bucket_list.map((list, index) => {
          return (
            <Grid item xs={2} sm={4} md={4} key={index} >
              <ItemStyle completed={list.completed} className="list_item" key={index}
                onClick={() => {
                  history.push("/detail/" + index)
                }}>
                <div>
                  <p>단어 : {list.text}</p>
                </div>
                <div>
                  <p>설명 : {list.explain}</p>
                </div>
                <div style={{ color: "blue" }}>
                  <p>예시 : {list.example}</p>
                </div>
                {/* <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    change();
                    history.goBack();
                  }}
                >
                  완료하기
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
                </Button> */}
              </ItemStyle>

            </Grid>
          );
        })}

      </Grid>
    </ListStyle >
  );
};

const ListStyle = styled.div`
  display: flex;
    flex-wrap: wrap;
    -webkit-box-pack: start;
    justify-content: flex-start;
    gap: 20px;
    width: 100%;
    padding: 50px 0px;
    margin: 0px;
    padding: 0px;
    border: 0px;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
`;

const ItemStyle = styled.div`
  position: relative;
  margin: 0px;
    width: 100%;
    padding:20px;
    border: 2px solid #96BAFF;
    border-radius: 10px;
    box-sizing: border-box;
  
  background-color: ${(props) => (props.completed ? "#96BAFF" : "white")};
`;

export default BucketList;