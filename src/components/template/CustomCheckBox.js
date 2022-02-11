import React, {useState} from 'react';
import { unchecked, checked, changeText } from "../../modules/checkbox_state"; // 액션함수를 가져온다.
import {useDispatch, useSelector} from "react-redux";

function CustomCheckBox(props) {
    const [isChecked, setIsChecked] = useState(false);

    //*** Redux 사용 ***/
    const dispatch = useDispatch();


    // const test_redux = useSelector((state) => state.test_redux.id); // 리듀서 상태값 가져오기
    // console.log(test_redux);
    // const test_redux_id = useSelector((state) => state.test_redux); // 리듀서 상태값 가져오기

    const onClickMenuIcon = () => {
        setIsChecked(!isChecked);

        // 체크박스가 클릭되면
        dispatch(changeText(props.id, isChecked)); // 리듀서의 액션함수에 id와 체크박스상태전달
    };


    // if(isChecked === true){
    //     console.log("체크박스가 체크")
    //     // console.log(props.id);
    //     dispatch(changeText(props.id, true)); // 리듀서의 액션함수에 id와 체크박스상태전달
    //     // console.log(test_redux_id);
        
    // } else {
    //     dispatch(changeText(props.id, true)); // 리듀서의 액션함수에 id와 체크박스상태전달
    //     console.log("체크박스가 체크 해제")
    // }

    return (
        // <div class="form-check">     <input class="form-check-input" type="checkbox"
        // checked="" id={props.id}></input>     <label class="form-check-label"
        // for="flexCheckDefault">Test Check Box</label> </div>
        <div className="App">
            {/* 아래에서 checked 부분에 props.checked를 안써주면 Map.jsx에서 getElementByID를통해 받아올수없음 */}
            <input type="checkbox" title={props.title} id={props.id} checked={props.checked} onChange={onClickMenuIcon}/>
            {
                <span>{props.title}</span>
                // props.title
                // props.id==="test_1" ? "2013 양식적지" : "(데이터 없음)" // SideNavigation.js로부터 prop.id를 받음
            }
            {/* <span id = "span_1">{
                    isChecked
                        ? "Checked!!"
                        : "Unchecked"
                }</span> */}
        </div>
    )
}

export default CustomCheckBox;