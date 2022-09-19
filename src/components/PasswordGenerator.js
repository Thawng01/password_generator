import React, { useEffect, useRef, useState } from "react";
import Copied from "./Copied";
import Indicator from "./Indicator";

const PASSWORD_LENGTH = 15;
const PasswordGenerator = () => {
    const [password, setPassword] = useState("");
    const [passwordIndicator, setPasswordIndicator] = useState(null);
    const [symbol, setSymbol] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const ref = useRef();

    const generatePassword = () => {
        ref.current.focus();
        let password = "";
        for (let i = 0; i < PASSWORD_LENGTH; i++) {
            let choice = random(0, 3);
            if (choice === 0) {
                password += randomLowerLetter();
            } else if (choice === 1) {
                password += randomUpperLetter();
            } else if (choice === 2) {
                password += random(0, 9);
            } else if (symbol && choice === 3) {
                password += randomSymbols();
            }
        }

        setPassword(password);

        navigator.clipboard
            .writeText(password)
            .then(() => setIsCopied(true))
            .catch(() => setIsCopied(false));
    };

    const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const randomLowerLetter = () => String.fromCharCode(random(97, 122));
    const randomUpperLetter = () => String.fromCharCode(random(65, 90));
    const randomSymbols = () => {
        const symbols = "~!@#$%^&*?";
        return symbols[random(0, symbols.length - 1)];
    };

    useEffect(() => {
        const result = password.match(/[~!@#$%^&*?]/gi);
        if (result) {
            setPasswordIndicator("Strong");
        } else if (password && password.length >= 10) {
            setPasswordIndicator("Medium");
        } else if (password && password.length < 10) {
            setPasswordIndicator("Weak");
        } else {
            setPasswordIndicator(null);
        }
    }, [password]);

    useEffect(() => {
        if (isCopied) setTimeout(() => setIsCopied(false), 2000);
    }, [isCopied]);

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="shadow-xl p-12 rounded-lg relative">
                <Copied visible={isCopied} />
                <div className="flex items-center">
                    <input
                        ref={ref}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Generate password"
                        className="px-3 py-2 border-[1px] rounded-tl-md rounded-bl-md focus:outline-none"
                    />
                    <button
                        onClick={generatePassword}
                        className="bg-fuchsia-900 rounded-br-md rounded-tr-md px-2 py-[9px] border-fuchsia-900 text-white"
                    >
                        Generate
                    </button>
                </div>

                <Indicator passwordIndicator={passwordIndicator} />

                <div className="mt-2">
                    <input
                        type="checkbox"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.checked)}
                    />
                    <span className="ml-2 text-gray-500 font-bold">
                        Include symbols to generate more secure password.
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PasswordGenerator;
