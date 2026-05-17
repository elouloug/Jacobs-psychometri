import { useState } from "react";

const SECTIONS = [
  { id:"analogies", name:"אֲנָלוֹגִיּוֹת מִילוּלִיּוֹת", emoji:"🔗", desc:"מְצָא אֶת הַקֶּשֶׁר בֵּין מִלִּים",  color:"#c0392b", bg:"#fdf2f2" },
  { id:"completion", name:"הַשְׁלָמַת מִשְׁפָּטִים",      emoji:"✏️", desc:"מַלֵּא אֶת הַמִּלָּה הַחֲסֵרָה",  color:"#7d3c98", bg:"#f5f0fa" },
  { id:"math",       name:"בְּעָיוֹת מִילוּלִיּוֹת",     emoji:"🧮", desc:"פְּתוֹר בְּעָיוֹת חֶשְׁבּוֹן",    color:"#1a5276", bg:"#eaf4fb" },
  { id:"shapes",     name:"מִסְפָּרִים בְּצוּרוֹת",      emoji:"🔷", desc:"מְצָא אֶת הַמִּסְפָּר הַחָסֵר",  color:"#1e8449", bg:"#eafaf1" },
  { id:"sequences",  name:"סְדָרוֹת מִסְפָּרִים",        emoji:"📊", desc:"מְצָא אֶת הַדָּפוּס בַּסְּדָרָה", color:"#9a7d0a", bg:"#fef9e7" },
  { id:"figural",    name:"חֲשִׁיבָה צוּרָנִית",         emoji:"🎯", desc:"מְצָא אֶת הַצּוּרָה הַבָּאָה",   color:"#0e6655", bg:"#e8f8f5" },
];

const OK  = ["🌟 כָּל הַכָּבוֹד!","🔥 מְצֻיָּן!","⭐ נָכוֹן מְאוֹד!","🚀 מַדְהִים!","💪 חָזָק!","🏆 יָפֶה מְאוֹד!","✨ פַּנְטַסְטִי!"];
const NOK = ["💡 כִּמְעַט!","📚 לֹא נוֹרָא!","💪 הַמְשֵׁךְ!","🤔 בַּפַּעַם הַבָּאָה!","🌈 נַסֵּה שׁוּב!"];
const pick = a => a[Math.floor(Math.random()*a.length)];

