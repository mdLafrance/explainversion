import { convertVersionToRange } from "@/lib/conversions";
import { Version, VersionRange } from "@/types";

const versionToString = (versio: Version) => {
    return `${versio.major}.${versio.minor ?? 0}.${versio.patch ?? 0}`
}

export default function VersionRangeView({ version }: { version: Version }) {
    const versionRange = convertVersionToRange(version);

    if (versionRange.min === undefined && versionRange.max === undefined) {
        return <>=={versionToString(version)}</>
    } else if (versionRange.min === undefined) {
        return <>
            {versionRange.max_is_inclusive ? "<=" : "<"}
            {versionToString(versionRange.max!)}
        </>
    } else if (versionRange.max === undefined) {
        return <>
            {versionRange.min_is_inclusive ? ">=" : ">"}
            {versionToString(versionRange.min!)}
        </>
    } else {
        return <>
            {versionRange.min_is_inclusive ? "≥" : ">"}
            {versionToString(versionRange.min!)}
            {", "}
            {versionRange.max_is_inclusive ? "≤" : "<"}
            {versionToString(versionRange.max!)}
        </>
    }
}
