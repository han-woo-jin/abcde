// bucket.js
import { db } from "../../firebase";
import {
  orderBy,
  Timestamp,
  query,
  doc,
  updateDoc, deleteDoc, addDoc, collection, getDoc, getDocs
} from "firebase/firestore";



// Actions
const LOAD = "bucket/LOAD"
const CREATE = "bucket/CREATE";
const UPDATE = "bucket/UPDATE";
const DELETE = "bucket/DELETE";

const CHECK = 'bucket/CHECK';

const initialState = {
  list: [{ completed: false },],
};

export function loadBucket(bucket_list) {
  return { type: LOAD, bucket_list };
}

export function createBucket(bucket) {
  return { type: CREATE, bucket: bucket };
}

export function updateBucket(bucket_index) {
  return { type: UPDATE, bucket_index };
}

export const checkBucket = (bucket_id) => {
  return { type: CHECK, bucket_id };
};

export function deleteBucket(bucket_index) {
  return { type: DELETE, bucket_index };
}

export const loadBucketFB = () => {
  return async function (dispatch) {

    const query_data = query(collection(db, "bucket"), orderBy("time", "desc"))
    const bucket_data = await getDocs(query_data);

    let bucket_list = [];
    bucket_data.forEach((b) => {
      bucket_list.push({ id: b.id, ...b.data() });
    });
    dispatch(loadBucket(bucket_list));
  }
}
// 추가하기
export const addBucketFB = (bucket) => {
  return async function (dispatch) {
    const docData = {
      ...bucket,
      completed: false,
      time: Timestamp.fromDate(new Date())
    }

    const docRef = await addDoc(collection(db, "bucket"), docData);
    const bucket_data = { id: docRef.id, ...docRef.data(), check: false };
    //dispatch(createBucket(bucket_data));
  }
}

// export const updateBucketFB = (bucket_id) => {
//   return async function (dispatch, getState) {
//     const docRef = doc(db, "bucket", bucket_id);
//     await updateDoc(docRef, { completed: false });

//     const _bucket_list = getState().bucket.list;
//     const bucket_index = _bucket_list.findIndex((b) => {
//       return b.id === bucket_id;
//     })
//     //dispatch(updateBucket(bucket_index));
//   }
// }
export const updateBucketFB = (bucket_data) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "bucket", bucket_data.id);
    await getDoc(docRef);
    await updateDoc(docRef, bucket_data);

    const bucket_index = getState().bucket.list.findIndex((w) => {
      return w.id === bucket_data.id
    });

    dispatch(updateBucket(bucket_index, bucket_data));

  }
}
export const checkBucketFB = (el) => {
  return async function (dispatch) {
    const docRef = doc(db, "bucket", el.id)
    updateDoc(docRef, { completed: !el.completed });

    dispatch(checkBucket(docRef.id));
  }
}
export const changeBucket = (bucket_id) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "bucket", bucket_id);
    await updateDoc(docRef, { completed: true });
    const _bucket_list = getState().bucket.list;
    const bucket_index = _bucket_list.findIndex((b) => {
      return b.id === bucket_id;
    })
    //dispatch(updateBucket(bucket_index));
  }
}
// 삭제하기
export const deleteBucketFB = (bucket_id) => {
  return async function (dispatch, getState) {
    if (!bucket_id) {
      window.alert("아이디가 없네요");
      return;
    }
    const docRef = doc(db, "bucket", bucket_id);
    await deleteDoc(docRef);

    const _bucket_list = getState().bucket.list;
    const bucket_index = _bucket_list.findIndex((b) => {
      return b.id === bucket_id;
    })
    dispatch(deleteBucket(bucket_index));
  }
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "bucket/LOAD": {
      return { list: action.bucket_list };
    }

    case "bucket/CREATE": {
      console.log("이제 값을 바꿀거야!");
      const new_bucket_list = [...state.list, action.bucket];
      return { list: new_bucket_list };
    }

    // case "bucket/UPDATE": {
    //   const new_bucket_list = state.list.map((l, idx) => {
    //     if (parseInt(action.bucket_index) === idx) {
    //       return { ...l, completed: true };
    //     } else {
    //       return l;
    //     }
    //   });
    //   console.log({ list: new_bucket_list });
    //   return { list: new_bucket_list };
    // }

    case "bucket/UPDATE": {
      const new_bucket_list = state.list.map((el, index) => {
        return index !== action.bucket_index ? el : action.bucket_data;
      });
      return { ...state, list: [...new_bucket_list] };
    }

    case "bucket/CHECK": {
      const new_bucket_list = state.list.map((el) => {
        return el.id !== action.bucket_id ? el : { ...el, completed: !el.completed };
      })
      return { list: [...new_bucket_list] };
    }

    case "bucket/DELETE": {
      const new_bucket_list = state.list.filter((l, idx) => {
        return parseInt(action.bucket_index) !== idx;
      });
      return { list: new_bucket_list };
    }
    default:
      return state;
  }
}