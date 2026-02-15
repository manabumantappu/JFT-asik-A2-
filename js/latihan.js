let index=0;
let score=0;

function load(){
const q=questionData[index];
document.getElementById("questionBox").innerHTML=`
<h2 class="font-semibold mb-3">${q.question}</h2>
${q.options.map((opt,i)=>`
<button onclick="answer(${i})"
class="block w-full text-left p-3 border rounded-xl mb-2">${opt}</button>
`).join("")}
<p class="mt-3">Skor: ${score}</p>
`;
}

function answer(i){
if(i===questionData[index].answer){
score++;
alert("Benar!");
}else{
alert("Salah!\n"+questionData[index].explanation);
}
index=(index+1)%questionData.length;
load();
}

load();
