import React, { useEffect, useState } from "react";

const TUT = () => {
  const a = String("Dsad");
  const [state, setState] = useState(1);
  useEffect(() => {
    alert("changes")
  }, [a]);

  return (
    <div>
      <button onClick={() => setState(state + 1)}>click</button>
    </div>
  );
};

export default TUT;
