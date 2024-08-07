"use client"

import { CaretExplanation, TildeExplanation } from "@/lib/explanations";
import { VersionPrefix } from "@/types";
import { IconInfoCircle } from "@tabler/icons-react";
import { useState } from "react";

export default function Explanation({ constraint }: { constraint: VersionPrefix }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    }

    var explanationText: React.ReactNode

    if (constraint === "~") {
        explanationText = (
            <p>
                A <strong>tilde </strong>constraint allows minor-level changes if a major version is specified. If only a minor or patch level version is specified, it allows patch-level changes.
                <br />
                <br />
                For more information, see <a href="https://www.npmjs.com/package/semver" target="_blank" rel="noreferrer" className="underline decoration-primary-600 text-primary-600">npmjs.com/pakage/semver</a>.
            </p>
        )
    } else if (constraint === "^") {
        explanationText = (
            <p>
                A caret constraint allows changes that do <strong>not </strong>modify the <strong>left-most </strong>non-zero element in the [major, minor, patch] tuple. In other words, this allows patch and minor updates for versions 1.0.0 and above, patch updates for versions 0.X >=0.1.0, and no updates for versions 0.0.X.
                <br />
                <br />
                For more information, see <a href="https://www.npmjs.com/package/semver" target="_blank" rel="noreferrer" className="underline decoration-primary-600 text-primary-600">npmjs.com/pakage/semver</a>.
            </p>
        )
    }

    return (
        <div className={`
            rounded-md overflow-clip shadow-md text-primary-700/95 text-sm
            bg-surface-300
            ring-1 ring-surface-300
        `}>
            <span className="flex gap-[5px] items-start p-3 bg-surface-200 rounded-md">
                <IconInfoCircle size={22} style={{ color: '#ba9ffb' }} />
                <h1 className="font-inter text-md font-bold">
                    Explanation of {constraint} constraints
                </h1>
            </span>
            <pre className="text-sm p-4 text-wrap">
                {explanationText}
            </pre>
        </div>
    )
}
