import Header from "../component/header/header";
import Head from "next/head";
import App from "../component/app/app";
import ChatBox from "../component/app/Chatbox";

export default function home() {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>
      <Header />
      <App />
      <ChatBox />
    </>
  );
}
