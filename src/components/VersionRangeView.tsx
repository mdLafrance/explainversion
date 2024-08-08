import { convertVersionToRange } from "@/lib/conversions";
import { Version } from "@/types";

const versionToString = (versio: Version) => {
    return `${versio.major}.${versio.minor ?? 0}.${versio.patch ?? 0}`
}

export default function VersionRangeView({ version, versionIsValid }: { version: Version | undefined | null, versionIsValid: boolean }) {

    var inner: React.ReactNode;

    if (version && versionIsValid) {
        const versionRange = convertVersionToRange(version);

        if (versionRange.min === undefined && versionRange.max === undefined) {
            inner = versionToString(version)
        } else if (versionRange.min === undefined) {
            inner = (
                <>
                    <span>{versionRange.max_is_inclusive ? "<=" : "<"}</span>
                    <span>{versionToString(versionRange.max!)}</span>
                </>
            )

        } else if (versionRange.max === undefined) {
            inner = (
                <>
                    <span>{versionRange.min_is_inclusive ? ">=" : ">"}</span>
                    <span>{versionToString(versionRange.min!)}</span>
                </>
            )
        } else {
            inner = (
                <>
                    <span>{versionRange.min_is_inclusive ? ">=" : ">"}</span>
                    <span>{versionToString(versionRange.min!)}</span>
                    <pre className="pr-1">{","}</pre>
                    <span>{versionRange.max_is_inclusive ? "<=" : "<"}</span>
                    <span>{versionToString(versionRange.max!)}</span>
                </>
            )
        }
    } else {

    }

    return (
        <div className={`
            overflow-x-hidden
            font-aldrich text-primary-700/95 rounded-md px-3 py-1 shadow-md
            flex justify-center items-center
            ring-1 ring-surface-300
            h-[2rem]
            w-full
            ${versionIsValid ? "opacity-100" : "opacity-80"} transition-all duration-[400ms]
        `}>
            {inner}
        </div>
    )
}
