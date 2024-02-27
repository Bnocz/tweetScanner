
import { useState } from 'react';

const API_KEY = "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";
function App() {
    const [tweet, setTweet] = useState('');
    const [sentiment, setSentiment] = useState("");

    async function callOpenAIAPI() {
        console.log("calling the API");
        const APIBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "system",
                    "content": "You will be provided with a tweet, and your task is to classify its sentiment as positive, neutral, or negative."
                },
                {
                    "role": "user",
                    "content": "I loved the new Batman movie!"
                }
            ],
            "temperature": 0.7,
            "max_tokens": 64,
            "top_p": 1
        }
        await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + API_KEY
            },
            body: JSON.stringify(APIBody)
        }).then((data) => {
            return data.json();
        }).then((data) => {
            console.log(data);
        });
    }
    console.log(tweet);
    return (
        <div className = "App" >
            <div>
                <textarea
                    onChange={(e) => setTweet(e.target.value) }
                    placeholder="paste your tweet here"
                    cols={50}
                    rows={10}
                />
            </div>
            <div>
                <button onClick={callOpenAIAPI}>Get senti</button>
                {sentiment !== "" ?
                    <h3>this tweet is: {sentiment}</h3>
                    :
                    null
            }
            </div>
         </div>
    );
}
export default App;