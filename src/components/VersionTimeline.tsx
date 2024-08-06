import { convertVersionToRange, versionRangeToString } from "@/lib/conversions";
import { Version } from "@/types";

export default function VersionTimeline({ version }: { version: Version }) {
    return (
        <div>
            {versionRangeToString(convertVersionToRange(version))}
        </div>
    )
}