function makePrompt(id) {
  const detail = {
    analogies:`אֲנָלוֹגִיּוֹת מִילוּלִיּוֹת (יַחֲסֵי מִלִּים).
פּוֹרְמַט: "מִלָּה א : מִלָּה ב — כְּמוֹ — מִלָּה ג : ___?"
4 תְּשׁוּבוֹת הֵן זוּגוֹת מִלִּים; רַק זוּג אֶחָד מְקַיֵּים אֶת אוֹתוֹ קֶשֶׁר.`,
    completion:`הַשְׁלָמַת מִשְׁפָּטִים.
מִשְׁפָּט עִם מִלָּה חֲסֵרָה (___). 4 מִלִּים; רַק אַחַת מַתְאִימָה לְפִי הֶגְיוֹן וְתַחְבִּיר.`,
    math:`בְּעָיוֹת מִילוּלִיּוֹת בְּ-2-3 פְּעֻלּוֹת חֶשְׁבּוֹנִיּוֹת (חִיבּוּר/חִיסּוּר/כֶּפֶל/חִילּוּק).
מִסְפָּרִים שְׁלֵמִים. תּוֹצָאוֹת שְׁלֵמוֹת. גִּיל 8-9. 4 תְּשׁוּבוֹת מִסְפָּרִיּוֹת.`,
    shapes:`מִסְפָּרִים בְּצוּרוֹת.
תָּאֵר צוּרָה גֵּאוֹמֶטְרִית (עִיגּוּל/רִיבּוּעַ/מְשׁוּלָּשׁ) עִם מִסְפָּרִים בַּחֲלָקֶיהָ וּמִסְפָּר חָסֵר (?).
הַסְבֵּר אֶת הַצּוּרָה בְּתוֹךְ טֶקְסְט הַשְּׁאֵלָה.`,
    sequences:`סְדָרוֹת מִסְפָּרִים עִם ? חָסֵר בַּסּוֹף אוֹ בָּאֶמְצַע.
שִׂים אֶת הַסְּדָרָה כְּמַחְרוֹזֶת בְּשָׂדֶה sequence (לְדוּגְמָה: "2 , 4 , 6 , 8 , ?").`,
    figural:`רִצְפֵי צוּרוֹת — חֲשִׁיבָה צוּרָנִית.
הִשְׁתַּמֵּשׁ בְּסִימָנִים: ◯ △ □ ★ ♦ ● ■ ▲ ♠ ♥
רֶצֶף 5-7 סִימָנִים עִם ? חָסֵר. שִׂים בְּשָׂדֶה sequence.`
  };
  return `אַתָּה יוֹצֵר שְׁאֵלוֹת תִּרְגּוּל לִבְחִינַת מְחוֹנָנִים שַׁלַב ב׳ לְכִיתָה ג׳ בְּיִשְׂרָאֵל (גִּיל 8).
נוֹשֵׂא: ${detail[id]}

חָשׁוּב מְאוֹד:
• שְׁאֵלָה 1 קַלָּה מְאוֹד ← שְׁאֵלָה 10 קָשָׁה מְאוֹד (עֲלִיָּה הַדְרָגָתִית בְּרוּרָה)
• כָּל הַשְּׁאֵלוֹת, הַתְּשׁוּבוֹת וְהַהֶסְבֵּרִים — בְּעִבְרִית עִם נִיקּוּד מָלֵא בִּלְבַד
• וַדָּא שֶׁרַק תְּשׁוּבָה אַחַת מִתּוֹךְ אַרְבַּע הִיא הַנְּכוֹנָה

הַחְזֵר JSON בִּלְבַד (לְלֹא markdown, לְלֹא backticks):
[{"question":"...","sequence":null,"options":["א. ...","ב. ...","ג. ...","ד. ..."],"correct":0,"explanation":"..."}]
(sequence = null אוֹ מַחְרוֹזֶת לִסְדָרוֹת/צוּרוֹת)`;
}

const stars = n => n===10?"🌟🌟🌟🌟":n>=8?"⭐⭐⭐":n>=5?"⭐⭐":"⭐";
const resultMsg = n => n===10?"מֻשְׁלָם לְגַמְרֵי! אַלּוּף אֲמִיתִּי! 🏆":n>=8?"כָּל הַכָּבוֹד! תּוֹצָאָה מְעֻלָּה! 🎉":n>=5?"יָפֶה מְאוֹד! עוֹד קְצָת תִּרְגּוּל וְתִהְיֶה מֻשְׁלָם! 📚":"הַמְשֵׁךְ לְתַרְגֵּל – כָּכָה לוֹמְדִים וּמִשְׁתַּפְּרִים! 💪";

