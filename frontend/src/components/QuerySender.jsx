import React, { useState, useEffect } from 'react';
import {query_sender_style} from './QuerySenderStyle'

const QuerySender = () => {
    const [query, setQuery] = useState('');
    const [answer, setAnswer] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResponse = async () => {
            if (!isSubmitted) return;

            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch('http://localhost:3000/query', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setAnswer(data.response);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                setAnswer('');
            } finally {
                setIsLoading(false);
                setIsSubmitted(false);
            }
        };

        fetchResponse();
    }, [query, isSubmitted]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        setIsSubmitted(true);
    };

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <div className="query-container">
            <div className="query-card">
                <h1>AI Agent for Dan Abramov's college life and React Wiki</h1>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            id="query"
                            type="text"
                            value={query}
                            onChange={handleChange}
                            placeholder="What would you like to know?"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !query.trim()}
                        >
                            {isLoading ? 'Processing...' : 'Send'}
                        </button>
                    </div>
                </form>

                {error && (
                    <div className="error-message">
                        Error: {error}
                    </div>
                )}

                {isLoading && (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <span>Thinking...</span>
                    </div>
                )}

                {answer && (
                    <div className="answer-container">
                        <div id="answer">
                            {answer}
                        </div>
                    </div>
                )}
            </div>
            <style >{query_sender_style}</style>
        </div>
    );
};

export default QuerySender;