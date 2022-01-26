import React, {useState} from 'react';

function CustomCheckBox(props) {
    const [isChecked, setIsChecked] = useState(false);

    //Check박스가 변했을때 이벤트 발생!
    const handleChecked = (event) => {
        setIsChecked(event.target.checked);
        // console.log(isChecked) //체크 박스 상태확인

    };

    return (
        // <div class="form-check">     <input class="form-check-input" type="checkbox"
        // checked="" id={props.id}></input>     <label class="form-check-label"
        // for="flexCheckDefault">Test Check Box</label> </div>
        <div className="App">
            {/* 아래에서 checked 부분에 props.checked를 안써주면 Map.jsx에서 getElementByID를통해 받아올수없음 */}
            <input type="checkbox" id={props.id} checked={props.checked} onChange={handleChecked}/>
            <span id = "span_1">{
                    isChecked
                        ? "Checked!!"
                        : "Unchecked"
                }</span>
        </div>
    )
}

export default CustomCheckBox;