import { convertVersionToRange, versionRangeToString } from "@/lib/conversions";
import { Version } from "@/types";
import React from "react";

export default function VersionTimeline({ version }: { version: Version }) {
    return (
        <div>
            {versionRangeToString(convertVersionToRange(version))}
        </div>
    )
}
