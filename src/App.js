import React from "react";
import styled from "styled-components";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createBucket, loadBucketFB, addBucketFB } from "./redux/modules/word";
import { db } from './firebase';
import WordList from "./WordList";
import Detail from "./Detail";
import NotFound from "./NotFound";
import { doc, updateDoc, deleteDoc, addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import Add from './Add';
import { Button } from '@material-ui/core';
function App() {
  const [list, setList] = React.useState([
    "영화관 가기",
    "매일 책읽기",
    "수영 배우기",
  ]);
  const text = React.useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  // 데이터 가져오기
  React.useEffect(async () => {
    dispatch(loadBucketFB());
  }, []);

  // 데이터 추가하기
  // React.useEffect(async () => {

  //   addDoc(collection(db, "bucket"), { text: "new", completed: false })
  // }, []);

  // 데이터 수정하기
  // React.useEffect(async () => {
  //   const docRef = doc(db, "bucket", "ZZLOpopiPettBYI1m2NT");
  //   updateDoc(docRef, { completed: true });
  // }, []);
  // 데이터 삭제하기
  // React.useEffect(async () => {
  //   const docRef = doc(db, "bucket", "GkLbxm9ijibsTfA6XhO0");
  //   deleteDoc(docRef);
  // }, []);

  const addBucketList = () => {
    // 스프레드 문법! 기억하고 계신가요? :)
    // 원본 배열 list에 새로운 요소를 추가해주었습니다.
    // setList([...list, text.current.value]);
    dispatch(addBucketFB({ text: text.current.value, completed: false }));
    // dispatch(createBucket({ text: text.current.value, completed: false }));
  };
  return (
    <div className="App" style={{ backgroundImage: "/bac.jpeg" }}>
      <Container>
        {/* 컴포넌트를 넣어줍니다. */}
        {/* <컴포넌트 명 [props 명]={넘겨줄 것(리스트, 문자열, 숫자, ...)}/> */}
        <Switch>
          {/* 메인 */}
          <Route path="/" exact>
            <Title onClick={() => { history.push("/") }}>단어장</Title>
            <Line />
            <WordList list={list} />
          </Route>
          {/* 수정 */}
          <Route path="/detail/:index">
            <Title onClick={() => { history.goBack() }}>수정페이지</Title>
            <Line />
            <Detail />
          </Route>
          {/* 추가 */}
          <Route path="/add">
            <Title onClick={() => { history.goBack() }}>추가페이지</Title>
            <Line />
            <Add />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Container>
    </div >
  );
}

const Input = styled.div`
  max-width: 350px;
  min-height: 10vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
  display: flex;
  & > * {
    padding: 5px;
  }
  & input{
    border: 1px solid #888;
    width: 70%;
    margin-right: 10px;
  }
  
  & input:focus {
    outline: none;
    border: 1px solid #a673ff;
  }

  & button {
    width: 25%;
    color: #fff;
    border: #a673ff;
    background: #a673ff;
  }
`;

const Container = styled.div`
    width: 100%;
    padding: auto;
    
`;

const Title = styled.h1`
font-size: 2.0em;
  color: #8aaff3;
  padding: 10px 0px 0px 0px;
  margin: 0px;
  text-align: center;
`;

const Line = styled.hr`
  margin: 16px 0px;
  border: 1px solid #96BAFF;
`;

export default App;