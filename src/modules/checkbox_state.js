/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const CHECKED = 'checkbox_state/CHECKED';
const UNCHECKED = 'checkbox_state/UNCHECKED';
const SETID = 'checkbox_state/SETID';
const SETBUISARR = 'checkbox_state/SETBUISARR';

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.

export const checked = () => ({ type: CHECKED });
export const unchecked = (rm_text) => ({ type: UNCHECKED, rm_text });
export const changeText = (id,sw) => ({type : SETID, id, sw});
export const input_buis_Text = (bl) => ({type : SETBUISARR, bl}); // bl은 action을 통해 받아올수있음
// export const setID = state => ({type: SETID});

/* 초기 상태 선언 */
/* 아래값들은 state를 통해 접근가능 */
var id_list_input = [] //서버가 살아있는한 계속 유지
var buis_list_input = []

const initialState = {
    id: 0,
    ischecked: false,
    id_list: [],
    buis_list: []
  };


/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function checkbox_state(state = initialState, action) {
    switch (action.type) { // 액션이 발생했는데 액션타입이 
      case CHECKED: //  INCREASE 액션에 발생하면..,.
        return {
          ...state,
          id:"123123",
          ischecked: true
        };
      case UNCHECKED: // id_list_input에있는 값중 action.rm_text값을 제거한다.
        id_list_input = id_list_input.filter((element) => element !== action.rm_text);
        return {
            id_list: id_list_input
        };
      case SETBUISARR:
        buis_list_input = action.bl;
        return{
          buis_list: buis_list_input // 전역 buis_list_input을 buis_list를 통해 useSelector로 받아올거임
        };
      case SETID:
        if (action.sw === true){ //전달된 체크박스가 해제되었다면.. // id_list_input에있는 값중 action.rm_text값을 제거한다.
            console.log("체크박스 해제");
            console.log(action.id);
            console.log(id_list_input);
            
            // id_list_input = id_list_input.filter((element) => element !== action.id);
            for(var i = 0; i<id_list_input.length; i++){
                if(id_list_input[i] === action.id){ //체크해제한 id가 배열에 들어있으면 제거
                    console.log("찍인다.");
                    id_list_input.splice(i, 1);
                    console.log("찍인다_2");
                }
            }
            console.log(id_list_input);
        } else if(action.sw === false) { // 체크박스가 체크되었다면...
            id_list_input.push(action.id) // 리스트에 넣는다.
            // buis_list_input.push(action.buis_list)
            console.log("체크박스 선택");
            console.log(action.id);
            console.log(id_list_input);
        }
        return{
            id: action.id,
            ischecked: action.sw,
            id_list: id_list_input // 체크한 아이디를 모두 모아서 id_list에 전달
        };
        // } else { // 전달된 체크박스가 체크되었다면
        //     id_list_input.push(action.text) // 리스트에 넣는다.
        //     console.log("체크박스 체크");
        //     return { // return 값은 Component console값에서 표시해줄부분임
        //         id: action.id,
        //         ischecked: action.sw,
        //         id_list: id_list_input // 체크한 아이디를 모두 모아서 id_list에 전달
        //       };
        // }

        // console.log(action.sw);
        // console.log(action.id);
        // console.log(id_list_input);
        //     return { // return 값은 Component console값에서 표시해줄부분임
        //     id: action.id,
        //     ischecked: action.sw,
        //     id_list: id_list_input // 체크한 아이디를 모두 모아서 id_list에 전달
        //     };
        
      default: // 액션타입이 checke, false도 아니라면..그냥 상태반환
        return state;
    }
  }