export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [sec,    setSec]    = useState(null);
  const [qs,     setQs]     = useState([]);
  const [qi,     setQi]     = useState(0);
  const [sel,    setSel]    = useState(null);
  const [fb,     setFb]     = useState(false);
  const [score,  setScore]  = useState(0);
  const [streak, setStreak] = useState(0);
  const [msg,    setMsg]    = useState("");
  const [err,    setErr]    = useState("");
  const [bests,  setBests]  = useState({});

  const load = async s => {
    setSec(s); setScreen("loading"); setErr("");
    try {
      const r = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: makePrompt(s.id) })
      });
      const d = await r.json();
      const txt = d.content?.find(b => b.type === "text")?.text || "";
      const parsed = JSON.parse(txt.replace(/```json|```/g, "").trim());
      if (!Array.isArray(parsed) || parsed.length < 5) throw new Error("bad");
      setQs(parsed); setQi(0); setScore(0); setStreak(0);
      setSel(null); setFb(false); setMsg(""); setScreen("quiz");
    } catch { setErr("שְׁגִיאָה בִּטְעִינָה. אָנָּא נַסֵּה שׁוּב."); setScreen("select"); }
  };

  const answer = idx => {
    if (fb) return;
    setSel(idx); setFb(true);
    if (qs[qi]?.correct === idx) { setScore(c => c+1); setStreak(s => s+1); setMsg(pick(OK)); }
    else { setStreak(0); setMsg(pick(NOK)); }
  };

  const next = () => {
    if (qi+1 >= qs.length) { setBests(p => ({...p, [sec.id]: Math.max(score, p[sec.id]||0)})); setScreen("result"); }
    else { setQi(i => i+1); setSel(null); setFb(false); }
  };

  const q   = qs[qi] || {};
  const pct = qs.length ? ((qi+(fb?1:0)) / qs.length) * 100 : 0;
  const isOk = sel === q.correct;

  const W = { direction:"rtl", fontFamily:'Arial,"Segoe UI",sans-serif', minHeight:"100vh", background:"#eef2ff", padding:"16px" };
  const Card = extra => ({ background:"#fff", borderRadius:"22px", padding:"28px", maxWidth:"520px", margin:"0 auto", boxShadow:"0 6px 28px rgba(100,116,234,0.13)", ...extra });
  const Btn = (color="#667eea", extra={}) => ({ background:color, color:"#fff", border:"none", borderRadius:"12px", padding:"14px 28px", fontSize:"16px", fontWeight:"bold", cursor:"pointer", fontFamily:"inherit", width:"100%", marginBottom:"8px", ...extra });

  if (screen === "welcome") return (
    <div style={W}>
      <div style={Card({textAlign:"center"})}>
        <div style={{fontSize:68, marginBottom:8}}>🦸</div>
        <h1 style={{fontSize:26, fontWeight:"bold", color:"#2c3e50", margin:"0 0 6px"}}>מְתַרְגְּלִים מְחוֹנָנִים!</h1>
        <p style={{color:"#7f8c8d", fontSize:15, margin:"0 0 24px"}}>תִּרְגּוּל לִבְחִינַת מְחוֹנָנִים שַׁלַב ב׳ — כִּיתָה ג׳</p>
        <div style={{background:"#f4f6ff", borderRadius:16, padding:"18px 20px", marginBottom:24, textAlign:"right"}}>
          {[
            "✅ 6 נוֹשְׂאִים — בְּדִיּוּק כְּמוֹ בַּמִּבְחָן הָאֲמִיתִּי",
            "✅ 10 שְׁאֵלוֹת בְּכָל נוֹשֵׂא — שֶׁנַּעֲשׂוֹת קָשׁוֹת יוֹתֵר",
            "✅ שְׁאֵלוֹת חֲדָשׁוֹת כָּל פַּעַם — אַף פַּעַם לֹא חוֹזְרִים!",
            "✅ הֶסְבֵּר מָלֵא לְכָל תְּשׁוּבָה"
          ].map((t,i) => <div key={i} style={{fontSize:15, lineHeight:2, color:"#34495e"}}>{t}</div>)}
        </div>
        <button style={Btn()} onClick={() => setScreen("select")}>יַאלָּה נַתְחִיל! 🚀</button>
      </div>
    </div>
  );

  if (screen === "select") return (
    <div style={W}>
      <div style={Card()}>
        <h2 style={{fontSize:22, fontWeight:"bold", textAlign:"center", color:"#2c3e50", margin:"0 0 4px"}}>בְּחַר נוֹשֵׂא לְתַרְגּוּל</h2>
        <p style={{textAlign:"center", color:"#7f8c8d", fontSize:14, margin:"0 0 20px"}}>בְּאֵיזֶה נוֹשֵׂא נְתַרְגֵּל הַיּוֹם?</p>
        {err && <div style={{background:"#fdecea", color:"#c0392b", borderRadius:10, padding:12, marginBottom:14, fontSize:14}}>{err}</div>}
        {SECTIONS.map(s => (
          <div key={s.id} onClick={() => load(s)}
            style={{display:"flex", alignItems:"center", gap:14, background:s.bg, border:`2px solid ${s.color}22`, borderRadius:14, padding:15, cursor:"pointer", marginBottom:10, transition:"all .15s"}}
            onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.transform = "translateX(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = `${s.color}22`; e.currentTarget.style.transform = ""; }}>
            <span style={{fontSize:26, minWidth:34}}>{s.emoji}</span>
            <div style={{flex:1}}>
              <div style={{fontWeight:"bold", color:s.color, fontSize:15}}>{s.name}</div>
              <div style={{fontSize:12, color:"#95a5a6", marginTop:2}}>{s.desc}</div>
            </div>
            {bests[s.id] !== undefined && <div style={{background:s.color, color:"#fff", borderRadius:20, padding:"3px 10px", fontSize:13, fontWeight:"bold"}}>{bests[s.id]}/10</div>}
            <span style={{color:s.color, fontSize:18, fontWeight:"bold"}}>←</span>
          </div>
        ))}
      </div>
    </div>
  );

  if (screen === "loading") return (
    <div style={{...W, display:"flex", alignItems:"center", justifyContent:"center"}}>
      <div style={Card({textAlign:"center", padding:"52px 32px"})}>
        <div style={{fontSize:56, marginBottom:14}}>{sec?.emoji}</div>
        <div style={{fontSize:20, fontWeight:"bold", color:"#2c3e50", marginBottom:6}}>מֵכִין שְׁאֵלוֹת...</div>
        <div style={{fontSize:14, color:"#7f8c8d", marginBottom:22}}>בּוֹנֶה 10 שְׁאֵלוֹת בְּ{sec?.name}</div>
        <div style={{height:6, background:"#e8eaf6", borderRadius:3, overflow:"hidden"}}>
          <div style={{height:"100%", background:sec?.color, borderRadius:3, animation:"bar 1.4s ease-in-out infinite alternate"}}/>
        </div>
        <style>{`@keyframes bar{from{width:15%;margin-right:85%}to{width:75%;margin-right:0%}}`}</style>
      </div>
    </div>
  );

  if (screen === "quiz") return (
    <div style={W}>
      <div style={Card()}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12}}>
          <button onClick={() => setScreen("select")} style={{background:"none", border:"none", cursor:"pointer", color:"#95a5a6", fontSize:13, fontFamily:"inherit", padding:"4px 6px"}}>← חֲזוֹר</button>
          <div style={{fontWeight:"bold", color:sec.color, fontSize:14}}>{sec.emoji} {sec.name}</div>
          <div style={{display:"flex", gap:8, alignItems:"center"}}>
            {streak >= 2 && <span style={{background:"#e67e22", color:"#fff", borderRadius:12, padding:"2px 8px", fontSize:11, fontWeight:"bold"}}>🔥{streak}</span>}
            <span style={{fontWeight:"bold", color:"#f39c12", fontSize:14}}>⭐{score}</span>
            <span style={{color:"#95a5a6", fontSize:13}}>{qi+1}/{qs.length}</span>
          </div>
        </div>
        <div style={{height:6, background:"#e8eaf6", borderRadius:3, marginBottom:20, overflow:"hidden"}}>
          <div style={{height:"100%", background:sec.color, borderRadius:3, width:`${pct}%`, transition:"width .4s ease"}}/>
        </div>
        <div style={{background:`${sec.color}12`, borderRadius:16, padding:20, marginBottom:18, border:`1.5px solid ${sec.color}28`}}>
          <div style={{fontSize:11, color:sec.color, fontWeight:"bold", marginBottom:10, letterSpacing:.5}}>שְׁאֵלָה {qi+1}</div>
          <div style={{fontSize:17, lineHeight:1.75, color:"#2c3e50", fontWeight:500}}>{q.question}</div>
          {q.sequence && (
            <div style={{marginTop:16, background:"#fff", borderRadius:12, padding:"14px 10px", textAlign:"center", fontSize:22, letterSpacing:8, border:`2px dashed ${sec.color}55`, color:"#2c3e50", fontFamily:"monospace", wordBreak:"break-all"}}>
              {q.sequence}
            </div>
          )}
        </div>
        {(q.options||[]).map((opt, i) => {
          let bg="#fff", border="#e0e0e0", col="#2c3e50", fw=400;
          if (fb) {
            if (i === q.correct) { bg="#eafaf1"; border="#27ae60"; col="#1e8449"; fw=700; }
            else if (i === sel)  { bg="#fdedec"; border="#e74c3c"; col="#c0392b"; }
            else                 { col="#bbb"; }
          }
          return (
            <button key={i} onClick={() => answer(i)}
              style={{display:"block", width:"100%", textAlign:"right", padding:"13px 18px", borderRadius:12, fontSize:16, cursor:fb?"default":"pointer", fontFamily:"inherit", fontWeight:fw, border:`2px solid ${border}`, background:bg, color:col, marginBottom:8, transition:"all .15s"}}
              onMouseEnter={e => { if (!fb) e.currentTarget.style.background = "#f0f4ff"; }}
              onMouseLeave={e => { if (!fb) e.currentTarget.style.background = bg; }}>
              {opt}
            </button>
          );
        })}
        {fb && (
          <div style={{background:isOk?"#eafaf1":"#fef5ec", borderRadius:16, padding:18, marginTop:12, border:`2px solid ${isOk?"#27ae6055":"#f39c1255"}`}}>
            <div style={{fontWeight:"bold", fontSize:20, marginBottom:8, color:isOk?"#1e8449":"#d35400"}}>{msg}</div>
            <div style={{fontSize:14, color:"#555", lineHeight:1.65}}>💡 {q.explanation}</div>
            <div style={{display:"flex", justifyContent:"flex-start", marginTop:14}}>
              <button onClick={next} style={{background:sec.color, color:"#fff", border:"none", borderRadius:12, padding:"12px 28px", fontSize:16, fontWeight:"bold", cursor:"pointer", fontFamily:"inherit"}}>
                {qi+1 >= qs.length ? "🏆 רְאֵה תוֹצָאוֹת" : "הַבָּא ←"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (screen === "result") return (
    <div style={{...W, display:"flex", alignItems:"center", justifyContent:"center"}}>
      <div style={Card({textAlign:"center", padding:"36px 28px"})}>
        <div style={{fontSize:72, marginBottom:10}}>{score>=9?"🏆":score>=6?"🌟":"💪"}</div>
        <h2 style={{fontSize:26, fontWeight:"bold", color:"#2c3e50", margin:"0 0 8px"}}>{score>=9?"מֻשְׁלָם!":score>=6?"כָּל הַכָּבוֹד!":"יָפֶה מְאוֹד!"}</h2>
        <div style={{fontSize:54, fontWeight:"bold", color:sec.color, margin:"14px 0"}}>
          {score}<span style={{fontSize:28, color:"#95a5a6"}}>/10</span>
        </div>
        <div style={{fontSize:34, marginBottom:18}}>{stars(score)}</div>
        <div style={{background:"#f4f6ff", borderRadius:14, padding:"14px 20px", marginBottom:24, fontSize:15, color:"#555", lineHeight:1.7}}>
          {resultMsg(score)}
        </div>
        <button style={Btn(sec.color)} onClick={() => load(sec)}>🔄 תְּרַגֵּל שׁוּב</button>
        <button style={Btn("#bdc3c7", {color:"#555"})} onClick={() => setScreen("select")}>📚 בְּחַר נוֹשֵׂא אַחֵר</button>
      </div>
    </div>
  );

  return null;
}
