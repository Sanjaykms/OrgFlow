import React, { useState } from "react";
import { main } from "@/lib/geminiApi";

const GeminiTest: React.FC = () => {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputVal,setInputval]= useState("");

  

  const handleGenerate = async () => {
    setLoading(true);

    try {
      
       console.log((await main(inputVal)));
       if(inputVal!=""){
            setOutput((await main(inputVal)).text);
       }
    } catch (error) {
      console.error("Error:", error);
      setOutput("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
        <input type="text" onChange={(e)=>setInputval(e.target.value)} />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Response"}
      </button>

      <p style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>{output}</p>
    </div>
  );
};

export default GeminiTest;
