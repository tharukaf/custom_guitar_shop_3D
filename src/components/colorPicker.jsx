import React from "react";

export default function ColorPicker() {
    return (
        <div className="colorPicker">
            <button
                style={{
                    backgroundColor: "white",
                    width: "20px",
                    height: "20px",
                    border: "1px solid black",
                }}
                onClick={() => changeBackground("white")}
            ></button>
            <button
                style={{
                    backgroundColor: "black",
                    width: "20px",
                    height: "20px",
                    border: "1px solid black",
                }}
                onClick={() => changeBackground("black")}
            ></button>
            <button
                style={{
                    backgroundColor: "grey",
                    width: "20px",
                    height: "20px",
                    border: "1px solid black",
                }}
                onClick={() => changeBackground("grey")}
            ></button>
        </
    )
}