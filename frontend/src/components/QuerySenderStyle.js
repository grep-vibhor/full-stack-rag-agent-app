export const query_sender_style = `
    .query-container {
        min-height: 100vh;
        padding: 20px;
        background: linear-gradient(135deg, #f5f7ff 0%, #e9efff 100%);
        display: flex;
        justify-content: center;
        align-items: flex-start;
    }

    .query-card {
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
        padding: 30px;
        width: 100%;
        max-width: 600px;
        margin-top: 40px;
    }

    h1 {
        color: #333;
        text-align: center;
        margin-bottom: 30px;
        font-size: 24px;
    }

    .input-group {
        position: relative;
        margin-bottom: 20px;
        width: 100%;
    }

    input {
        width: 100%;
        padding: 12px;
        padding-right: 110px;
        border: 2px solid #e1e1e1;
        border-radius: 8px;
        font-size: 16px;
        transition: all 0.3s ease;
        box-sizing: border-box;
    }

    input:focus {
        outline: none;
        border-color: #4a90e2;
        box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
    }

    input:disabled {
        background-color: #f5f5f5;
        cursor: not-allowed;
    }

    button {
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        background-color: #4a90e2;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    button:hover:not(:disabled) {
        background-color: #357abd;
    }

    button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
        opacity: 0.7;
    }

    .error-message {
        background-color: #fff5f5;
        color: #e53e3e;
        padding: 12px;
        border-radius: 6px;
        margin-bottom: 20px;
        border: 1px solid #feb2b2;
    }

    .loading-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 20px 0;
        color: #666;
    }

    .spinner {
        width: 24px;
        height: 24px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #4a90e2;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    .answer-container {
        animation: fadeIn 0.5s ease-in;
    }

    #answer {
        background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
        padding: 20px;
        border-radius: 8px;
        border: 1px solid #e6ebf5;
        line-height: 1.6;
        color: #333;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 480px) {
        .query-card {
            padding: 20px;
            margin-top: 20px;
        }

        input {
            font-size: 14px;
        }

        button {
            padding: 6px 12px;
            font-size: 14px;
        }
    }
`