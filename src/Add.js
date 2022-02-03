import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import './App.css';
import {
  deleteBucketFB,
  updateBucketFB,
  addBucketFB,
} from "./redux/modules/word";
import styled from 'styled-components';

import Button from "@material-ui/core/Button";

const Add = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const explain = React.useRef(null);
  const example = React.useRef(null);
  const text = React.useRef(null);

  return (
    <div>
      <Box>
        <Box2>
          <Input>
            <Title>단어</Title>
            <input className="input1" ref={text} />
          </Input>
          <Input>
            <Title>설명</Title>
            <input className='input1' ref={explain} />
          </Input>
          <Input>
            <Title>예시</Title>
            <input className='input1' ref={example} />
          </Input>
          <div style={{ position: 'absolute', bottom: 16, right: 16 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                dispatch(addBucketFB({
                  text: text.current.value,
                  explain: explain.current.value,
                  example: example.current.value,
                  completed: false,
                }));
                history.push("/");
              }}>
              추가하기
            </Button>
          </div>
        </Box2>
      </Box>
    </div>
  );
};
const Box = styled.div`
    box-sizing: border-box;
    padding: 0px;
    border: 0px;
    font: inherit;
    vertical-align: baseline;
    display: flex;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    max-width: 400px;
    margin: 40px auto;
`;
const Box2 = styled.div`
    position: absolute;
  left: 50%;
  top: 35%;
  transform: translate(-50%, -50%);
  margin: 0px;
  height: 310px;
    width: 450px;
    padding:20px;
    border: 2px solid #96BAFF;
    border-radius: 10px;
    box-sizing: border-box;
    `;
const Title = styled.div`
text-align: left;
box-sizing: border-box;
margin: 0px;
padding: 0px;
border: 0px;
font: inherit;
vertical-align: baseline;
font-size: 18px;
font-weight: 600;
margin-bottom: 5px;
    `;

const Input = styled.div`   
box-sizing: border-box;
margin: 0px;
padding: 0px;
border: 0px;
font: inherit;
vertical-align: baseline;
display: flex;
flex-direction: column;
margin-bottom: 20px;
  
`;

export default Add;