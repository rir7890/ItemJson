import "./App.css";
import { useState, useRef, useEffect } from "react";
import { FaPlus } from "react-icons/fa";

function App() {
  const [items, setItems] = useState([]);
  const [inputH, setInputH] = useState("");
  const [inputC, setInputC] = useState("");
  const ContentRef = useRef();
  // const HeadRef = useRef();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3002/items");
        if (!response.ok) throw Error("Did not receive expected data");
        const listItems = await response.json();
        // console.log(listItems);
        setItems(listItems);
      } catch (err) {
        console.log(err);
      }
    };

    setTimeout(() => {
      (async () => await fetchData())();
    }, 1000);
  }, []);

  const addItem = async (Head, Content) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItems = { id, Head: Head, Content: Content };
    console.log(myNewItems);
    setItems(myNewItems);
    console.log(items);
    const postOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(myNewItems),
    };
    try {
      const response = await fetch("http://localhost:3002/items", postOptions);
      if (!response.ok) throw Error("please reload the app");
    } catch (err) {
      console.log("result is not working due to the api error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputC && !inputH) return;
    addItem(inputH, inputC);
    console.log(inputC, inputH);
    setInputC("");
    setInputH("");
  };

  return (
    <div className="App">
      <form className="InputRow" onSubmit={handleSubmit}>
        <input
          required
          autoFocus
          type="text"
          placeholder="Enter Head..."
          value={inputH}
          onChange={(e) => setInputH(e.target.value)}
        />
        <input
          required
          autoFocus
          ref={ContentRef}
          text="text"
          placeholder="Enter Content..."
          value={inputC}
          onChange={(e) => setInputC(e.target.value)}
        />
        <button
          type="submit"
          aria-label="add Item"
          onClick={() => ContentRef.current.focus()}
        >
          <FaPlus />
        </button>
      </form>
    </div>
  );
}

export default App;
