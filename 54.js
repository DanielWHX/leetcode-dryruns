
const matrix=[[1,2,3],[4,5,6],[7,8,9]];
const src=[
[0,"class Solution:"],[1,"def spiralOrder(self, matrix):"],[2,"m, n = len(matrix), len(matrix[0])"],[2,"res = []"],[0,""],[2,"top, bottom = 0, m - 1"],[2,"left, right = 0, n - 1"],[0,""],[2,"while top <= bottom and left <= right:"],[3,"# 1. Right: top row"],[3,"for j in range(left, right + 1):"],[4,"res.append(matrix[top][j])"],[3,"top += 1"],[0,""],[3,"# 2. Down: right column"],[3,"for i in range(top, bottom + 1):"],[4,"res.append(matrix[i][right])"],[3,"right -= 1"],[0,""],[3,"# 3. Left: bottom row"],[3,"if top <= bottom:"],[4,"for j in range(right, left - 1, -1):"],[5,"res.append(matrix[bottom][j])"],[4,"bottom -= 1"],[0,""],[3,"# 4. Up: left column"],[3,"if left <= right:"],[4,"for i in range(bottom, top - 1, -1):"],[5,"res.append(matrix[i][left])"],[4,"left += 1"],[0,""],[2,"return res"]
];
const $=id=>document.getElementById(id),code=$("code"),steps=[];let top=0,bottom=2,left=0,right=2,seen=[],res=[];
function snap(line,title,description,target=null){steps.push({line,title,description,target,top,bottom,left,right,seen:[...seen],res:[...res]})}
src.forEach(([ind,txt],i)=>{const div=document.createElement("div");div.className="line"+(txt.trim().startsWith("#")?" comment":"");div.dataset.num=i+1;const ln=document.createElement("span");ln.className="ln";ln.textContent=i+1;const codeText=document.createElement("span");codeText.textContent=" ".repeat(ind*4)+txt;div.append(ln,codeText);code.append(div)});
const cells=[];matrix.forEach((row,i)=>row.forEach((value,j)=>{const el=document.createElement("div");el.className="cell";const label=document.createElement("span");label.textContent=value;const coord=document.createElement("small");coord.textContent="["+i+","+j+"]";el.append(label,coord);$("matrix").append(el);cells.push({i,j,el})}));
["top","bottom","left","right"].forEach(x=>{const d=document.createElement("div");d.className="stat";d.innerHTML="<span class='muted'>"+x+"</span><b id='v-"+x+"'></b>";$("stats").append(d)});
snap(3,"Read Matrix dimensions","m = 3, n = 3。");snap(4,"Initialize result","res = []。");snap(6,"Initialize row boundaries","top = 0, bottom = 2。");snap(7,"Initialize column boundaries","left = 0, right = 2。");
while(true){const valid=top<=bottom&&left<=right;snap(9,"while condition",valid?"True：仍有未访问区域，继续下一圈。":"False：未访问区域已经为空，退出 while。");if(!valid)break;
for(let j=left;j<=right;j++){snap(11,"Right · for","j = "+j+"；准备访问 matrix["+top+"]["+j+"]。",[top,j]);seen.push(top+","+j);res.push(matrix[top][j]);snap(12,"Right · append","将 "+matrix[top][j]+" 添加到 res。",[top,j])}
top++;snap(13,"Update top","top += 1 → top = "+top+"，已处理最上方一行。");
for(let i=top;i<=bottom;i++){snap(16,"Down · for","i = "+i+"；准备访问 matrix["+i+"]["+right+"]。",[i,right]);seen.push(i+","+right);res.push(matrix[i][right]);snap(17,"Down · append","将 "+matrix[i][right]+" 添加到 res。",[i,right])}
right--;snap(18,"Update right","right -= 1 → right = "+right+"。");
const rowValid=top<=bottom;snap(21,"Check remaining bottom row",rowValid?"True：仍有 Bottom Row，开始向左。":"False：没有剩余 Row，跳过 Left，避免重复访问。");
if(rowValid){for(let j=right;j>=left;j--){snap(22,"Left · for","j = "+j+"；准备访问 matrix["+bottom+"]["+j+"]。",[bottom,j]);seen.push(bottom+","+j);res.push(matrix[bottom][j]);snap(23,"Left · append","将 "+matrix[bottom][j]+" 添加到 res。",[bottom,j])}bottom--;snap(24,"Update bottom","bottom -= 1 → bottom = "+bottom+"。")}
const colValid=left<=right;snap(27,"Check remaining left column",colValid?"True：仍有 Left Column，开始向上。":"False：没有剩余 Column，跳过 Up，避免重复访问。");
if(colValid){for(let i=bottom;i>=top;i--){snap(28,"Up · for","i = "+i+"；准备访问 matrix["+i+"]["+left+"]。",[i,left]);seen.push(i+","+left);res.push(matrix[i][left]);snap(29,"Up · append","将 "+matrix[i][left]+" 添加到 res。",[i,left])}left++;snap(30,"Update left","left += 1 → left = "+left+"。")}}
snap(32,"Return result","返回完整 Spiral Order。");
let index=0;$("slider").max=steps.length-1;
function render(){const s=steps[index];$("progress").textContent=(index+1)+" / "+steps.length;$("lineLabel").textContent="Line "+s.line;$("stepTitle").textContent=s.title;$("description").textContent=s.description;$("result").textContent="["+s.res.join(", ")+"]";$("slider").value=index;
["top","bottom","left","right"].forEach(x=>$("v-"+x).textContent=s[x]);cells.forEach(({i,j,el})=>{el.className="cell";if(s.seen.includes(i+","+j))el.classList.add("visited");if(s.target&&s.target[0]===i&&s.target[1]===j)el.classList.add("active")});
code.querySelectorAll(".line").forEach(el=>el.classList.toggle("on",Number(el.dataset.num)===s.line));$("prev").disabled=index===0;$("next").disabled=index===steps.length-1;
const active=code.querySelector(".line.on");if(active&&code.clientHeight<code.scrollHeight)active.scrollIntoView({block:"nearest"})}
$("prev").onclick=()=>{index=Math.max(0,index-1);render()};$("next").onclick=()=>{index=Math.min(steps.length-1,index+1);render()};$("reset").onclick=()=>{index=0;render()};$("slider").oninput=e=>{index=Number(e.target.value);render()};
document.addEventListener("keydown",e=>{if(e.target.tagName==="INPUT")return;if(e.key==="ArrowRight")$("next").click();if(e.key==="ArrowLeft")$("prev").click()});render();
