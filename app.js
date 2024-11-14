let responce = "";
let userPromt = "";
function chat() {
    console.log("Hello");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let promt = document.getElementById("txtPromt").value;
    document.getElementById("promtTxt").innerHTML += `     
                <div class="flex justify-end mb-4">
                    <div class="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                        <p>${promt}</p>
                    </div>
                </div>
`

    const raw = JSON.stringify({
        "contents": [
            {
                "parts": [
                    {
                        "text": promt
                    }
                ]
            }
        ]
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCxZHOkye6QRNQKtjsx5sx3nebCmCCjWK0", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
            const text = result.candidates[0].content.parts[0].text;

            responce += `
                       <div class="flex justify-start mb-4">
                    <div class="bg-gray-300 text-gray-800 p-3 rounded-lg max-w-xs">
                        <p>${text}</p>
                    </div>
                </div>
            `

            document.getElementById("lblLog").innerHTML = responce;

        })
        .catch((error) => console.error(error));

}
