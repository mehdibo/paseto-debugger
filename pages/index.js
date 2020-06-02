import Head from 'next/head'
import {useState} from "react";
import axios from "axios";
import ReactJsonSyntaxHighlighter from 'react-json-syntax-highlighter'

export default function Home() {
    const [error, setError] = useState('');
    const [secret, setSecret] = useState('');
    const [payload, setPayload] = useState({});
    const [token, setToken] = useState('');

  function decodePaseto(e) {
      e.preventDefault();
      if (secret === '')
      {
          alert('You must provide a secret');
          return;
      }
      console.log(token);
      if (token === '' || token === undefined)
      {
          alert('You must provide a token');
          return;
      }
      axios.post('/api/decodePaseto', {
          secret: secret,
          token: token
      }).then(function (response) {
          setPayload(response.data)
      }).catch(function (error) {
          setError(error.response.data.error);
      });
  }

  return (
    <div className="container">
      <Head>
        <title>Paseto Debugger</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Paseto Debugger
        </h1>

        <p className="description">
          An online debugger to decode Paseto tokens
        </p>

        <div className="grid">
            {error && (<div>{error}</div>)}
          <form onSubmit={decodePaseto}>
              <input type="text" placeholder="HEX Secret" onChange={(e) => setSecret(e.target.value)}/>
              <input type="text" placeholder="Paseto token" onChange={(e) => setToken(e.target.value)}/>
              <ReactJsonSyntaxHighlighter obj={payload} />
              <br />
              <button type={"submit"}>Decode</button>
          </form>
        </div>
      </main>

      <footer>
        <a
          href="https://github.com/mehdibo/paseto-debugger"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contribute on GitHub
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
        input {
            height: 5vh;
            margin-bottom: 2vh;
        }
        input, textarea {
            width: 100vh;
            border: #ccc solid 1px;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
