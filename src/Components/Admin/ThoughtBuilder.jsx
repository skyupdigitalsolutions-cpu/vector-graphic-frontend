/**
 * VectorGraphic Thought Builder  (JWT-auth edition)
 * Drop this file into:  src/Components/Admin/ThoughtBuilder.jsx
 * Requires:  src/context/AuthContext.jsx
 */

import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  Plus, Trash2, Image as ImageIcon, Link as LinkIcon, Type, List,
  Settings, Upload, Send, Eye, EyeOff, ChevronDown, ChevronUp,
  AlertCircle, CheckCircle, Loader, X, LogIn, LogOut,
  Edit3, Search, ArrowLeft, FileText,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

// ─── Config ───────────────────────────────────────────────────────────────────
const CL_CLOUD  = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CL_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const GH_TOKEN  = import.meta.env.VITE_GH_TOKEN;
const GH_REPO   = import.meta.env.VITE_GH_REPO || "YOUR_GITHUB_USERNAME/YOUR_REPO_NAME";
const GH_BRANCH = "main";
const GH_FILE   = "src/data/thoughtsData.js";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const slugify = (str = "") =>
  str.toLowerCase().trim()
    .replace(/[""''"`]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const compressAndUpload = (file, { maxW = 1400, quality = 0.82 } = {}) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = async () => {
      URL.revokeObjectURL(url);
      let { width: w, height: h } = img;
      if (w > maxW) { h = Math.round((h * maxW) / w); w = maxW; }
      const canvas = document.createElement("canvas");
      canvas.width = w; canvas.height = h;
      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
      canvas.toBlob(async (blob) => {
        if (!blob) return reject(new Error("Canvas failed"));
        const form = new FormData();
        form.append("file", blob, file.name.replace(/\.[^.]+$/, ".webp"));
        form.append("upload_preset", CL_PRESET);
        try {
          const res  = await fetch(`https://api.cloudinary.com/v1_1/${CL_CLOUD}/image/upload`, { method: "POST", body: form });
          const data = await res.json();
          if (!res.ok) return reject(new Error(data?.error?.message || `HTTP ${res.status}`));
          resolve(data.secure_url);
        } catch (e) { reject(e); }
      }, "image/webp", quality);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Image load failed")); };
    img.src = url;
  });

// ─── Heading size map (inline styles for dark canvas) ────────────────────────
const HEADING_STYLE = {
  h2: { fontSize: 22, color: "#fff",  fontWeight: 700 },
  h3: { fontSize: 17, color: "#ddd",  fontWeight: 600 },
  h4: { fontSize: 15, color: "#ccc",  fontWeight: 600 },
  h5: { fontSize: 13, color: "#bbb",  fontWeight: 600 },
  h6: { fontSize: 12, color: "#aaa",  fontWeight: 600 },
};

// Preview heading sizes (light page)
const HEADING_PREVIEW_STYLE = {
  h2: { fontSize: 22, color: "#111", fontWeight: 700 },
  h3: { fontSize: 17, color: "#111", fontWeight: 600 },
  h4: { fontSize: 15, color: "#222", fontWeight: 600 },
  h5: { fontSize: 13, color: "#333", fontWeight: 600 },
  h6: { fontSize: 12, color: "#444", fontWeight: 600 },
};

const TOC_TYPES = new Set([
  "h2","h3","h4","h5","h6",
  "h2_with_link","h3_with_link","h4_with_link","h5_with_link","h6_with_link",
]);
const getHeadingTag = (type) => type.replace("_with_link","");

// ─── Element types ────────────────────────────────────────────────────────────
const ELEMENT_TYPES = [
  { type: "p",               icon: Type,      label: "Para" },
  { type: "h2",              icon: Type,      label: "H2" },
  { type: "h3",              icon: Type,      label: "H3" },
  { type: "h4",              icon: Type,      label: "H4" },
  { type: "h5",              icon: Type,      label: "H5" },
  { type: "h6",              icon: Type,      label: "H6" },
  { type: "h2_with_link",    icon: LinkIcon,  label: "H2+Link" },
  { type: "h3_with_link",    icon: LinkIcon,  label: "H3+Link" },
  { type: "h4_with_link",    icon: LinkIcon,  label: "H4+Link" },
  { type: "h5_with_link",    icon: LinkIcon,  label: "H5+Link" },
  { type: "h6_with_link",    icon: LinkIcon,  label: "H6+Link" },
  { type: "bold",            icon: Type,      label: "Bold Para" },
  { type: "quote",           icon: FileText,  label: "Quote" },
  { type: "ul",              icon: List,      label: "Bullets" },
  { type: "ol",              icon: List,      label: "Numbered" },
  { type: "table",           icon: List,      label: "Table" },
  { type: "image",           icon: ImageIcon, label: "Image" },
  { type: "p_with_link",     icon: LinkIcon,  label: "Para+Link" },
  { type: "p_with_bold",     icon: Type,      label: "Para+Bold" },
  { type: "p_with_link_bold",icon: LinkIcon,  label: "P+Lnk+Bold" },
];

const createElement = (type) => {
  const base = { id: Date.now() + Math.random(), type };
  switch (type) {
    case "p":     return { ...base, text: "Write your paragraph here…" };
    case "h2":    return { ...base, text: "Section Heading (H2)" };
    case "h3":    return { ...base, text: "Sub-section Heading (H3)" };
    case "h4":    return { ...base, text: "Minor Heading (H4)" };
    case "h5":    return { ...base, text: "Small Heading (H5)" };
    case "h6":    return { ...base, text: "Tiny Heading (H6)" };
    case "h2_with_link": return { ...base, textBefore: "Learn more about", linkText: "our work", href: "https://vectorgraphic.com", textAfter: "here." };
    case "h3_with_link": return { ...base, textBefore: "Explore our", linkText: "portfolio", href: "https://vectorgraphic.com", textAfter: "today." };
    case "h4_with_link": return { ...base, textBefore: "See the", linkText: "full guide", href: "https://vectorgraphic.com", textAfter: "for more." };
    case "h5_with_link": return { ...base, textBefore: "Read about", linkText: "our approach", href: "https://vectorgraphic.com", textAfter: "." };
    case "h6_with_link": return { ...base, textBefore: "More at", linkText: "our site", href: "https://vectorgraphic.com", textAfter: "" };
    case "bold":  return { ...base, text: "This is a bold paragraph." };
    case "quote": return { ...base, text: "An insightful quote goes here…" };
    case "ul":    return { ...base, text: ["First point", "Second point", "Third point"] };
    case "ol":    return { ...base, text: ["Step one", "Step two", "Step three"] };
    case "table": return { ...base, headers: ["Column 1", "Column 2", "Column 3"], rows: [["A", "B", "C"], ["D", "E", "F"]], themed: false };
    case "image": return { ...base, src: "", caption: "" };
    case "p_with_link":
      return { ...base, textBefore: "Learn more about", linkText: "our services", href: "https://vectorgraphic.com", textAfter: "here." };
    case "p_with_bold":
      return { ...base, parts: [{ bold: false, text: "This is regular text, and " }, { bold: true, text: "this part is bold" }, { bold: false, text: ", then regular again." }] };
    case "p_with_link_bold":
      return { ...base, partsBefore: [{ bold: false, text: "Discover " }, { bold: true, text: "great design" }], linkText: "contact us", href: "https://vectorgraphic.com", partsAfter: [{ bold: false, text: " for the best results." }] };
    default: return { ...base, text: "" };
  }
};

// ─── Section ↔ Element converters ────────────────────────────────────────────
const sectionToElement = (s) => {
  const base = { id: Date.now() + Math.random() };
  if (["h2","h3","h4","h5","h6"].includes(s.type))
    return { ...base, type: s.type, text: s.text || "" };
  if (["h2_with_link","h3_with_link","h4_with_link","h5_with_link","h6_with_link"].includes(s.type))
    return { ...base, type: s.type, textBefore: s.textBefore || "", linkText: s.linkText || "", href: s.href || "", textAfter: s.textAfter || "" };
  if (s.type === "image")      return { ...base, type: "image", src: s.src || "", caption: s.caption || "" };
  if (s.type === "ul")         return { ...base, type: "ul", text: s.text || [] };
  if (s.type === "ol")         return { ...base, type: "ol", text: s.text || [] };
  if (s.type === "table")      return { ...base, type: "table", headers: s.headers || [], rows: s.rows || [], themed: s.themed || false };
  if (s.type === "p_with_link")
    return { ...base, type: "p_with_link", textBefore: s.textBefore || "", linkText: s.linkText || "", href: s.href || "", textAfter: s.textAfter || "" };
  if (s.type === "p_with_bold")
    return { ...base, type: "p_with_bold", parts: s.parts || [] };
  if (s.type === "p_with_link_bold")
    return { ...base, type: "p_with_link_bold", partsBefore: s.partsBefore || [], linkText: s.linkText || "", href: s.href || "", partsAfter: s.partsAfter || [] };
  return { ...base, type: s.type, text: s.text || "" };
};

const toSections = (elements) =>
  elements.map((el) => {
    if (["h2","h3","h4","h5","h6"].includes(el.type))    return { type: el.type, text: el.text };
    if (["h2_with_link","h3_with_link","h4_with_link","h5_with_link","h6_with_link"].includes(el.type))
      return { type: el.type, textBefore: el.textBefore, linkText: el.linkText, href: el.href, textAfter: el.textAfter };
    if (el.type === "image")        return { type: "image", src: el.src, caption: el.caption };
    if (el.type === "ul")           return { type: "ul", text: el.text };
    if (el.type === "ol")           return { type: "ol", text: el.text };
    if (el.type === "table")        return { type: "table", headers: el.headers, rows: el.rows, themed: el.themed };
    if (el.type === "p_with_link")  return { type: "p_with_link", textBefore: el.textBefore, linkText: el.linkText, href: el.href, textAfter: el.textAfter };
    if (el.type === "p_with_bold")  return { type: "p_with_bold", parts: el.parts };
    if (el.type === "p_with_link_bold") return { type: "p_with_link_bold", partsBefore: el.partsBefore, linkText: el.linkText, href: el.href, partsAfter: el.partsAfter };
    return { type: el.type, text: el.text };
  });

