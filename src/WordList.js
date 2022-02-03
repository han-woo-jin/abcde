// 리액트 패키지를 불러옵니다.
import React from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SpeedDial, SpeedDialIcon } from '@mui/material';
import { Button } from '@material-ui/core';

import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import {
  deleteBucketFB,
  updateBucketFB,
  changeBucket,
  loadBucketFB,
  checkBucketFB
} from "./redux/modules/word";
import Grid from '@mui/material/Grid';

import { BsXLg, BsCheckLg } from "react-icons/bs";


const BucketList = (props) => {
  React.useEffect(async () => {
    dispatch(loadBucketFB());
  }, []);
  const delete_bucket = (bucket_id) => {
    dispatch(deleteBucketFB(bucket_id));
    history.push("/");
  }
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const bucket_index = params.index;
  const bucket_list = useSelector((state) => state.bucket.list);
  const check_bucket = (word_id) => {
    dispatch(checkBucketFB(word_id));
  }
  return (
    <ListStyle>

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
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
              <ItemStyle completed={list.completed} className="list_item" key={index}>
                <div>
                  <p>단어 : {list.text}</p>
                </div>
                <div>
                  <p>설명 : {list.explain}</p>
                </div>
                <div style={{ color: "blue" }}>
                  <p>예시 : {list.example}</p>
                </div>
                <Buttons>
                  <div>
                    <button onClick={() => {
                      check_bucket(list)
                    }}><BsCheckLg /></button>
                  </div>

                  <div>
                    <button onClick={() => {
                      delete_bucket(list.id)
                    }}><BsXLg /></button>
                  </div>
                </Buttons>
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
const Buttons = styled.div`
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
    border: 0px;
    font: inherit;
    vertical-align: baseline;
    position: absolute;
    top: 15px;
    right: 15px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    >div{
      button{
        font-size: 20px;
        border: none;
        background-color: transparent;
        
      }
      button:hover{
        color:blue;
      }
      
    }
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
  color: ${(props) => (props.completed ? "white" : "black")};
`;

export default BucketList;