import { IconInfoCircle } from "@tabler/icons-react"
import { FaGithub, FaStar } from "react-icons/fa"
import { PiRobotLight } from "react-icons/pi"

function AboutModal() {
    return <dialog id="about-modal" className="modal">
        <div className="modal-box bg-surface-200 text-white ring-2 ring-primary-500/50">
            <h3 className="text-xl underline decoration-white/50">
                Welcome to <strong className="font-aldrich">ExplainVersion</strong>
            </h3>
            <p className="py-4">
                Ever totally forgotten what <code className="font-aldrich bg-surface-100/50 px-2 py-1 rounded-md mx-1">~2.4.15</code> means?
                <br />
                <br />
                This website can help you sanity check your semver versioning. Enter a version to see what range it decompses into.
            </p>
            <h3 className="text-xl underline decoration-white/50">
                Limitations
            </h3>
            <p>
                Currently only the following semver versioning schemes are supported, as they are the most confusing:
            </p>
            <br />
            <ul>
                <li>- Tilde</li>
                <li>- Caret</li>
            </ul>

            <br />
            <p>
                If you&apos;d like to see support for other versioning schemes, please consider opening an issue on the github page.
            </p>
            <p className="flex flex-col items-center pt-3 text-primary-600 transition-all duration-200 mt-6">
                Have you found this tool helpful?
                <br />
                <span className="flex gap-1 items-center">
                    Consider giving it a star on
                    <span className="flex items-center gap-1 text-primary-600 pl-1">
                        <FaStar style={{ color: '#ba9ffb' }} />
                        <a href="https://github.com/mdlafrance/explainversion" target="_blank" className="underline">github</a>
                    </span>
                </span>
            </p>
            <div className="modal-action">
                <form method="dialog">
                    <button className={`
                        flex font-aldrich text-primary-600 gap-1 justify-center items-center
                        rounded-lg px-2 py-1 pt-[8px]
                        bg-primary-400/20
                        hover:bg-primary-400/30
                        active:bg-primary-600/30
                        transition-all duration-[200ms]
                        text-sm
                    `}
                    >Close</button>
                </form>
            </div>
        </div>
    </dialog>
}

function AboutButton() {
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
            <AboutModal />
        </span>
    )
}

export default function Title() {
    return (
        <div className="w-full flex justify-between align-center">
            <h1 className="font-aldrich text-4xl font-semibold text-primary-700">
                Explain<span className="font-aldrich text-primary-400">Version</span>.com
            </h1>
            <AboutButton />
        </div>
    )
}
