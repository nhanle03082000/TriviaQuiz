import{b as h,u as b,r as l,a as i,p as g,j as t}from"./index-BlNNcAgR.js";import{u as j}from"./useDispatch-B1lHCxY1.js";const w=()=>{const d=h(),a=b(),c=j(),x=d.state,{answers:s,questions:r}=x,{correctCount:u,scoreColor:m}=l.useMemo(()=>{c(i.startLoading());let e=0;r.forEach(n=>{s[n.question]===n.correct_answer&&e++}),c(i.stopLoading());const o=e<=1?"text-red-500":e<=3?"text-yellow-500":"text-green-500";return{correctCount:e,scoreColor:o}},[r,s]),p=l.useCallback(()=>{a(g.triviaQuiz)},[a]);return t.jsxs("div",{className:"max-w-2xl p-4 mx-auto my-8 rounded-lg shadow-lg",children:[t.jsx("h1",{className:"mb-6 text-3xl font-bold text-center",children:"Quiz Results"}),r.map((e,o)=>t.jsxs("div",{className:"p-4 mb-4 bg-gray-100 rounded-md",children:[t.jsx("h2",{className:"text-xl font-semibold",children:e.question}),t.jsxs("p",{className:`my-2 ${s[e.question]===e.correct_answer?"text-green-500":"text-red-500"}`,children:["Your Answer: ",s[e.question]]}),t.jsxs("p",{className:"text-green-500",children:["Correct Answer: ",e.correct_answer]})]},o)),t.jsxs("div",{className:"p-4 mt-6 text-center border-t",children:[t.jsxs("p",{className:`text-2xl font-bold ${m}`,children:["Your Score: ",u," / ",r.length]}),t.jsx("button",{className:"px-6 py-2 mt-4 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600",onClick:p,children:"Create A New Quiz"})]})]})},f=w;export{f as default};
