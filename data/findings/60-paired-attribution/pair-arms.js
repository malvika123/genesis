const fs=require('fs'),D=process.argv[2];
const arms=['A-all-off','B-expectations-only','C-everything','D-copy-by-surprise'];
const L={};for(const a of arms){L[a]={};for(let s=1;s<=24;s++)L[a][s]=JSON.parse(fs.readFileSync(`${D}/${a}/world-${s}.json`))}
const tot=c=>Object.values(c).reduce((x,y)=>x+y,0);
const m={hunger:w=>{const t=tot(w.causes);return t?(w.causes.hunger||0)/t:0},
 hungerN:w=>w.causes.hunger||0, deaths:w=>tot(w.causes), nEnd:w=>w.nEnd, born:w=>w.born, growth:w=>w.growth};
// pooled share
for(const a of arms){let h=0,t=0;for(let s=1;s<=24;s++){h+=L[a][s].causes.hunger||0;t+=tot(L[a][s].causes)}
 console.log(a.padEnd(22),'pooled hunger share',(100*h/t).toFixed(1)+'%','('+h+'/'+t+')','mean end',(Object.values(L[a]).reduce((x,w)=>x+w.nEnd,0)/24).toFixed(1),'born',(Object.values(L[a]).reduce((x,w)=>x+w.born,0)/24).toFixed(1))}
function pair(a,b,f,name){const d=[];for(let s=1;s<=24;s++)d.push(f(L[b][s])-f(L[a][s]));
 const n=d.length,mu=d.reduce((x,y)=>x+y,0)/n,sd=Math.sqrt(d.reduce((x,y)=>x+(y-mu)**2,0)/(n-1)),se=sd/Math.sqrt(n);
 // bootstrap
 let r=1,bs=[];const rnd=()=>{r=(r*16807)%2147483647;return r/2147483647};
 for(let k=0;k<4000;k++){let s=0;for(let i=0;i<n;i++)s+=d[Math.floor(rnd()*n)];bs.push(s/n)}bs.sort((x,y)=>x-y);
 const up=d.filter(x=>x>0).length,dn=d.filter(x=>x<0).length;
 console.log(`${a[0]}->${b[0]} ${name.padEnd(7)} diff ${mu.toFixed(3)}  95% [${bs[100].toFixed(3)}, ${bs[3900].toFixed(3)}]  up ${up} down ${dn}`)}
for(const [a,b] of [['A-all-off','B-expectations-only'],['B-expectations-only','C-everything'],['A-all-off','C-everything'],['C-everything','D-copy-by-surprise']]){
 for(const k of Object.keys(m))pair(a,b,m[k],k);console.log()}
