import customAjax from "../ajax";

export default class {
    constructor() {
        document.title = "WriteBoard";
    }
    async getHtml() {
        return createHeader();
    }

    async createForm() {
        const root = document.querySelector('#root');
        root.innerHTML = createHeader();
        
        const div = document.createElement("div");
        div.innerHTML = addForm();
        const submit = div.querySelector("#submit-form");
        submit.addEventListener("click",submitForm);
        root.appendChild(div);
    }
}

async function submitForm() {
    const data = {
        "title": "Ego is the Enemy10",
        "author": "Ryan Holiday10"
    }
    const newData = JSON.parse(await customAjax('POST',`http://localhost:3000/board-save`,data));
    console.log(newData);
}

function createHeader() {
    const html = `<h1> This is Write Board</h1>`;
    return html;
}

function addForm() {
    return `
        <form action="http://google.com" method="post">
                <table  style="padding-top:50px" align = center width=700 border=0 cellpadding=2 >
                <tr>
                    <td height=20 align= center bgcolor=#ccc><font color=white>글쓰기</font></td>
                </tr>
                <tr>
                    <td bgcolor=white>
                    <table class = "table2">
                            <tr>
                            <td>작성자</td>
                            <td><input type ="text" name = name size=20 value = ""> </td>
                            </tr>

                            <tr>
                            <td>제목</td>
                            <td><input type = text name = title size=60 placeholder="입력하세요."></td>
                            </tr>

                            <tr>
                            <td>내용</td>
                            <td><textarea name = content cols=85 rows=15></textarea></td>
                            </tr>

                            </table>

                            <center>
                                <input type="button" id="submit-form"value="작성"/>
                            </center>
                            </td>
                </tr>
        </table>
    </form>`
}
