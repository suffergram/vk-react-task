import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { getAge } from "../../services/get-age";
import "./style.css";

export function AgeBlock() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [list, setList] = useState({});

  const handleAge = async () => {
    if (name !== "") {
      if (!list[name]) {
        const data = await getAge(name);

        setList({
          ...list,
          [name]: data.age,
        });

        setAge(data.age);
      } else {
        setAge(list[name]);
      }
    }
  };

  const request = debounce(handleAge, 3000);

  const handleSubmit = async (event) => {
    event.preventDefault();
    request.cancel();
    handleAge();
  };

  const handleChange = (event) => {
    const newName = event.target.value;
    if (!newName.match(/^[a-zA-Z]+$/)) return;
    setName(event.target.value);
    request();
  };

  useEffect(() => {
    request();

    return () => {
      request.cancel();
    };
  }, [request]);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Age By Name</h2>
      <input type="text" value={name} onChange={handleChange} />
      <button type="submit">Get Age</button>
      <p>{age ? `Age: ${age}` : ""}</p>
    </form>
  );
}
