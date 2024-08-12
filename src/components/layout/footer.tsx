import React from "react";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (

        <>
            <footer className="flex items-center justify-center">
                <div>
                    <img
                        className="h-4 w-auto"
                        src="/logo.svg"
                        alt="MyWealth Inc"
                    />
                </div>
                <div>
                    <span className="text-sm text-blue-800 tracking-tight ml-1">
                        <a href="http://mywealthcare.io" target="_blank" rel="noreferrer">Powered by MyWealth</a>
                    </span>
                </div>
                <div>
                    <span className="text-sm tracking-tight ml-1">&nbsp;@{currentYear}&nbsp;-&nbsp;</span>
                </div>

                <div>
                    <span className="text-sm tracking-tight ml-1">All rights reserved</span>
                </div>
            </footer>
        </>
    );
}


