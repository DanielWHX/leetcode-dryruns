import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html = fs.readFileSync(new URL('./1249.html', import.meta.url), 'utf8');
const engine = html.match(/<script id="trace-engine">([\s\S]*?)<\/script>/)[1];
const box = {module:{exports:{}}}; vm.createContext(box); vm.runInContext(engine,box);
const {buildTrace1249:trace} = box.module.exports;
function valid(s) {let b=0;for(const c of s){if(c==='(')b++;if(c===')'&&--b<0)return false;}return b===0;}
function subsequence(a,b) {let j=0;for(const c of b)if(a[j]===c)j++;return j===a.length;}
function bruteMin(s){
  const p=[...s].filter(c=>c==='('||c===')').length;let best=Infinity;
  for(let mask=0;mask<2**p;mask++){
    let bit=0,del=0,out='';
    for(const c of s){if(c==='('||c===')'){if(mask&(1<<bit++)){del++;continue;}}out+=c;}
    if(valid(out))best=Math.min(best,del);
  }return best;
}
function check(s,brute=false){
  const t=trace(s);assert(valid(t.result),s+' invalid '+t.result);
  assert(subsequence(t.result,s));assert.equal(t.result.replace(/[()]/g,''),s.replace(/[()]/g,''));
  assert.equal(t.removedCount,s.length-t.result.length);
  let left=0,right=0;for(const c of s){if(c==='(')left++;else if(c===')'){if(left)left--;else right++;}}
  assert.equal(t.removedCount,left+right);if(brute)assert.equal(t.removedCount,bruteMin(s));
  assert.equal(t.frames.at(-1).cnt,0);assert.equal(t.frames[t.pass2Start].cnt,t.pass1Count);
  for(const f of t.frames){
    assert(f.cnt>=0);assert.equal(new Set(f.removed).size,f.removed.length);
    if(f.phase===1){let balance=0;for(const {ch} of f.res){if(ch==='(')balance++;if(ch===')')balance--;assert(balance>=0);}assert.equal(balance,f.cnt);}
    if(f.phase===2){const suffix=t.pass1.slice(t.pass1.length-f.step);const deleted=suffix.filter(x=>f.removed.includes(x.original)).length;assert.equal(f.cnt,t.pass1Count-deleted);}
  }return t;
}
const examples=[['a)b(c)d((', 'ab(c)d'],['a(b)c(', 'a(b)c'],['(()','()'],['()(', '()'],[')(',''],['lee(t(c)o)de)','lee(t(c)o)de'],['abc','abc'],['','']];
for(const [s,want] of examples)assert.equal(check(s,true).result,want);
let tested=0;
function exhaust(prefix,remaining){check(prefix,true);tested++;if(remaining)for(const c of ['(',')','a'])exhaust(prefix+c,remaining-1);}
exhaust('',8);
let seed=1249;const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/2**32;};
for(let i=0;i<1000;i++){let s='';const len=Math.floor(rand()*121);for(let j=0;j<len;j++)s+='()abc'[Math.floor(rand()*5)];check(s);}
assert.throws(()=>trace('ABC'));assert.throws(()=>trace('a b'));assert.throws(()=>trace('<script>'));
assert.throws(()=>trace('a'.repeat(121)));assert.throws(()=>trace(null));
for(const m of html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g))new vm.Script(m[1]);
console.log(`PASS: ${tested} exhaustive inputs (length 0–8, alphabet ()a) checked against brute force; 1,000 deterministic random inputs; 8 named examples; validation and JavaScript syntax.`);
