import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_QUOTES } from "./index";
import { gsap } from "gsap";
import Loader from "./components/loader";

function App() {
  const { loading, error, data } = useQuery(GET_QUOTES);
  const [index, setIndex] = useState(0);

  const boxRef = useRef();
  const divRef = useRef();

  useEffect(() => {
    gsap.from(boxRef.current, { y: -20, ease: "elastic", duration: 2 });
    gsap.from(divRef.current, { y: -20, ease: "elastic", duration: 2 });
    gsap.to(divRef.current, { y: 0, ease: "elastic", duration: 2 });
    gsap.to(boxRef.current, { y: -10, ease: "elastic", duration: 2 });
  });
  if (loading) {
    return (
      <div className="loading">
        <Loader />
      </div>
    );
  }

  if (error) return <p>An error occured!</p>;

  const isActive = (quote) => {
    if (data.quotes[index].id === quote.id) {
      return {
        background: "var(--lineactive)",
        width: "10px",
        height: `${quote.quote.length / 6}px`,
      };
    } else {
      return {
        background: "var(--linepassive)",
        width: "10px",
        height: `${quote.quote.length / 6}px`,
      };
    }
  };

  /*
  const handleFindAllSame = () => {
    let allIndexesOfTheAuthor = data.quotes
      .map((quote, i) =>
        quote.author.name === data.quotes[index].author.name ? i : -1
      )
      .filter((index) => index !== -1);
      console.log(allIndexesOfTheAuthor)
  };
  */
  return (
    <div className="container">
      <div className="top" ref={divRef}>
        {data.quotes.map((quote) => (
          <div
            key={quote.id}
            style={isActive(quote)}
            onClick={() =>
              setIndex(data.quotes.findIndex((el) => el.id == quote.id))
            }
          ></div>
        ))}
      </div>
      <div className="app" ref={boxRef}>
        <div className="arrows">
          <div className="arrow" onClick={() => setIndex(index - 1)}>
            <img
              src="/images/iconmonstr-arrow-64.svg"
              width="30px"
              height="30px"
              alt="left arrow"
            />
          </div>
          <div
            className="arrow"
            onClick={() => {
              setIndex(index + 1);
            }}
          >
            <img
              src="/images/iconmonstr-arrow-32.svg"
              width="30px"
              height="30px"
              alt="left arrow"
            />
          </div>
        </div>
        <div className="app-header">
          <h2>{data.quotes[index].author.name}</h2>
          <p className="book">{data.quotes[index].book}</p>
          <p className="publisher">{data.quotes[index].publisher}</p>
        </div>
        <div className="app-main">
          <p>{data.quotes[index].quote}</p>
        </div>
        <div className="app-footer"></div>
      </div>
      <div className="bottom"></div>
    </div>
  );
}

export default App;
