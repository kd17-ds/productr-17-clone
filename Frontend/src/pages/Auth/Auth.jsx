import React from "react";
import LeftAuth from "./LeftAuth";
import RightAuth from "./RightAuth";

export default function Login() {
    return (
        <div className="min-h-screen flex">
            <LeftAuth />
            <RightAuth />
        </div>
    );
}
