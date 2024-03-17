import { useEffect, useRef, useState } from "react";
import { getFact } from "../../services/get-fact";
import "./style.css";

export function FactBlock() {
  const [fact, setFact] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const area = ref.current;

    if (area) {
      const words = area.value.split(" ");
      const first = words[0].replace(/[\,\:\.]/, "").length;

      area.setSelectionRange(first, first);
      area.focus();
    }
  }, [fact]);

  const handleClick = () => {
    getFact().then(setFact);
  };

  const handleChange = (event) => {
    const text = event.target.value;
    setFact(text);
  };

  return (
    <section className="fact-block-container">
      <h2>Cat Facts</h2>
      <button type="button" onClick={handleClick}>
        Get Fact
      </button>
      <textarea
        ref={ref}
        className="fact-block-textarea"
        value={fact}
        onChange={handleChange}
      />
    </section>
  );
}
