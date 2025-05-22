import Navbar from "@/components/Navbar";
import '../styles/globals.css';
import Vapi from "@vapi-ai/web";
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';

const vapi = new Vapi(""); // put own key

export default function Home() {
    const [connecting, setConnecting] = useState(false);
    const [conversation, setConversation] = useState([]);
    const [transcripts, setTranscripts] = useState([]);
    const router = useRouter();

    // ✅ Define Sales Interview Questions
    const questions = [
        "Tell me about a time you closed a big enterprise deal.",
        "How would you pitch an AI tool to a skeptical law firm partner?",
        "What’s your top prospecting tactic?"
    ];

    // ✅ Initialize Vapi to listen for messages
    const initializeVapi = useCallback(() => {
        let currentQuestionIndex = 0;

        vapi.on('message', (message) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                // Assign each response to the correct question
                const question = questions[currentQuestionIndex] || "Unknown Question";
                
                setConversation((prev) => [
                    ...prev,
                    { question, response: message.transcript, timestamp: new Date().toLocaleTimeString(), isFinal: true },
                ]);

                currentQuestionIndex = Math.min(currentQuestionIndex + 1, questions.length - 1);
            }
        });

        vapi.on('call-end', () => {
            endCall();
        });
    }, []);

    useEffect(() => {
        initializeVapi();
    }, [initializeVapi]);

    const startCall = () => {
        setConnecting(true);
        vapi.start(assistantOptions);
    };

    const endCall = async () => {
        if (vapi) {
            vapi.stop();
        }
        setConnecting(false);

        console.log("📜 Final Transcripts:", conversation);

        if (conversation.length === 0) {
            return;
        }

        // ✅ Match Responses with the Correct Questions
        const transcriptsToSend = conversation.map((item, index) => ({
            question: questions[index] || "Unknown Question",
            response: item.response
        }));

        console.log("🚀 Sending transcripts to Eden AI:", transcriptsToSend);

        try {
            const response = await fetch('/api/analyze-responses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ transcripts: transcriptsToSend }),
            });

            const data = await response.json();
            console.log("✅ Eden AI Analysis Response:", data);

            localStorage.setItem('interviewResults', JSON.stringify({
                transcripts: transcriptsToSend,
                analysis: data.analysis,
            }));

            // ✅ Trigger event for live update on Results page
            window.dispatchEvent(new Event("storage"));

            router.push('/results');
        } catch (error) {
            console.error("❌ Error sending transcript for analysis:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <main className="flex flex-col items-center justify-start min-h-screen pt-32">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Welcome to <span className="text-blue-600">SalesBot!</span>
                </h1>
                <p className="text-gray-600 mb-6">
                    Click below to start your simulated sales interview.
                </p>
                <button 
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" 
                    onClick={connecting ? endCall : startCall}
                >
                    {connecting ? "End Interview" : "Start Interview"}
                </button>
            </main>
        </div>
    );
}

// ✅ Removed OpenAI, Now Only Handles Voice and Transcript Capture
const assistantOptions = {
    name: "SalesBot Assistant",
    firstMessage: "Hi! Let's start your sales interview. Are you ready for the first question?",
    transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
    },
    voice: {
        provider: "playht",
        voiceId: "jennifer",
    },
};