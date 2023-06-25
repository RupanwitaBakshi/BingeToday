"use client";
import useLLM from "usellm";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Button, Paper } from "@material-ui/core";
import { MessageLeft, MessageRight } from "./Messages";
import { TextInput } from "./TextInput";
import { blue } from "@material-ui/core/colors";
// import SendIcon from "@mui/icons-material/Send";
// import SendIcon from '@mui/icons-material/Send';

export default function Home() {
  const llm = useLLM();
  const [genere, setGenere] = useState("");
  const [mood, setMood] = useState("");
  const [type, setType] = useState("");
  const [age, setAge] = useState("");
  const [theme, setTheme] = useState("");
  const [duration, setDuration] = useState("");
  const [actors, setActors] = useState("");
  const [result, setResult] = useState("");
  const [count, setCount] = useState(0);
  const [start , setStart]= useState(false)
  const countHandler=()=>{
    let c= count+1
    setCount(c)
  }
  async function handleClick() {
    try {
      await llm.chat({
        messages: [
          {
            role: "system",
            content: `Your name is Bingy, you are an AI bot powered by ChatGPT and engineerd by Team RAS. You are responsible for suggesting movie and series names based on
            few parameters provided by the user. You have to analyze the mood and personality of user based on these parameters and suggest a suitable movie or TV series available over the internet.
            Please refrain from answering any other questions other than movie or TV series related. In case user asks any off the topic questions politely decline to answer that.`,
          },
          {
            role: "user",
            content: `Please suugest me what to watch with the following preferences: 
          genere = ${genere},
          mood of the item = ${mood || "Any"}
          movie or series = ${type || "Any"}
          age of the item = ${age || "Any"}
          theme of the item = ${theme || "Any"}
          I have time for = ${duration || "Any"}
          my preferred actor(s) = ${actors || "Any"}
          `,
          },
        ],
        stream: true,
        onStream: ({ message }) => setResult(message.content),
      });
    } catch (error) {
      console.error("Something went wrong!", error);
    }
  }

  return (
    <div className="min-h-screen mx-auto my-8 max-w-4xl">
      <div>
        <UserButton afterSignOutUrl="/" />
      </div>
      <h1 className="text-center mb-4 text-2xl">BingeToday!</h1>
      <h2><Button onClick ={()=>{setStart(true)}}>Let's go!</Button></h2>
      {start? <Paper >
        <div className="flex flex-col">
          <MessageLeft message="Mention genere that you prefer? (e.g., action, comedy, drama, sci-fi)"></MessageLeft>
          <MessageRight>
            <input
              value={genere}
              onChange={(e) => {
        
                setGenere(e.target.value);
              }}
              placeholder="Mention genere that you prefer? (e.g., action, comedy, drama, sci-fi)"
              style={{ width: "60%" }}
              className="rounded border p-2 mr-2 mb-2 text-black"
            />
          </MessageRight>
          {count >= 1 ? (
            <>
              <MessageLeft message="Any specific mood you are looking for? (e.g., suspenseful, uplifting, light-hearted)"></MessageLeft>
              <MessageRight>
                <input
                  value={mood}
                  onChange={(e) => {
            
                    setMood(e.target.value);
                  }}
                  placeholder="Any specific mood you are looking for? (e.g., suspenseful, uplifting, light-hearted)"
                  style={{ width: "75%" }}
                  className="rounded border p-2 mr-2 mb-2 text-black"
                />
              </MessageRight>
            </>
          ) : (
            <></>
          )}

          {count >=2 ? (
            <>
              <MessageLeft message="Would you prefer a movie or a series?"></MessageLeft>
              <MessageRight>
                <input
                  value={type}
                  onChange={(e) => {
      
                    setType(e.target.value);
                  }}
                  placeholder="Would you prefer a movie or a series?"
                  style={{ width: "35%" }}
                  className="rounded border p-2 mr-2 mb-2 text-black"
                />
              </MessageRight>
            </>
          ) : (
            <></>
          )}

          {count >=3 ? (
            <>
              {" "}
              <MessageLeft message="Something recent or are you open to older films or series?"></MessageLeft>
              <MessageRight>
                <input
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Something recent or are you open to older films or series?"
                  style={{ width: "55%" }}
                  className="rounded border p-2 mr-2 mb-2 text-black"
                />
              </MessageRight>
            </>
          ) : (
            <></>
          )}

          {count >= 4 ? (
            <>
              <MessageLeft message="Interested in any specific theme? (e.g., historical, fantasy, crime)"></MessageLeft>
              <MessageRight>
                <input
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder="Interested in any specific theme? (e.g., historical, fantasy, crime)"
                  style={{ width: "60%" }}
                  className="rounded border p-2 mr-2 mb-2 text-black"
                />
              </MessageRight>
            </>
          ) : (
            <></>
          )}

          {count >= 5 ? (
            <>
              <MessageLeft message="How much time do you have for watching? (e.g., 2 hours, 2-4 hours, binge-watching)"></MessageLeft>
              <MessageRight>
                <input
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="How much time do you have for watching? (e.g., 2 hours, 2-4 hours, binge-watching)"
                  style={{ width: "75%" }}
                  className="rounded border p-2 mr-2 mb-2 text-black"
                />
              </MessageRight>
            </>
          ) : (
            <></>
          )}

          {count >= 6 ? (
            <>
              <MessageLeft message="Do you have any favorite actors or actresses whose work you particularly enjoy?"></MessageLeft>
              <MessageRight>
                <input
                  value={actors}
                  onChange={(e) => {
                    setActors(e.target.value);
                  }}
                  placeholder="Do you have any favorite actors or actresses whose work you particularly enjoy?"
                  style={{ width: "75%" }}
                  className="rounded border p-2 mr-2 mb-2 text-black"
                />
              </MessageRight>
            </>
          ) : (
            <></>
          )}

          {count===6 ? (
            <button
              className="rounded border border-black dark:border-white p-2"
              onClick={handleClick}
            >
              Submit
            </button>
          ) : (
            <Button variant="contained" onClick={countHandler}>Send</Button>
          )}
        </div>

        <div className="mt-4 whitespace-pre-wrap">{result}</div>
      </Paper>:<></>}
     
    </div>
  );
}
