import { IconInfoCircle } from "@tabler/icons-react"
import { W } from "vitest/dist/chunks/reporters.C_zwCd4j.js"

function WhatIsThisButton() {
    return (
        <span className="flex items-center">
            <button className={`
                flex font-aldrich text-primary-600 gap-1 justify-center items-center
                rounded-lg px-2 py-1 pt-[8px]
                bg-primary-400/20
                hover:bg-primary-400/30
                active:bg-primary-600/30
                transition-all duration-[200ms]
                text-sm
            `}
                onClick={() => {
                    (document.getElementById("about-modal") as any).showModal()
                }}
            >
                <IconInfoCircle size={18} className="text-primary-600" />
                About
            </button>
            <dialog id="about-modal" className="modal">
                <div className="modal-box bg-surface-200 text-white ring-1 ring-surface-500">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn bg-primary-200/80 text-white/90 hover:bg-primary-200/60 active:bg-primary-200/40 transition-all duration-[200ms] ">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </span>
    )
}

export default function Title() {
    return (
        <div className="w-full flex justify-between align-center">
            <h1 className="font-aldrich text-4xl font-semibold text-primary-700">
                Explain<span className="font-aldrich text-primary-400">Version</span>.com
            </h1>
            <WhatIsThisButton />
        </div>
    )
}
