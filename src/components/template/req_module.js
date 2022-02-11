function req_module(db_name) {
    document
        .getElementById(db_name)
        .onclick = function () { // ElementID값은 SideNavigation.js에서 설정
            if (document.getElementById(db_name).checked === true) { // 체크박스가 체크되면

                //*** 오른쪽 사이드바가 슬라이드되도록 해야함 ***
                console.log(document.getElementById("right_nav_bar"));

                //아래 requests옵션에 넣어줄데이터
                const my_data = {
                    mydata: db_name
                };

                const requestOptions_2 = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // body: JSON.stringify({title: 'React POST Request Example'}) postmen에서 body를
                    // 선택해서 보낼때랑 같은 원리임
                    body: JSON.stringify(my_data) // Db에 데이터 전송할때 여기에다가 넣어서 보낸다.
                };

                const response_2 = fetch(
                    'http://192.168.0.8:3002/api/board_2',
                    requestOptions_2
                ).then(res => res.json())

                return response_2.then(data => { // fetch에서 반환해주는 값을 Return해야 동기식으로 처리가됨

                });
            } else { // 마커 체크를 해제했을대 Layer를 끄도록한다.

            }
        };
}