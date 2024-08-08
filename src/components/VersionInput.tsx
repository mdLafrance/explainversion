import { IconPackage } from "@tabler/icons-react"

export default function VersionInput({versionIsValid, onChange}: { versionIsValid: boolean, onChange: (e: any) => void }) {
    return (
        <div className={`
            h-[2rem]
            w-full
            flex items-center gap-2
            px-[10px] py-[5px]
            ring-[1.2px] rounded-md ring-surface-300
            hover:ring-primary-600/40
            focus-within:ring-primary-600/60
            hover:focus-within:ring-primary-600/60
            transition-all duration-[200ms]
            bg-surface-200
            shadow-md
        `}>
            <IconPackage opacity={0.7} style={{color: '#ba9ffb'}} />
            <input
                autoFocus
                type="text"
                className={`
                    ${!versionIsValid ? "text-red-500" : "text-primary-700"}
                    font-aldrich align-bottom
                    focus:outline-none
                    bg-transparent
                    w-full
                `}
                placeholder="Enter a version..."
                onChange={onChange}
            />
        </div>
    )
}
