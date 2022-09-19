import React from "react";

const Copied = ({ visible }) => {
    return (
        <div
            className={`absolute top-0 left-0 w-full bg-green-500 px-3 py-2 flex justify-end transition-all duration-500 ${
                visible ? "opacity-1 scale-1" : "opacity-0 scale-0"
            }`}
        >
            <span className="text-white mr-2">Copied!</span>
            <span>&#128076;</span>
        </div>
    );
};

export default Copied;
