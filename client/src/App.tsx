import React from "react";

import Footer from "./Footer";

import "./App.scss";

function App() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // normally forms submit a POST request and refresh the page
  };

  return (
    <>
      <header>
        <h1>RoamingNERd</h1>
      </header>
      <main>
        <p>
          Automatically tag named entities in text for direct entry into Roam
          Research.
        </p>
        <form onSubmit={onSubmit}>
          <textarea id="input" placeholder="Input..."></textarea>
          <div role="presentation" className="spacer"></div>
          <div id="actions">
            <button type="submit">Tag Text</button>
            <button className="secondary">Copy Output</button>
          </div>
          <div role="presentation" className="spacer"></div>
          <textarea id="input" placeholder="Tagged Output..."></textarea>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default App;
