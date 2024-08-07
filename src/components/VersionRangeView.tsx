import { convertVersionToRange } from "@/lib/conversions";
import { Version, VersionRange } from "@/types";

const versionToString = (versio: Version) => {
    return `${versio.major}.${versio.minor ?? 0}.${versio.patch ?? 0}`
}

export default function VersionRangeView({ version, versionIsValid }: { version?: Version, versionIsValid: boolean }) {

    var inner: React.ReactNode;

    if (version && versionIsValid) {
        const versionRange = convertVersionToRange(version);

        if (versionRange.min === undefined && versionRange.max === undefined) {
            inner = <>=={versionToString(version)}</>
        } else if (versionRange.min === undefined) {
            inner = <>
                {versionRange.max_is_inclusive ? "<=" : "<"}
                {versionToString(versionRange.max!)}
            </>
        } else if (versionRange.max === undefined) {
            inner = <>
                {versionRange.min_is_inclusive ? ">=" : ">"}
                {versionToString(versionRange.min!)}
            </>
        } else {
            inner = <span>
                {versionRange.min_is_inclusive ? "≥" : ">"}
                {versionToString(versionRange.min!)}
                {", "}
                {versionRange.max_is_inclusive ? "≤" : "<"}
                {versionToString(versionRange.max!)}
            </span>
        }
    } else {

    }

    return (
        <div className={`
            w-[15rem] overflow-x-scroll
            font-aldrich text-primary-700/95 rounded-md px-3 py-1 shadow-md
            flex justify-center items-center
            min-h-[2rem]
            ring-1 ring-surface-300
            bg-surface-200 ${versionIsValid ? "opacity-100" : "opacity-80"} transition-all duration-[400ms]
        `}>
            {inner}
        </div>
    )
}