// ─── Design system (VG dark theme) ───────────────────────────────────────────
const Label = ({ children }) => (
  <label style={{ display:"block", marginBottom:4, fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#666", fontFamily:"Poppins,sans-serif" }}>
    {children}
  </label>
);
const Input = ({ style={}, ...props }) => (
  <input {...props}
    style={{ width:"100%", padding:"8px 12px", fontSize:13, borderRadius:6, border:"1.5px solid #2a2a2a", background:"#111", color:"#eee", fontFamily:"Poppins,sans-serif", outline:"none", boxSizing:"border-box", transition:"border-color .2s", ...style }}
    onFocus={e => e.target.style.borderColor="#CC2200"}
    onBlur={e  => e.target.style.borderColor="#2a2a2a"}
  />
);
const Textarea = ({ style={}, ...props }) => (
  <textarea {...props}
    style={{ width:"100%", padding:"8px 12px", fontSize:13, borderRadius:6, border:"1.5px solid #2a2a2a", background:"#111", color:"#eee", fontFamily:"Poppins,sans-serif", outline:"none", boxSizing:"border-box", resize:"vertical", lineHeight:1.6, transition:"border-color .2s", ...style }}
    onFocus={e => e.target.style.borderColor="#CC2200"}
    onBlur={e  => e.target.style.borderColor="#2a2a2a"}
  />
);
const Divider = ({ children }) => (
  <div style={{ display:"flex", alignItems:"center", gap:8, margin:"8px 0" }}>
    <span style={{ fontSize:9, fontWeight:800, letterSpacing:"0.15em", textTransform:"uppercase", color:"#444", whiteSpace:"nowrap", fontFamily:"Poppins,sans-serif" }}>{children}</span>
    <div style={{ flex:1, height:1, background:"#222" }} />
  </div>
);

// ─── Inline HTML renderer (bold tags) ────────────────────────────────────────
function RenderInline({ text }) {
  if (!text) return null;
  if (!text.includes("<strong>")) return <>{text}</>;
  const parts = text.split(/(<strong>.*?<\/strong>)/g);
  return <>{parts.map((p, i) => {
    const m = p.match(/^<strong>(.*?)<\/strong>$/);
    return m ? <strong key={i}>{m[1]}</strong> : p;
  })}</>;
}

// ─── PREVIEW renderer — mirrors SubBlogPage.jsx exactly ──────────────────────
function PreviewSection({ s, usedH }) {
  const renderInline = (text) => <RenderInline text={text} />;

  if (s.type === "h2") {
    const id = (()=>{ const base=slugify(s.text||""); const count=(usedH.get(base)||0)+1; usedH.set(base,count); return count===1?base:`${base}-${count}`; })();
    return <h2 id={id} style={{ fontFamily:"Unbounded,sans-serif",fontSize:24,fontWeight:700,color:"#111",margin:"16px 0 4px",scrollMarginTop:112 }}>{renderInline(s.text)}</h2>;
  }
  if (s.type === "h3") {
    const id = (()=>{ const base=slugify(s.text||""); const count=(usedH.get(base)||0)+1; usedH.set(base,count); return count===1?base:`${base}-${count}`; })();
    return <h3 id={id} style={{ fontFamily:"Unbounded,sans-serif",fontSize:20,fontWeight:600,color:"#111",margin:"12px 0 4px",scrollMarginTop:112 }}>{renderInline(s.text)}</h3>;
  }
  if (["h4","h5","h6"].includes(s.type)) {
    const sizes={h4:17,h5:15,h6:13};
    const id = (()=>{ const base=slugify(s.text||""); const count=(usedH.get(base)||0)+1; usedH.set(base,count); return count===1?base:`${base}-${count}`; })();
    return React.createElement(s.type,{ id, style:{ fontFamily:"Unbounded,sans-serif",fontSize:sizes[s.type],fontWeight:600,color:"#222",margin:"10px 0 4px",scrollMarginTop:112 } },renderInline(s.text));
  }
  if (["h2_with_link","h3_with_link","h4_with_link","h5_with_link","h6_with_link"].includes(s.type)) {
    const tag=getHeadingTag(s.type);
    const sizes={h2:24,h3:20,h4:17,h5:15,h6:13};
    const id = (()=>{ const base=slugify(s.linkText||""); const count=(usedH.get(base)||0)+1; usedH.set(base,count); return count===1?base:`${base}-${count}`; })();
    return React.createElement(tag,{ id, style:{ fontFamily:"Unbounded,sans-serif",fontSize:sizes[tag],fontWeight:tag==="h2"?700:600,color:"#111",margin:"12px 0 4px",scrollMarginTop:112 } },[
      s.textBefore?s.textBefore+" ":"",
      <a key="lnk" href={s.href} target="_blank" rel="noopener noreferrer" style={{ color:"#CC2200",textDecoration:"underline" }}>{s.linkText}</a>,
      s.textAfter?" "+s.textAfter:"",
    ]);
  }
  if (s.type === "bold")
    return <p style={{ fontFamily:"Poppins,sans-serif",fontSize:15,fontWeight:700,color:"#4b5563",lineHeight:1.7,margin:"0" }}>{renderInline(s.text)}</p>;
  if (s.type === "quote")
    return (
      <div style={{ borderLeft:"4px solid #d1d5db",paddingLeft:16,paddingTop:8,paddingBottom:8,background:"#f9fafb" }}>
        <p style={{ fontFamily:"Poppins,sans-serif",fontSize:14,color:"#6b7280",fontStyle:"italic",lineHeight:1.7,margin:0 }}>{renderInline(s.text)}</p>
      </div>
    );
  if (s.type === "image")
    return (
      <figure style={{ margin:"24px 0" }}>
        <div style={{ width:"100%",aspectRatio:"16/9",background:"#f3f4f6",overflow:"hidden" }}>
          {s.src
            ?<img src={s.src} alt={s.caption||""} style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
            :<div style={{ width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:"#9ca3af",fontSize:13,fontFamily:"Poppins,sans-serif" }}>No image uploaded</div>
          }
        </div>
        {s.caption&&<figcaption style={{ fontFamily:"Poppins,sans-serif",fontSize:12,color:"#9ca3af",textAlign:"center",marginTop:8,fontStyle:"italic" }}>{s.caption}</figcaption>}
      </figure>
    );
  if (s.type === "ul")
    return (
      <ul style={{ paddingLeft:20,margin:"0",listStyleType:"disc" }}>
        {(s.text||[]).map((item,i)=><li key={i} style={{ fontFamily:"Poppins,sans-serif",fontSize:14,color:"#4b5563",lineHeight:1.7,marginBottom:8 }}>{renderInline(item)}</li>)}
      </ul>
    );
  if (s.type === "ol")
    return (
      <ol style={{ paddingLeft:20,margin:"0",listStyleType:"decimal" }}>
        {(s.text||[]).map((item,i)=><li key={i} style={{ fontFamily:"Poppins,sans-serif",fontSize:14,color:"#4b5563",lineHeight:1.7,marginBottom:8 }}>{renderInline(item)}</li>)}
      </ol>
    );
  if (s.type === "table")
    return (
      <div style={{ overflowX:"auto",borderRadius:8,border:"1px solid #e5e7eb",margin:"0" }}>
        <table style={{ width:"100%",borderCollapse:"collapse",fontSize:14,fontFamily:"Poppins,sans-serif" }}>
          <thead><tr>{(s.headers||[]).map((h,i)=><th key={i} style={{ textAlign:"left",padding:"10px 14px",fontWeight:700,borderBottom:"1px solid #e5e7eb",background:s.themed?"#f3edd8":"#fff",color:"#111" }}>{h}</th>)}</tr></thead>
          <tbody>{(s.rows||[]).map((row,ri)=><tr key={ri} style={{ background:s.themed?(ri%2===0?"#faf7ec":"#f5f0d8"):"#fff" }}>{row.map((cell,ci)=><td key={ci} style={{ padding:"8px 14px",borderBottom:"1px solid #f0f0f0",color:"#4b5563" }}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
    );
  if (s.type === "p_with_link")
    return (
      <p style={{ fontFamily:"Poppins,sans-serif",fontSize:15,color:"#4b5563",lineHeight:1.7,margin:"0" }}>
        {s.textBefore&&<span>{s.textBefore} </span>}
        <a href={s.href} style={{ color:"#CC2200",fontWeight:600,textDecoration:"underline" }}>{s.linkText}</a>
        {s.textAfter&&<span> {s.textAfter}</span>}
      </p>
    );
  if (s.type === "p_with_bold")
    return (
      <p style={{ fontFamily:"Poppins,sans-serif",fontSize:15,color:"#4b5563",lineHeight:1.7,margin:"0" }}>
        {(s.parts||[]).map((part,i)=>part.bold?<strong key={i} style={{ color:"#111" }}>{part.text}</strong>:<span key={i}>{part.text}</span>)}
      </p>
    );
  if (s.type === "p_with_link_bold")
    return (
      <p style={{ fontFamily:"Poppins,sans-serif",fontSize:15,color:"#4b5563",lineHeight:1.7,margin:"0" }}>
        {(s.partsBefore||[]).map((part,i)=>part.bold?<strong key={i} style={{ color:"#111" }}>{part.text}</strong>:<span key={i}>{part.text}</span>)}
        {" "}<a href={s.href} style={{ color:"#CC2200",fontWeight:600,textDecoration:"underline" }}>{s.linkText}</a>{" "}
        {(s.partsAfter||[]).map((part,i)=>part.bold?<strong key={i} style={{ color:"#111" }}>{part.text}</strong>:<span key={i}>{part.text}</span>)}
      </p>
    );
  return <p style={{ fontFamily:"Poppins,sans-serif",fontSize:15,fontWeight:400,color:"#4b5563",lineHeight:1.7,margin:"0" }}><RenderInline text={s.text} /></p>;
}


// ═════════════════════════════════════════════════════════════════════════════
// LOGIN SCREEN
// ═════════════════════════════════════════════════════════════════════════════
function LoginScreen() {
  const { login } = useAuth();
  const [form,    setForm]    = useState({ email:"", password:"" });
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError("");
    if (!form.email || !form.password) { setError("Email and password required."); return; }
    setLoading(true);
    const result = await login(form.email, form.password);
    setLoading(false);
    if (!result.success) setError(result.message || "Login failed.");
  };

  return (
    <div style={{ minHeight:"100vh", background:"#000", display:"flex", alignItems:"center", justifyContent:"center", padding:20, fontFamily:"Poppins,sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
        * { box-sizing:border-box; }
        input:-webkit-autofill { -webkit-box-shadow:0 0 0 100px #111 inset!important; -webkit-text-fill-color:#eee!important; }
        @keyframes spin { from{transform:rotate(0deg)}to{transform:rotate(360deg)} }
      `}</style>
      <div style={{ width:"100%", maxWidth:380 }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ width:52,height:52,background:"#CC2200",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",fontFamily:"Unbounded,sans-serif",fontWeight:900,color:"#fff",fontSize:18,letterSpacing:-1 }}>VG</div>
          <h1 style={{ fontFamily:"Unbounded,sans-serif",fontWeight:700,fontSize:22,color:"#fff",margin:"0 0 6px" }}>Thought Builder</h1>
          <p style={{ color:"#666",fontSize:13,margin:0 }}>Vector Graphic — Admin Access</p>
        </div>
        <div style={{ background:"#111",border:"1.5px solid #222",borderRadius:12,padding:28 }}>
          {error && <div style={{ display:"flex",alignItems:"center",gap:8,color:"#ff6b6b",background:"#2a1010",border:"1px solid #4a2020",borderRadius:8,padding:"10px 14px",fontSize:13,marginBottom:20 }}><AlertCircle size={14}/> {error}</div>}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom:16 }}><Label>Email</Label><Input type="email" value={form.email} placeholder="admin@vectorgraphic.com" autoFocus onChange={e=>setForm(p=>({...p,email:e.target.value}))}/></div>
            <div style={{ marginBottom:24 }}><Label>Password</Label><Input type="password" value={form.password} placeholder="••••••••" onChange={e=>setForm(p=>({...p,password:e.target.value}))}/></div>
            <button type="submit" disabled={loading} style={{ width:"100%",padding:"12px 0",background:loading?"#7a1400":"#CC2200",color:"#fff",border:"none",borderRadius:8,fontFamily:"Unbounded,sans-serif",fontWeight:700,fontSize:13,cursor:loading?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,letterSpacing:"0.03em",transition:"background .2s" }}>
              {loading?<><Loader size={14} style={{ animation:"spin 1s linear infinite" }}/> Signing in…</>:<><LogIn size={14}/> Sign In</>}
            </button>
          </form>
        </div>
        <p style={{ textAlign:"center",fontSize:11,color:"#444",marginTop:16 }}>Authorized team members only</p>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// THOUGHT PICKER
// ═════════════════════════════════════════════════════════════════════════════
function ThoughtPicker({ thoughts, onSelect }) {
  const { user, logout } = useAuth();
  const [query, setQuery] = useState("");
  const filtered = thoughts.filter(t =>
    t.title?.toLowerCase().includes(query.toLowerCase()) ||
    t.slug?.toLowerCase().includes(query.toLowerCase()) ||
    t.category?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ minHeight:"100vh",background:"#0a0a0a",fontFamily:"Poppins,sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');*{box-sizing:border-box}`}</style>
      <div style={{ background:"#111",borderBottom:"1px solid #222",padding:"14px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:20 }}>
        <div style={{ display:"flex",alignItems:"center",gap:12 }}>
          <div style={{ width:34,height:34,background:"#CC2200",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Unbounded,sans-serif",fontWeight:900,color:"#fff",fontSize:12 }}>VG</div>
          <div>
            <div style={{ fontFamily:"Unbounded,sans-serif",fontWeight:700,fontSize:14,color:"#fff" }}>Thought Builder</div>
            <div style={{ fontSize:10,color:"#555" }}>Vector Graphic</div>
          </div>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:12 }}>
          <span style={{ fontSize:11,fontWeight:600,color:"#CC2200",background:"#2a0a00",border:"1px solid #CC220050",borderRadius:20,padding:"4px 12px" }}>{user?.email}</span>
          <button onClick={logout} style={{ display:"flex",alignItems:"center",gap:6,padding:"6px 12px",borderRadius:6,border:"1px solid #333",background:"transparent",color:"#888",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"Poppins,sans-serif" }}><LogOut size={11}/> Sign out</button>
        </div>
      </div>
      <div style={{ maxWidth:860,margin:"0 auto",padding:"40px 24px" }}>
        <h2 style={{ fontFamily:"Unbounded,sans-serif",fontWeight:700,fontSize:24,color:"#fff",marginBottom:6 }}>Thoughts</h2>
        <p style={{ color:"#555",fontSize:13,marginBottom:36 }}>Create a new thought post, or select an existing one to edit.</p>
        <button onClick={()=>onSelect(null)}
          style={{ width:"100%",marginBottom:32,display:"flex",alignItems:"center",gap:16,padding:"18px 20px",border:"2px dashed #CC220060",borderRadius:12,background:"#150500",cursor:"pointer",textAlign:"left",transition:"border-color .2s,background .2s" }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor="#CC2200";e.currentTarget.style.background="#1f0800"}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor="#CC220060";e.currentTarget.style.background="#150500"}}>
          <div style={{ width:48,height:48,background:"#CC2200",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><Plus size={20} color="#fff"/></div>
          <div>
            <div style={{ fontFamily:"Unbounded,sans-serif",fontWeight:700,fontSize:14,color:"#CC2200" }}>Create new thought</div>
            <div style={{ fontSize:12,color:"#555",marginTop:4 }}>Start fresh with a blank canvas</div>
          </div>
        </button>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12 }}>
          <span style={{ fontSize:11,fontWeight:700,color:"#444",textTransform:"uppercase",letterSpacing:"0.12em" }}>Edit existing ({thoughts.length})</span>
          <div style={{ position:"relative" }}>
            <Search size={12} style={{ position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#555" }}/>
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search thoughts…"
              style={{ paddingLeft:28,paddingRight:12,paddingTop:6,paddingBottom:6,fontSize:12,border:"1px solid #2a2a2a",background:"#111",color:"#ccc",borderRadius:8,outline:"none",fontFamily:"Poppins,sans-serif",width:180 }}/>
          </div>
        </div>
        <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
          {filtered.map(t=>(
            <button key={t.id} onClick={()=>onSelect(t)}
              style={{ display:"flex",alignItems:"center",gap:14,padding:"14px 16px",background:"#111",border:"1px solid #222",borderRadius:10,cursor:"pointer",textAlign:"left",width:"100%",transition:"border-color .2s" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor="#CC2200"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="#222"}>
              <div style={{ width:48,height:48,borderRadius:8,overflow:"hidden",flexShrink:0,background:"#1a1a1a",border:"1px solid #2a2a2a" }}>
                {t.heroImage||t.src?<img src={t.heroImage||t.src} alt={t.title} style={{ width:"100%",height:"100%",objectFit:"cover" }}/>:<div style={{ width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center" }}><ImageIcon size={14} color="#444"/></div>}
              </div>
              <div style={{ flex:1,minWidth:0 }}>
                <div style={{ fontFamily:"Unbounded,sans-serif",fontWeight:600,fontSize:13,color:"#eee",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{t.title}</div>
                <div style={{ display:"flex",alignItems:"center",gap:8,marginTop:4 }}>
                  {t.category&&<span style={{ fontSize:10,fontWeight:600,color:"#CC2200",background:"#2a0a00",borderRadius:20,padding:"2px 8px" }}>{t.category}</span>}
                  <span style={{ fontSize:11,color:"#444",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{t.slug}</span>
                </div>
              </div>
              <Edit3 size={13} color="#444" style={{ flexShrink:0 }}/>
            </button>
          ))}
          {filtered.length===0&&<div style={{ textAlign:"center",padding:"40px 0",color:"#444",fontSize:13 }}>No thoughts match "{query}"</div>}
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// THOUGHT EDITOR
// ═════════════════════════════════════════════════════════════════════════════
function ThoughtEditor({ editingThought, onBack }) {
  const { user, logout } = useAuth();
  const isEditMode = !!editingThought;
  const editingId  = React.useRef(editingThought?.id ?? null);

  const [elements,         setElements]         = useState([]);
  const [selectedId,       setSelectedId]       = useState(null);
  const [showAddMenu,      setShowAddMenu]      = useState(false);
  const [insertAfterIdx,   setInsertAfterIdx]   = useState(null);
  const [hoveredInsert,    setHoveredInsert]    = useState(null);
  const [showSettings,     setShowSettings]     = useState(false);
  const [previewMode,      setPreviewMode]      = useState(false);
  const [publishStatus,    setPublishStatus]    = useState(null);
  const [publishMsg,       setPublishMsg]       = useState("");
  const [heroUploading,    setHeroUploading]    = useState(false);
  const [contentUploading, setContentUploading] = useState(null);

  const [meta, setMeta] = useState({
    title:"", slug:"", category:"Design",
    date: new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),
    readTime:"5 min read", heroImage:"", description:"",
    ctaHeading:"Ready to Elevate Your Packaging?",
    ctaSubheading:"Drive faster business growth with innovative solutions.",
    tags:"",
  });

  useEffect(()=>{
    if(!editingThought) return;
    setMeta({
      title:         editingThought.title||"",
      slug:          editingThought.slug||"",
      category:      editingThought.category||"Design",
      date:          editingThought.date||"",
      readTime:      editingThought.readTime||"5 min read",
      heroImage:     editingThought.heroImage||editingThought.src||"",
      description:   editingThought.description||"",
      ctaHeading:    editingThought.cta?.heading||"Ready to Elevate Your Packaging?",
      ctaSubheading: editingThought.cta?.subheading||"Drive faster business growth with innovative solutions.",
      tags:          (editingThought.tags||[]).join(", "),
    });
    setElements((editingThought.sections||[]).map(sectionToElement));
  },[editingThought]);

  const selectedEl = elements.find(el=>el.id===selectedId)||null;

  // ── TOC ───────────────────────────────────────────────────────────────────
  const toc = useMemo(()=>{
    const used = new Map();
    return elements.filter(el=>TOC_TYPES.has(el.type)&&(el.text||el.linkText)).map(el=>{
      const rawText = el.linkText||el.text||"";
      const base = slugify(rawText);
      const count=(used.get(base)||0)+1; used.set(base,count);
      const id=count===1?base:`${base}-${count}`;
      return { id, text:rawText, level:getHeadingTag(el.type) };
    });
  },[elements]);

  const [activeId, setActiveId] = useState("");
  useEffect(()=>{
    if(!previewMode||!toc.length) return;
    const els = toc.map(t=>document.getElementById(t.id)).filter(Boolean);
    if(!els.length) return;
    const io=new IntersectionObserver(entries=>{
      const v=entries.filter(e=>e.isIntersecting).sort((a,b)=>(b.intersectionRatio||0)-(a.intersectionRatio||0))[0];
      if(v?.target?.id) setActiveId(v.target.id);
    },{root:null,rootMargin:"-25% 0px -65% 0px",threshold:[0.1,0.5,1]});
    els.forEach(el=>io.observe(el));
    return ()=>io.disconnect();
  },[previewMode,toc]);

  const scrollToId=(id)=>{
    const el=document.getElementById(id);
    if(!el) return;
    el.scrollIntoView({behavior:"smooth",block:"start"});
    setActiveId(id);
  };

  // ── Element CRUD ──────────────────────────────────────────────────────────
  const addElement=useCallback((type)=>{
    const el=createElement(type);
    setElements(prev=>{
      const next=[...prev];
      if(insertAfterIdx===-1) return [el,...next];
      if(insertAfterIdx!==null){next.splice(insertAfterIdx+1,0,el);return next;}
      return [...next,el];
    });
    setSelectedId(el.id); setShowAddMenu(false); setInsertAfterIdx(null);
  },[insertAfterIdx]);

  const updateEl=useCallback((id,patch)=>setElements(p=>p.map(el=>el.id===id?{...el,...patch}:el)),[]);
  const deleteEl=useCallback((id)=>{setElements(p=>p.filter(el=>el.id!==id));setSelectedId(null);},[]);
  const moveEl=useCallback((id,dir)=>{
    setElements(prev=>{
      const idx=prev.findIndex(el=>el.id===id);
      if(idx===-1) return prev;
      const next=[...prev]; const swap=idx+dir;
      if(swap<0||swap>=next.length) return prev;
      [next[idx],next[swap]]=[next[swap],next[idx]]; return next;
    });
  },[]);

  const addListItem=(id)=>updateEl(id,{text:[...(elements.find(e=>e.id===id)?.text||[]),"New item"]});
  const updateItem=(id,i,val)=>updateEl(id,{text:elements.find(e=>e.id===id).text.map((t,j)=>j===i?val:t)});
  const deleteItem=(id,i)=>updateEl(id,{text:elements.find(e=>e.id===id).text.filter((_,j)=>j!==i)});

  // p_with_bold helpers
  const addBoldPart=(id)=>updateEl(id,{parts:[...(elements.find(e=>e.id===id)?.parts||[]),{bold:false,text:"New part"}]});
  const updatePart=(id,i,patch)=>updateEl(id,{parts:elements.find(e=>e.id===id).parts.map((p,j)=>j===i?{...p,...patch}:p)});
  const deletePart=(id,i)=>updateEl(id,{parts:elements.find(e=>e.id===id).parts.filter((_,j)=>j!==i)});

  // p_with_link_bold helpers
  const addPartBefore=(id)=>updateEl(id,{partsBefore:[...(elements.find(e=>e.id===id)?.partsBefore||[]),{bold:false,text:"New part"}]});
  const updatePartB=(id,i,patch)=>updateEl(id,{partsBefore:elements.find(e=>e.id===id).partsBefore.map((p,j)=>j===i?{...p,...patch}:p)});
  const deletePartB=(id,i)=>updateEl(id,{partsBefore:elements.find(e=>e.id===id).partsBefore.filter((_,j)=>j!==i)});
  const addPartAfter=(id)=>updateEl(id,{partsAfter:[...(elements.find(e=>e.id===id)?.partsAfter||[]),{bold:false,text:"New part"}]});
  const updatePartA=(id,i,patch)=>updateEl(id,{partsAfter:elements.find(e=>e.id===id).partsAfter.map((p,j)=>j===i?{...p,...patch}:p)});
  const deletePartA=(id,i)=>updateEl(id,{partsAfter:elements.find(e=>e.id===id).partsAfter.filter((_,j)=>j!==i)});

  // ── Upload ────────────────────────────────────────────────────────────────
  const handleHeroUpload=async(file)=>{
    if(!file) return; setHeroUploading(true);
    try{ const url=await compressAndUpload(file,{maxW:1400,quality:0.82}); setMeta(p=>({...p,heroImage:url})); }
    catch(e){ alert("Hero upload failed: "+e.message); }
    finally{ setHeroUploading(false); }
  };
  const handleContentImageUpload=async(id,file)=>{
    if(!file) return; setContentUploading(id);
    try{ const url=await compressAndUpload(file,{maxW:1200,quality:0.80}); updateEl(id,{src:url}); }
    catch(e){ alert("Image upload failed: "+e.message); }
    finally{ setContentUploading(null); }
  };

  // ── Export ────────────────────────────────────────────────────────────────
  const exportData=()=>{
    const sections=toSections(elements);
    const slug=meta.slug||slugify(meta.title)||`thought-${Date.now()}`;
    const tagsArr=meta.tags?meta.tags.split(",").map(t=>t.trim()).filter(Boolean):[];
    return { id:isEditMode?editingId.current:Date.now(), slug, title:meta.title, category:meta.category, date:meta.date, readTime:meta.readTime, heroImage:meta.heroImage, src:meta.heroImage, description:meta.description, tags:tagsArr, cta:{heading:meta.ctaHeading,subheading:meta.ctaSubheading}, sections };
  };

  const downloadJSON=()=>{
    const d=exportData();
    const blob=new Blob([JSON.stringify(d,null,2)],{type:"application/json"});
    const a=Object.assign(document.createElement("a"),{href:URL.createObjectURL(blob),download:`thought-${d.slug}.json`});
    a.click(); URL.revokeObjectURL(a.href);
  };

  // ── GitHub publish ────────────────────────────────────────────────────────
  const publishThought=async()=>{
    if(!meta.title){alert("Please add a title first (open ⚙ Settings).");setShowSettings(true);return;}
    if(elements.length===0){alert("Please add at least one content block.");return;}
    setPublishStatus("loading"); setPublishMsg("Fetching thoughtsData.js from GitHub…");
    try{
      const fileRes=await fetch(`https://api.github.com/repos/${GH_REPO}/contents/${GH_FILE}?ref=${GH_BRANCH}`,{headers:{Authorization:`token ${GH_TOKEN}`,Accept:"application/vnd.github.v3+json"}});
      if(!fileRes.ok) throw new Error(`GitHub fetch: ${fileRes.status} ${fileRes.statusText}`);
      const fileData=await fileRes.json();
      const sha=fileData.sha;
      const binary=atob(fileData.content.replace(/\n/g,""));
      const current=new TextDecoder("utf-8").decode(Uint8Array.from(binary,c=>c.charCodeAt(0)));
      const stripped=current.replace(/^[\s\S]*?export\s+const\s+THOUGHTS\s*=\s*/,"").replace(/;?\s*$/,"").trim();
      // eslint-disable-next-line no-new-func
      const arr=new Function(`return ${stripped}`)();
      const nextId=Math.max(0,...arr.map(b=>Number(b.id)||0))+1;
      const data=exportData();
      let newArr;
      if(isEditMode){
        setPublishMsg("Updating existing entry…");
        const idx=arr.findIndex(b=>String(b.id)===String(editingId.current));
        if(idx===-1) throw new Error(`Could not find thought with id ${editingId.current}`);
        newArr=[...arr]; newArr[idx]={...data,id:editingId.current};
      } else {
        setPublishMsg("Inserting new entry…");
        newArr=[{...data,id:nextId},...arr];
      }
      const entriesStr=newArr.map(b=>"  "+JSON.stringify(b,null,2).replace(/\n/g,"\n  ")).join(",\n");
      const newContent=`export const THOUGHTS = [\n${entriesStr}\n];\n`;
      setPublishMsg("Committing to GitHub…");
      const putRes=await fetch(`https://api.github.com/repos/${GH_REPO}/contents/${GH_FILE}`,{method:"PUT",headers:{Authorization:`token ${GH_TOKEN}`,Accept:"application/vnd.github.v3+json","Content-Type":"application/json"},body:JSON.stringify({message:isEditMode?`update thought: ${data.slug}`:`add thought: ${data.slug}`,content:btoa(unescape(encodeURIComponent(newContent))),sha,branch:GH_BRANCH})});
      if(!putRes.ok){const e=await putRes.json();throw new Error(e.message||`Commit failed: ${putRes.status}`);}
      setPublishStatus("success"); setPublishMsg(isEditMode?"✅ Thought updated on GitHub!":"✅ Thought published to GitHub!");
    }catch(e){
      console.error(e); setPublishStatus("error"); setPublishMsg(e.message||"Unknown error.");
    }
  };

  const progress=[
    {label:"Title",      done:!!meta.title},
    {label:"Hero image", done:!!meta.heroImage},
    {label:"Slug",       done:!!meta.slug},
    {label:`${elements.length} block${elements.length!==1?"s":""}`,done:elements.length>0},
  ];

  // ── BUILDER element renderer (dark canvas) ────────────────────────────────
  const renderBuilder=(el,idx)=>{
    const isSelected=selectedId===el.id;
    const pick=(e)=>{e.stopPropagation();setSelectedId(el.id);};
    const border=isSelected?"2px solid #CC2200":"2px solid transparent";
    const wrap={ borderRadius:8,border,cursor:"pointer",transition:"border-color .15s",padding:4 };

    const InsertZone=({after})=>{
      const key=after?idx:idx-0.5;
      return(
        <div onMouseEnter={()=>setHoveredInsert(key)} onMouseLeave={()=>setHoveredInsert(null)}>
          <button
            style={{ width:"100%",display:"flex",alignItems:"center",gap:8,padding:"4px 0",fontSize:10,fontWeight:700,color:"#CC2200",background:"transparent",border:"none",cursor:"pointer",fontFamily:"Poppins,sans-serif",opacity:hoveredInsert===key?1:0,transition:"opacity .2s" }}
            onClick={e=>{e.stopPropagation();setInsertAfterIdx(after?idx:idx-1);setShowAddMenu(true);}}>
            <div style={{ flex:1,height:1,background:"linear-gradient(to right,transparent,#CC220060,transparent)" }}/>
            <Plus size={10}/> Insert here
            <div style={{ flex:1,height:1,background:"linear-gradient(to right,transparent,#CC220060,transparent)" }}/>
          </button>
        </div>
      );
    };

    // ── render each type ──
    let content;
    const isHeading=["h2","h3","h4","h5","h6"].includes(el.type);
    const isHeadingLink=["h2_with_link","h3_with_link","h4_with_link","h5_with_link","h6_with_link"].includes(el.type);

    if(isHeading){
      const tag=el.type;
      const st=HEADING_STYLE[tag];
      content=React.createElement(tag,{
        style:{ ...st, margin:0, padding:"6px 8px", outline:"none", fontFamily:"Unbounded,sans-serif", ...wrap },
        onClick:pick, contentEditable:true, suppressContentEditableWarning:true,
        onBlur:e=>updateEl(el.id,{text:e.currentTarget.innerText}),
      }, el.text);
    } else if(isHeadingLink){
      const tag=getHeadingTag(el.type);
      const st=HEADING_STYLE[tag];
      content=React.createElement(tag,{
        style:{ ...st, margin:0, padding:"6px 8px", fontFamily:"Unbounded,sans-serif", ...wrap },
        onClick:pick,
      },[
        el.textBefore?el.textBefore+" ":"",
        <span key="lnk" style={{ color:"#CC2200",textDecoration:"underline" }}>{el.linkText||"link"}</span>,
        el.textAfter?" "+el.textAfter:"",
      ]);
    } else if(el.type==="bold")
      content=<div style={wrap} onClick={pick}><p style={{ fontFamily:"Poppins,sans-serif",fontSize:14,fontWeight:700,color:"#ccc",margin:0,padding:"6px 8px",outline:"none",lineHeight:1.7 }} contentEditable suppressContentEditableWarning onBlur={e=>updateEl(el.id,{text:e.currentTarget.innerText})}>{el.text}</p></div>;
    else if(el.type==="quote")
      content=<div style={{ ...wrap,borderLeft:"4px solid #CC2200",background:"#1a0a00",padding:"10px 14px" }} onClick={pick}><p style={{ fontFamily:"Poppins,sans-serif",fontSize:13,color:"#aaa",fontStyle:"italic",margin:0,lineHeight:1.7,outline:"none" }} contentEditable suppressContentEditableWarning onBlur={e=>updateEl(el.id,{text:e.currentTarget.innerText})}>{el.text}</p></div>;
    else if(el.type==="image")
      content=(
        <figure style={{ ...wrap,margin:0,background:"#111" }} onClick={pick}>
          {el.src?<img src={el.src} alt={el.caption||""} style={{ width:"100%",aspectRatio:"16/9",objectFit:"cover",borderRadius:6,display:"block" }}/>
            :<div style={{ width:"100%",aspectRatio:"16/9",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",color:"#555",gap:8,borderRadius:6 }}><ImageIcon size={22}/><span style={{ fontSize:12,fontFamily:"Poppins,sans-serif" }}>Select block → upload image</span></div>}
          {el.caption&&<figcaption style={{ fontSize:11,color:"#555",textAlign:"center",padding:"8px 0 4px",fontFamily:"Poppins,sans-serif",fontStyle:"italic" }}>{el.caption}</figcaption>}
        </figure>
      );
    else if(el.type==="ul")
      content=<ul style={{ ...wrap,paddingLeft:20,margin:0,listStyleType:"disc" }} onClick={pick}>{(el.text||[]).map((item,i)=><li key={i} style={{ fontFamily:"Poppins,sans-serif",fontSize:13,color:"#aaa",lineHeight:1.7,marginBottom:4 }}>{item}</li>)}</ul>;
    else if(el.type==="ol")
      content=<ol style={{ ...wrap,paddingLeft:20,margin:0,listStyleType:"decimal" }} onClick={pick}>{(el.text||[]).map((item,i)=><li key={i} style={{ fontFamily:"Poppins,sans-serif",fontSize:13,color:"#aaa",lineHeight:1.7,marginBottom:4 }}>{item}</li>)}</ol>;
    else if(el.type==="table")
      content=(
        <div style={{ ...wrap,overflowX:"auto" }} onClick={pick}>
          <table style={{ width:"100%",borderCollapse:"collapse",fontSize:13,fontFamily:"Poppins,sans-serif" }}>
            <thead><tr>{(el.headers||[]).map((h,i)=><th key={i} style={{ textAlign:"left",padding:"8px 12px",fontWeight:700,borderBottom:"1px solid #333",background:el.themed?"#2a200a":"#1a1a1a",color:"#eee" }}>{h}</th>)}</tr></thead>
            <tbody>{(el.rows||[]).map((row,ri)=><tr key={ri} style={{ background:el.themed?(ri%2===0?"#1a1500":"#150f00"):"#111" }}>{row.map((cell,ci)=><td key={ci} style={{ padding:"7px 12px",borderBottom:"1px solid #222",color:"#aaa" }}>{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      );
    else if(el.type==="p_with_link")
      content=<p style={{ ...wrap,fontFamily:"Poppins,sans-serif",fontSize:14,color:"#aaa",margin:0,padding:"6px 8px",lineHeight:1.7 }} onClick={pick}>{el.textBefore&&<span>{el.textBefore} </span>}<span style={{ color:"#CC2200",fontWeight:600,textDecoration:"underline" }}>{el.linkText||"link"}</span>{el.textAfter&&<span> {el.textAfter}</span>}</p>;
    else if(el.type==="p_with_bold")
      content=<p style={{ ...wrap,fontFamily:"Poppins,sans-serif",fontSize:14,color:"#aaa",margin:0,padding:"6px 8px",lineHeight:1.7 }} onClick={pick}>{(el.parts||[]).map((part,i)=>part.bold?<strong key={i} style={{ color:"#eee" }}>{part.text}</strong>:<span key={i}>{part.text}</span>)}</p>;
    else if(el.type==="p_with_link_bold")
      content=<p style={{ ...wrap,fontFamily:"Poppins,sans-serif",fontSize:14,color:"#aaa",margin:0,padding:"6px 8px",lineHeight:1.7 }} onClick={pick}>{(el.partsBefore||[]).map((part,i)=>part.bold?<strong key={i} style={{ color:"#eee" }}>{part.text}</strong>:<span key={i}>{part.text}</span>)}{" "}<span style={{ color:"#CC2200",fontWeight:600,textDecoration:"underline" }}>{el.linkText||"link"}</span>{" "}{(el.partsAfter||[]).map((part,i)=>part.bold?<strong key={i} style={{ color:"#eee" }}>{part.text}</strong>:<span key={i}>{part.text}</span>)}</p>;
    else
      // default paragraph — fixed: always shows text, uses innerHTML correctly
      content=(
        <div style={wrap} onClick={pick}>
          <p style={{ fontFamily:"Poppins,sans-serif",fontSize:14,color:"#aaa",margin:0,padding:"6px 8px",outline:"none",lineHeight:1.7 }}
            contentEditable suppressContentEditableWarning
            dangerouslySetInnerHTML={{ __html: el.text || "" }}
            onBlur={e=>updateEl(el.id,{text:e.currentTarget.innerHTML})}/>
        </div>
      );

    return(
      <React.Fragment key={el.id}>
        {idx===0&&<InsertZone after={false}/>}
        <div onClick={e=>e.stopPropagation()}>{content}</div>
        <InsertZone after={true}/>
      </React.Fragment>
    );
  };

  // ── Element editor panel ──────────────────────────────────────────────────
  const renderEditor=()=>{
    if(!selectedEl)
      return(
        <div style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32,textAlign:"center",color:"#444" }}>
          <Type size={28} style={{ marginBottom:12,opacity:0.3 }}/>
          <p style={{ fontFamily:"Poppins,sans-serif",fontSize:13,fontWeight:500 }}>{elements.length>0?"Click a block to edit it":"Add a content block to start"}</p>
        </div>
      );

    const el=selectedEl;
    const isHeading=["h2","h3","h4","h5","h6"].includes(el.type);
    const isHeadingLink=["h2_with_link","h3_with_link","h4_with_link","h5_with_link","h6_with_link"].includes(el.type);

    return(
      <div style={{ flex:1,overflowY:"auto",padding:"16px 20px",display:"flex",flexDirection:"column",gap:16 }}>
        {/* Controls */}
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <span style={{ padding:"4px 10px",borderRadius:20,fontSize:10,fontWeight:800,textTransform:"uppercase",background:"#2a0a00",color:"#CC2200",fontFamily:"Poppins,sans-serif",letterSpacing:"0.1em" }}>{el.type}</span>
          <div style={{ display:"flex",gap:6 }}>
            {[["↑",-1],["↓",1]].map(([label,dir])=>(
              <button key={label} onClick={()=>moveEl(el.id,dir)} style={{ width:28,height:28,borderRadius:6,border:"1px solid #2a2a2a",background:"transparent",color:"#666",cursor:"pointer",fontSize:12,fontFamily:"monospace" }}>{label}</button>
            ))}
            <button onClick={()=>deleteEl(el.id)} style={{ width:28,height:28,borderRadius:6,background:"#2a0a0a",border:"1px solid #4a1010",color:"#ff6b6b",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}><Trash2 size={11}/></button>
          </div>
        </div>

        {/* Plain headings */}
        {isHeading&&(
          <div>
            <Label>Heading text</Label>
            <Textarea rows={2} value={el.text} onChange={e=>updateEl(el.id,{text:e.target.value})} placeholder="Type your heading…"/>
          </div>
        )}

        {/* Headings with link */}
        {isHeadingLink&&(
          <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
            <div style={{ padding:"8px 12px",background:"#1a0a00",border:"1px solid #CC220040",borderRadius:8,fontSize:11,color:"#CC2200",fontFamily:"Poppins,sans-serif" }}>
              Preview: <span style={{ color:"#aaa" }}>{el.textBefore} </span>
              <span style={{ color:"#CC2200",textDecoration:"underline" }}>{el.linkText}</span>
              <span style={{ color:"#aaa" }}> {el.textAfter}</span>
            </div>
            <div><Label>Text before link</Label><Input value={el.textBefore||""} onChange={e=>updateEl(el.id,{textBefore:e.target.value})}/></div>
            <div><Label>Link text</Label><Input value={el.linkText||""} onChange={e=>updateEl(el.id,{linkText:e.target.value})}/></div>
            <div><Label>URL</Label><Input value={el.href||""} placeholder="https://…" onChange={e=>updateEl(el.id,{href:e.target.value})}/></div>
            <div><Label>Text after link</Label><Input value={el.textAfter||""} onChange={e=>updateEl(el.id,{textAfter:e.target.value})}/></div>
          </div>
        )}

        {/* Bold / Quote */}
        {["bold","quote"].includes(el.type)&&(
          <div>
            <Label>{el.type==="quote"?"Quote text":"Bold paragraph"}</Label>
            <Textarea rows={3} value={el.text} onChange={e=>updateEl(el.id,{text:e.target.value})}/>
          </div>
        )}

        {/* Plain paragraph */}
        {el.type==="p"&&(
          <div>
            <Label>Content (use **word** to bold)</Label>
            <Textarea rows={4}
              value={el.text.replace(/<strong>/g,"**").replace(/<\/strong>/g,"**")}
              onChange={e=>updateEl(el.id,{text:e.target.value.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>")})}/>
            <p style={{ fontFamily:"Poppins,sans-serif",fontSize:10,color:"#444",marginTop:4 }}>Wrap with **double asterisks** to bold.</p>
          </div>
        )}

        {/* p_with_link */}
        {el.type==="p_with_link"&&(
          <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
            <div style={{ padding:"8px 12px",background:"#1a0a00",border:"1px solid #CC220040",borderRadius:8,fontSize:11,color:"#aaa",fontFamily:"Poppins,sans-serif" }}>
              Preview: {el.textBefore} <span style={{ color:"#CC2200",textDecoration:"underline" }}>{el.linkText}</span> {el.textAfter}
            </div>
            <div><Label>Text before link</Label><Input value={el.textBefore||""} onChange={e=>updateEl(el.id,{textBefore:e.target.value})}/></div>
            <div><Label>Link text</Label><Input value={el.linkText||""} onChange={e=>updateEl(el.id,{linkText:e.target.value})}/></div>
            <div><Label>URL</Label><Input value={el.href||""} placeholder="https://…" onChange={e=>updateEl(el.id,{href:e.target.value})}/></div>
            <div><Label>Text after link</Label><Input value={el.textAfter||""} onChange={e=>updateEl(el.id,{textAfter:e.target.value})}/></div>
          </div>
        )}

        {/* p_with_bold */}
        {el.type==="p_with_bold"&&(
          <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
            <Label>Text parts (toggle bold per part)</Label>
            {(el.parts||[]).map((part,i)=>(
              <div key={i} style={{ display:"flex",gap:6,alignItems:"center" }}>
                <button onClick={()=>updatePart(el.id,i,{bold:!part.bold})} style={{ flexShrink:0,padding:"4px 8px",borderRadius:4,border:"1px solid",background:part.bold?"#CC2200":"transparent",color:part.bold?"#fff":"#666",borderColor:part.bold?"#CC2200":"#2a2a2a",cursor:"pointer",fontWeight:700,fontSize:11 }}>B</button>
                <Input value={part.text} onChange={e=>updatePart(el.id,i,{text:e.target.value})} style={part.bold?{fontWeight:700}:{}}/>
                <button onClick={()=>deletePart(el.id,i)} style={{ flexShrink:0,width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4,border:"1px solid #3a1010",background:"#1a0a0a",color:"#ff6b6b",cursor:"pointer" }}><X size={9}/></button>
              </div>
            ))}
            <button onClick={()=>addBoldPart(el.id)} style={{ width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"8px 0",border:"1.5px dashed #2a2a2a",borderRadius:8,background:"transparent",color:"#555",fontSize:12,cursor:"pointer",fontFamily:"Poppins,sans-serif" }} onMouseEnter={e=>{e.currentTarget.style.borderColor="#CC2200";e.currentTarget.style.color="#CC2200"}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#2a2a2a";e.currentTarget.style.color="#555"}}><Plus size={11}/> Add part</button>
          </div>
        )}

        {/* p_with_link_bold */}
        {el.type==="p_with_link_bold"&&(
          <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
            <Divider>Parts before link</Divider>
            {(el.partsBefore||[]).map((part,i)=>(
              <div key={i} style={{ display:"flex",gap:6,alignItems:"center" }}>
                <button onClick={()=>updatePartB(el.id,i,{bold:!part.bold})} style={{ flexShrink:0,padding:"4px 8px",borderRadius:4,border:"1px solid",background:part.bold?"#CC2200":"transparent",color:part.bold?"#fff":"#666",borderColor:part.bold?"#CC2200":"#2a2a2a",cursor:"pointer",fontWeight:700,fontSize:11 }}>B</button>
                <Input value={part.text} onChange={e=>updatePartB(el.id,i,{text:e.target.value})}/>
                <button onClick={()=>deletePartB(el.id,i)} style={{ flexShrink:0,width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4,border:"1px solid #3a1010",background:"#1a0a0a",color:"#ff6b6b",cursor:"pointer" }}><X size={9}/></button>
              </div>
            ))}
            <button onClick={()=>addPartBefore(el.id)} style={{ width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"8px 0",border:"1.5px dashed #2a2a2a",borderRadius:8,background:"transparent",color:"#555",fontSize:12,cursor:"pointer",fontFamily:"Poppins,sans-serif" }} onMouseEnter={e=>{e.currentTarget.style.borderColor="#CC2200";e.currentTarget.style.color="#CC2200"}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#2a2a2a";e.currentTarget.style.color="#555"}}><Plus size={11}/> Add part before</button>
            <Divider>Link</Divider>
            <div><Label>Link text</Label><Input value={el.linkText||""} onChange={e=>updateEl(el.id,{linkText:e.target.value})}/></div>
            <div><Label>URL</Label><Input value={el.href||""} placeholder="https://…" onChange={e=>updateEl(el.id,{href:e.target.value})}/></div>
            <Divider>Parts after link</Divider>
            {(el.partsAfter||[]).map((part,i)=>(
              <div key={i} style={{ display:"flex",gap:6,alignItems:"center" }}>
                <button onClick={()=>updatePartA(el.id,i,{bold:!part.bold})} style={{ flexShrink:0,padding:"4px 8px",borderRadius:4,border:"1px solid",background:part.bold?"#CC2200":"transparent",color:part.bold?"#fff":"#666",borderColor:part.bold?"#CC2200":"#2a2a2a",cursor:"pointer",fontWeight:700,fontSize:11 }}>B</button>
                <Input value={part.text} onChange={e=>updatePartA(el.id,i,{text:e.target.value})}/>
                <button onClick={()=>deletePartA(el.id,i)} style={{ flexShrink:0,width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4,border:"1px solid #3a1010",background:"#1a0a0a",color:"#ff6b6b",cursor:"pointer" }}><X size={9}/></button>
              </div>
            ))}
            <button onClick={()=>addPartAfter(el.id)} style={{ width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"8px 0",border:"1.5px dashed #2a2a2a",borderRadius:8,background:"transparent",color:"#555",fontSize:12,cursor:"pointer",fontFamily:"Poppins,sans-serif" }} onMouseEnter={e=>{e.currentTarget.style.borderColor="#CC2200";e.currentTarget.style.color="#CC2200"}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#2a2a2a";e.currentTarget.style.color="#555"}}><Plus size={11}/> Add part after</button>
          </div>
        )}

        {/* Image */}
        {el.type==="image"&&(
          <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
            <div>
              <Label>Upload image</Label>
              <input type="file" accept="image/*" disabled={contentUploading===el.id} onChange={e=>handleContentImageUpload(el.id,e.target.files[0])} style={{ fontSize:12,color:"#666",border:"1.5px dashed #333",borderRadius:8,padding:"8px 12px",width:"100%",background:"#0d0d0d",cursor:"pointer",fontFamily:"Poppins,sans-serif" }}/>
              {contentUploading===el.id&&<div style={{ marginTop:8,display:"flex",alignItems:"center",gap:6,fontSize:12,color:"#CC2200",fontFamily:"Poppins,sans-serif" }}><Loader size={12} style={{ animation:"spin 1s linear infinite" }}/> Uploading…</div>}
              {contentUploading!==el.id&&el.src&&<img src={el.src} alt="" style={{ marginTop:8,width:"100%",height:80,objectFit:"cover",borderRadius:6,border:"1px solid #222" }}/>}
            </div>
            <div><Label>Caption / alt text</Label><Input value={el.caption||""} placeholder="Describe the image…" onChange={e=>updateEl(el.id,{caption:e.target.value})}/></div>
          </div>
        )}

        {/* Table */}
        {el.type==="table"&&(
          <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
            <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 12px",borderRadius:8,border:"1px solid #2a2a2a",background:"#1a1a1a" }}>
              <div><div style={{ fontSize:12,fontWeight:600,color:"#ccc",fontFamily:"Poppins,sans-serif" }}>Themed style</div><div style={{ fontSize:10,color:"#555",fontFamily:"Poppins,sans-serif" }}>Warm beige header rows</div></div>
              <button onClick={()=>updateEl(el.id,{themed:!el.themed})} style={{ position:"relative",width:40,height:20,borderRadius:20,border:"none",cursor:"pointer",background:el.themed?"#CC2200":"#2a2a2a",transition:"background .2s" }}><span style={{ position:"absolute",top:2,width:16,height:16,borderRadius:"50%",background:"#fff",transition:"left .2s",left:el.themed?"22px":"2px" }}/></button>
            </div>
            <div>
              <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6 }}>
                <Label>Column Headers</Label>
                <button onClick={()=>updateEl(el.id,{headers:[...(el.headers||[]),"New Column"],rows:(el.rows||[]).map(r=>[...r,""])})} style={{ fontSize:10,color:"#CC2200",fontWeight:600,background:"transparent",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:3,fontFamily:"Poppins,sans-serif" }}><Plus size={10}/> Col</button>
              </div>
              <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
                {(el.headers||[]).map((h,hi)=>(
                  <div key={hi} style={{ display:"flex",gap:4,alignItems:"center",flex:1,minWidth:80 }}>
                    <Input value={h} placeholder={`Col ${hi+1}`} onChange={e=>updateEl(el.id,{headers:el.headers.map((hh,i)=>i===hi?e.target.value:hh)})}/>
                    {(el.headers||[]).length>1&&<button onClick={()=>updateEl(el.id,{headers:el.headers.filter((_,i)=>i!==hi),rows:(el.rows||[]).map(r=>r.filter((_,i)=>i!==hi))})} style={{ flexShrink:0,width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4,border:"1px solid #3a1010",background:"#1a0a0a",color:"#ff6b6b",cursor:"pointer" }}><X size={9}/></button>}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6 }}>
                <Label>Rows</Label>
                <button onClick={()=>updateEl(el.id,{rows:[...(el.rows||[]),(el.headers||[]).map(()=>"")]})} style={{ fontSize:10,color:"#CC2200",fontWeight:600,background:"transparent",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:3,fontFamily:"Poppins,sans-serif" }}><Plus size={10}/> Row</button>
              </div>
              {(el.rows||[]).map((row,ri)=>(
                <div key={ri} style={{ display:"flex",gap:4,alignItems:"center",marginBottom:6 }}>
                  <span style={{ fontSize:10,color:"#444",width:16,textAlign:"right",flexShrink:0,fontFamily:"Poppins,sans-serif" }}>{ri+1}</span>
                  {row.map((cell,ci)=><Input key={ci} value={cell} placeholder={el.headers?.[ci]||`Col ${ci+1}`} style={{ flex:1,minWidth:0 }} onChange={e=>updateEl(el.id,{rows:el.rows.map((r,i)=>i===ri?r.map((c,j)=>j===ci?e.target.value:c):r)})}/>)}
                  <button onClick={()=>updateEl(el.id,{rows:el.rows.filter((_,i)=>i!==ri)})} style={{ flexShrink:0,width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4,border:"1px solid #3a1010",background:"#1a0a0a",color:"#ff6b6b",cursor:"pointer" }}><X size={10}/></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lists */}
        {(el.type==="ul"||el.type==="ol")&&(
          <div>
            <Label>List items</Label>
            <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
              {(el.text||[]).map((item,i)=>(
                <div key={i} style={{ display:"flex",gap:6,alignItems:"center" }}>
                  <span style={{ fontSize:11,color:"#555",width:16,textAlign:"right",flexShrink:0,fontFamily:"Poppins,sans-serif" }}>{i+1}.</span>
                  <Input value={item} onChange={e=>updateItem(el.id,i,e.target.value)}/>
                  <button onClick={()=>deleteItem(el.id,i)} style={{ flexShrink:0,width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4,border:"1px solid #3a1010",background:"#1a0a0a",color:"#ff6b6b",cursor:"pointer" }}><X size={9}/></button>
                </div>
              ))}
            </div>
            <button onClick={()=>addListItem(el.id)} style={{ marginTop:8,width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"8px 0",border:"1.5px dashed #2a2a2a",borderRadius:8,background:"transparent",color:"#555",fontSize:12,cursor:"pointer",fontFamily:"Poppins,sans-serif",transition:"border-color .2s,color .2s" }} onMouseEnter={e=>{e.currentTarget.style.borderColor="#CC2200";e.currentTarget.style.color="#CC2200"}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#2a2a2a";e.currentTarget.style.color="#555"}}><Plus size={11}/> Add item</button>
          </div>
        )}
      </div>
    );
  };

  // ── Main render ───────────────────────────────────────────────────────────
  return(
    <div style={{ minHeight:"100vh",background:"#0a0a0a",fontFamily:"Poppins,sans-serif",display:"grid",gridTemplateColumns:previewMode?"1fr":"340px 1fr" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-thumb{background:#2a2a2a;border-radius:4px}
        input[type="file"]:hover{border-color:#CC2200!important}
        [contenteditable]:focus{outline:none}
      `}</style>

      {/* ─── LEFT PANEL ─── */}
      {!previewMode&&(
        <div style={{ background:"#111",borderRight:"1px solid #222",display:"flex",flexDirection:"column",maxHeight:"100vh",position:"sticky",top:0,overflow:"hidden" }}>

          {/* Header */}
          <div style={{ padding:"14px 18px",borderBottom:"1px solid #222",background:"#111",flexShrink:0 }}>
            <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10 }}>
              <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                <button onClick={onBack} style={{ width:32,height:32,borderRadius:8,border:"1px solid #2a2a2a",background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#666" }}><ArrowLeft size={13}/></button>
                <div style={{ width:32,height:32,background:"#CC2200",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:"#fff",fontFamily:"Unbounded,sans-serif" }}>VG</div>
                <div>
                  <div style={{ fontFamily:"Unbounded,sans-serif",fontWeight:700,fontSize:13,color:"#fff",lineHeight:1 }}>{isEditMode?"Edit Thought":"New Thought"}</div>
                  <div style={{ fontSize:9,color:"#555",marginTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:140 }}>{isEditMode?(editingThought?.slug||""):"Vector Graphic"}</div>
                </div>
              </div>
              <div style={{ display:"flex",gap:6 }}>
                <button onClick={()=>setPreviewMode(true)} style={{ display:"flex",alignItems:"center",gap:5,padding:"5px 10px",border:"1px solid #2a2a2a",borderRadius:6,background:"transparent",color:"#888",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"Poppins,sans-serif" }}><Eye size={11}/> Preview</button>
                <button onClick={()=>setShowSettings(v=>!v)} style={{ width:30,height:30,borderRadius:6,border:showSettings?"1px solid #CC2200":"1px solid #2a2a2a",background:showSettings?"#2a0a00":"transparent",color:showSettings?"#CC2200":"#666",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}><Settings size={13}/></button>
              </div>
            </div>
            {isEditMode&&<div style={{ display:"flex",alignItems:"center",gap:6,padding:"6px 10px",borderRadius:6,background:"#1a0a00",border:"1px solid #CC220040",fontSize:11,fontWeight:600,color:"#CC2200",fontFamily:"Poppins,sans-serif",marginBottom:8 }}><Edit3 size={10}/> Editing — changes update existing thought</div>}
            <div style={{ display:"flex",flexWrap:"wrap",gap:10 }}>
              {progress.map(({label,done})=>(
                <div key={label} style={{ display:"flex",alignItems:"center",gap:4 }}>
                  <div style={{ width:6,height:6,borderRadius:"50%",background:done?"#CC2200":"#2a2a2a",transition:"background .2s" }}/>
                  <span style={{ fontSize:10,color:done?"#888":"#444",fontFamily:"Poppins,sans-serif" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Settings */}
          {showSettings&&(
            <div style={{ borderBottom:"1px solid #222",flexShrink:0,overflowY:"auto",maxHeight:"55vh" }}>
              <div style={{ padding:"16px 18px",display:"flex",flexDirection:"column",gap:12 }}>
                <Divider>Post Details</Divider>
                <div><Label>Title</Label><Input value={meta.title} placeholder="The Power of Bold Typography…" onChange={e=>setMeta(p=>({...p,title:e.target.value,slug:p.slug||slugify(e.target.value)}))}/></div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
                  <div><Label>URL Slug</Label><Input value={meta.slug} placeholder="bold-typography" onChange={e=>setMeta(p=>({...p,slug:slugify(e.target.value)}))}/></div>
                  <div><Label>Category</Label><Input value={meta.category} onChange={e=>setMeta(p=>({...p,category:e.target.value}))}/></div>
                  <div><Label>Date</Label><Input value={meta.date} onChange={e=>setMeta(p=>({...p,date:e.target.value}))}/></div>
                  <div><Label>Read Time</Label><Input value={meta.readTime} placeholder="5 min read" onChange={e=>setMeta(p=>({...p,readTime:e.target.value}))}/></div>
                </div>
                <div><Label>Description</Label><Textarea rows={2} value={meta.description} placeholder="Brief description…" onChange={e=>setMeta(p=>({...p,description:e.target.value}))}/></div>
                <div><Label>Tags (comma-separated)</Label><Input value={meta.tags} placeholder="Design, Typography" onChange={e=>setMeta(p=>({...p,tags:e.target.value}))}/></div>
                <Divider>Hero Image</Divider>
                <div>
                  <input type="file" accept="image/*" disabled={heroUploading} onChange={e=>handleHeroUpload(e.target.files[0])} style={{ fontSize:12,color:"#666",border:"1.5px dashed #333",borderRadius:8,padding:"8px 12px",width:"100%",background:"#0d0d0d",cursor:"pointer",fontFamily:"Poppins,sans-serif" }}/>
                  {heroUploading&&<div style={{ marginTop:8,display:"flex",alignItems:"center",gap:6,fontSize:12,color:"#CC2200",fontFamily:"Poppins,sans-serif" }}><Loader size={12} style={{ animation:"spin 1s linear infinite" }}/> Uploading…</div>}
                  {!heroUploading&&meta.heroImage&&<div style={{ marginTop:8,position:"relative" }}><img src={meta.heroImage} alt="hero" style={{ width:"100%",height:70,objectFit:"cover",borderRadius:6,border:"1px solid #222",display:"block" }}/><button onClick={()=>setMeta(p=>({...p,heroImage:""}))} style={{ position:"absolute",top:4,right:4,width:18,height:18,background:"#CC2200",color:"#fff",border:"none",borderRadius:"50%",cursor:"pointer",fontSize:10,display:"flex",alignItems:"center",justifyContent:"center" }}>×</button></div>}
                </div>
                <Divider>CTA Section</Divider>
                <div><Label>CTA Heading</Label><Input value={meta.ctaHeading} onChange={e=>setMeta(p=>({...p,ctaHeading:e.target.value}))}/></div>
                <div><Label>CTA Subheading</Label><Input value={meta.ctaSubheading} onChange={e=>setMeta(p=>({...p,ctaSubheading:e.target.value}))}/></div>
                <Divider>Publish</Divider>
                <button onClick={downloadJSON} style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"9px 0",border:"1px solid #2a2a2a",borderRadius:8,background:"transparent",color:"#888",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"Poppins,sans-serif",width:"100%" }}><Upload size={12}/> Download JSON</button>
                <button onClick={publishThought} disabled={publishStatus==="loading"} style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"11px 0",background:publishStatus==="loading"?"#7a1400":"#CC2200",border:"none",borderRadius:8,color:"#fff",fontSize:13,fontWeight:700,cursor:publishStatus==="loading"?"not-allowed":"pointer",fontFamily:"Unbounded,sans-serif",letterSpacing:"0.03em",width:"100%",opacity:publishStatus==="loading"?0.7:1 }}>
                  {publishStatus==="loading"?<><Loader size={13} style={{ animation:"spin 1s linear infinite" }}/> {publishMsg||"Publishing…"}</>:<><Send size={13}/> {isEditMode?"Update on GitHub":"Publish to GitHub"}</>}
                </button>
                {publishStatus==="success"&&<div style={{ display:"flex",alignItems:"center",gap:8,color:"#4ade80",background:"#0a1a0a",border:"1px solid #1a4a1a",borderRadius:8,padding:"10px 14px",fontSize:12,fontFamily:"Poppins,sans-serif" }}><CheckCircle size={13}/> {publishMsg}</div>}
                {publishStatus==="error"&&<div style={{ display:"flex",alignItems:"flex-start",gap:8,color:"#ff6b6b",background:"#1a0a0a",border:"1px solid #4a1010",borderRadius:8,padding:"10px 14px",fontSize:12,fontFamily:"Poppins,sans-serif" }}><AlertCircle size={13} style={{ flexShrink:0,marginTop:1 }}/> {publishMsg}</div>}
                <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:4 }}>
                  <span style={{ fontSize:10,color:"#444",fontFamily:"Poppins,sans-serif" }}>{user?.email}</span>
                  <button onClick={logout} style={{ display:"flex",alignItems:"center",gap:4,fontSize:10,color:"#444",background:"transparent",border:"none",cursor:"pointer",fontFamily:"Poppins,sans-serif" }}><LogOut size={9}/> Sign out</button>
                </div>
              </div>
            </div>
          )}

          {/* Add block */}
          <div style={{ padding:"12px 18px",borderBottom:"1px solid #222",flexShrink:0 }}>
            <button onClick={()=>{setShowAddMenu(v=>!v);setInsertAfterIdx(null);}} style={{ width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",background:"#CC2200",border:"none",borderRadius:8,color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"Unbounded,sans-serif",letterSpacing:"0.02em" }}>
              <span style={{ display:"flex",alignItems:"center",gap:6 }}><Plus size={14}/> Add Block</span>
              {showAddMenu?<ChevronUp size={13}/>:<ChevronDown size={13}/>}
            </button>
            {showAddMenu&&(
              <div style={{ marginTop:10,display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6 }}>
                {ELEMENT_TYPES.map(({type,icon:Icon,label})=>(
                  <button key={type} onClick={()=>addElement(type)}
                    style={{ background:"#1a1a1a",border:"1px solid #2a2a2a",borderRadius:6,padding:"8px 4px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,color:"#888",fontSize:10,fontWeight:600,fontFamily:"Poppins,sans-serif",transition:"border-color .15s,color .15s" }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor="#CC2200";e.currentTarget.style.color="#CC2200"}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor="#2a2a2a";e.currentTarget.style.color="#888"}}>
                    <Icon size={12}/><span style={{ lineHeight:1.2,textAlign:"center" }}>{label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Element editor */}
          <div style={{ flex:1,overflowY:"auto",display:"flex",flexDirection:"column" }}>{renderEditor()}</div>
        </div>
      )}

      {/* ─── CANVAS ─── */}
      <div style={{ background:"#fff",overflowY:"auto" }} onClick={()=>!previewMode&&setSelectedId(null)}>
        {previewMode&&(
          <div style={{ background:"#000",padding:"12px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:50,borderBottom:"1px solid #CC220040" }}>
            <div style={{ display:"flex",alignItems:"center",gap:10 }}>
              <div style={{ width:8,height:8,borderRadius:"50%",background:"#CC2200" }}/>
              <span style={{ fontFamily:"Unbounded,sans-serif",fontWeight:700,fontSize:12,color:"#fff",letterSpacing:"0.05em" }}>{isEditMode?"EDIT PREVIEW":"LIVE PREVIEW"} — SubBlogPage Layout</span>
            </div>
            <button onClick={()=>setPreviewMode(false)} style={{ display:"flex",alignItems:"center",gap:6,background:"#1a1a1a",border:"1px solid #333",color:"#ccc",padding:"6px 14px",borderRadius:8,cursor:"pointer",fontSize:11,fontWeight:600,fontFamily:"Poppins,sans-serif" }}><EyeOff size={12}/> Back to Editor</button>
          </div>
        )}

        <div style={{ background:"#fff",minHeight:"100vh" }}>

          {/* ── Title (matches SubBlogPage header) ── */}
          <div style={{ padding:"24px 80px 16px",textAlign:"center" }}>
            <h1 style={{ fontFamily:"Unbounded,sans-serif",fontWeight:700,fontSize:50,color:"#111",lineHeight:1.25,margin:"0 auto",maxWidth:1200 }}>
              {meta.title||<span style={{ color:"#ccc",fontWeight:400,fontSize:24 }}>Your title appears here…</span>}
            </h1>
          </div>

          {/* ── Main layout: sidebar + article (matches SubBlogPage) ── */}
          <div style={{ padding:"32px 80px 16px",display:"flex",flexDirection:"row",gap:56,alignItems:"flex-start" }}>

            {/* Sidebar TOC — matches SubBlogPage exactly */}
            {toc.length>0&&(
              <div style={{ width:400,flexShrink:0,position:"sticky",top:32 }}>
                {/* Back button */}
                <div style={{ display:"inline-flex",alignItems:"center",gap:8,borderRadius:4,fontSize:14,fontWeight:500,background:"#FFD7D7",padding:"10px 10px",color:"#000",marginBottom:24,fontFamily:"Poppins,sans-serif",cursor:"pointer" }}>
                  <ArrowLeft size={16}/> Back to Thoughts
                </div>

                {/* TOC */}
                <div style={{ paddingLeft:40 }}>
                  <p style={{ fontFamily:"Unbounded,sans-serif",fontWeight:700,fontSize:16,color:"#111",marginBottom:16,margin:"0 0 16px" }}>In this article</p>
                  <div style={{ height:1,background:"#e5e7eb",marginBottom:8 }}/>
                  <ul style={{ listStyle:"none",margin:0,padding:0 }}>
                    {toc.map(t=>{
                      const isActive=t.id===activeId;
                      return(
                        <li key={t.id}>
                          <button onClick={()=>scrollToId(t.id)} style={{ width:"100%",textAlign:"left",padding:"12px 16px",background:"transparent",border:"none",borderLeft:`2px solid ${isActive?"#CC2200":"transparent"}`,fontFamily:"Poppins,sans-serif",fontSize:13,fontWeight:isActive?600:400,color:isActive?"#CC2200":"#444",cursor:"pointer",lineHeight:1.5 }}>{t.text}</button>
                          <div style={{ height:1,background:"#f5f5f5" }}/>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}

            {/* Article content — matches SubBlogPage */}
            <div style={{ flex:1,maxWidth:790,marginLeft:toc.length===0?"auto":0,marginRight:toc.length===0?"auto":0 }}>

              {/* Hero image card — matches SubBlogPage exactly */}
              <div style={{ paddingTop:24,marginBottom:24 }}>
                <div style={{ position:"relative",width:"100%",height:462,background:"#f3f4f6",overflow:"hidden",borderRadius:12 }}>
                  {meta.heroImage
                    ?<img src={meta.heroImage} alt={meta.title} style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
                    :<div style={{ width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",color:"#bbb",gap:8 }}><ImageIcon size={28}/><span style={{ fontFamily:"Poppins,sans-serif",fontSize:13 }}>Hero image — upload in ⚙ Settings</span></div>
                  }
                  {meta.heroImage&&<>
                    {/* Blur overlay — 138px fixed like SubBlogPage */}
                    <div style={{ position:"absolute",bottom:0,left:0,right:0,height:138,background:"rgba(0,0,0,0.3)",backdropFilter:"blur(21px)" }}/>
                    {/* Caption bar — 130px fixed like SubBlogPage */}
                    <div style={{ position:"absolute",bottom:0,left:0,right:0,height:130,display:"flex",flexDirection:"column",justifyContent:"center",padding:"16px 80px" }}>
                      <h2 style={{ fontFamily:"Unbounded,sans-serif",fontWeight:700,fontSize:24,color:"#fff",margin:"0 0 8px",lineHeight:1.3 }}>{meta.title}</h2>
                      <p style={{ fontFamily:"Poppins,sans-serif",fontSize:14,color:"rgba(255,255,255,0.6)",margin:0 }}>{meta.date} · {meta.readTime}</p>
                    </div>
                  </>}
                </div>
              </div>

              {/* Sections */}
              <div style={{ display:"flex",flexDirection:"column",gap:20 }}>
                {elements.length===0
                  ?<div style={{ textAlign:"center",padding:"60px 0",color:"#ccc" }}><Type size={40} style={{ margin:"0 auto 12px",display:"block",opacity:0.3 }}/><p style={{ fontFamily:"Poppins,sans-serif",fontSize:14 }}>No content blocks yet</p></div>
                  :previewMode
                    ?(()=>{
                        const usedH=new Map();
                        return elements.map((el,i)=>{
                          let s;
                          if(["h2","h3","h4","h5","h6"].includes(el.type)) s={type:el.type,text:el.text};
                          else if(["h2_with_link","h3_with_link","h4_with_link","h5_with_link","h6_with_link"].includes(el.type)) s={type:el.type,textBefore:el.textBefore,linkText:el.linkText,href:el.href,textAfter:el.textAfter};
                          else if(el.type==="image") s={type:"image",src:el.src,caption:el.caption};
                          else if(el.type==="ul"||el.type==="ol") s={type:el.type,text:el.text};
                          else if(el.type==="table") s={type:"table",headers:el.headers,rows:el.rows,themed:el.themed};
                          else if(el.type==="p_with_link") s={type:"p_with_link",textBefore:el.textBefore,linkText:el.linkText,href:el.href,textAfter:el.textAfter};
                          else if(el.type==="p_with_bold") s={type:"p_with_bold",parts:el.parts};
                          else if(el.type==="p_with_link_bold") s={type:"p_with_link_bold",partsBefore:el.partsBefore,linkText:el.linkText,href:el.href,partsAfter:el.partsAfter};
                          else s={type:el.type,text:el.text};
                          return <PreviewSection key={i} s={s} usedH={usedH}/>;
                        });
                      })()
                    :elements.map((el,idx)=>renderBuilder(el,idx))
                }
              </div>
            </div>
          </div>

          {/* CTA — matches SubBlogPage CTASection with backgroundColor="#FFF1F1" */}
          <div style={{ marginTop:50,background:"#FFF1F1",padding:"64px 80px",textAlign:"center" }}>
            <h2 style={{ fontFamily:"Unbounded,sans-serif",fontWeight:700,fontSize:28,color:"#111",margin:"0 0 12px" }}>{meta.ctaHeading}</h2>
            <p style={{ fontFamily:"Poppins,sans-serif",fontSize:15,color:"#666",margin:"0 0 24px" }}>{meta.ctaSubheading}</p>
            <button style={{ padding:"12px 32px",background:"#CC2200",border:"none",borderRadius:8,color:"#fff",fontFamily:"Unbounded,sans-serif",fontWeight:700,fontSize:13,cursor:"pointer",letterSpacing:"0.03em" }}>Get in Touch</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ROOT
// ═════════════════════════════════════════════════════════════════════════════
export default function ThoughtBuilder() {
  const { isAuthenticated, loading } = useAuth();
  const [screen,         setScreen]        = useState("picker");
  const [editingThought, setEditingThought]= useState(null);
  const [thoughts,       setThoughts]      = useState([]);

  useEffect(()=>{
    import("../../data/thoughtsData").then(m=>setThoughts(m.THOUGHTS||[])).catch(()=>setThoughts([]));
  },[]);

  if(loading)
    return(
      <div style={{ minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"#000",gap:12,color:"#444",fontFamily:"Poppins,sans-serif" }}>
        <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
        <Loader size={26} style={{ color:"#CC2200",animation:"spin 1s linear infinite" }}/>
        <span style={{ fontSize:13 }}>Verifying session…</span>
      </div>
    );

  if(!isAuthenticated) return <LoginScreen/>;

  if(screen==="picker")
    return <ThoughtPicker thoughts={thoughts} onSelect={t=>{setEditingThought(t);setScreen("editor");}}/>;

  return <ThoughtEditor editingThought={editingThought} onBack={()=>{setScreen("picker");setEditingThought(null);}}/>;
}
