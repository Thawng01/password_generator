import React from "react";

const Indicator = ({ passwordIndicator }) => {
    return (
        <div
            className={`flex items-center mt-1 ${
                passwordIndicator ? "visible" : "hidden"
            }`}
        >
            <div className="w-[70%] relative">
                <div
                    className={`w-full h-[1.5px] absolute after:absolute ${
                        passwordIndicator === "Strong"
                            ? "after:w-full after:bg-green-600"
                            : passwordIndicator === "Medium"
                            ? "after:w-[60%] bg-yellow-200 after:bg-yellow-500"
                            : "after:w-[25%] bg-red-200 after:bg-red-500"
                    } after:h-[1.5px] after:transition-all after:duration-500`}
                />
            </div>
            <span
                className={`ml-2 font-bold ${
                    passwordIndicator === "Weak"
                        ? "text-red-500"
                        : passwordIndicator === "Medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                }`}
            >
                {passwordIndicator}
            </span>
        </div>
    );
};

export default Indicator;
