import { useEffect, useState } from "react";
import Head from "next/head";
import { Navbar } from "@/components";
import { Sidebar } from "@/components";
import { Main } from "@/components";
import { requestAxios } from "@/config/requestAxios";

export default function Home() {
  const [data, setData] = useState([]);
  let token: any = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("tokencha");
    token = JSON.parse(token);
  }

  const getfetchData = () => {
    requestAxios
      .get("/memories/all", { headers: { Authorization: `Token ${token}` } })
      .then((data) => {
        setData(data.data.data);
      })
      .catch((err) => console.log(err));
  };
  console.log(data);

  useEffect(() => {
    getfetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="background-1"></div>
{/*       {data?.map((item: any) => (
        <div>
          <h1>{item?.title}</h1>
          <h2>{item?.desc}</h2>
          <img src={item?.files[0]?.url} alt="img" />
        </div>
      ))} */}
      <main className="main container">
        <Navbar />
        <div className="d-flex">
          <Sidebar />
          <Main />
        </div>
      </main>
    </>
  );
}
