"use client"

import VersionTimeline from "@/components/VersionTimeline";
import { Version, VERSION_REGEX, VersionPrefix } from "@/types";
import { IconPackage } from "@tabler/icons-react";
import React from "react";
import { useEffect, useState } from "react";

const coerceNumber = (value: string | undefined): number | undefined => {
    if (value === undefined) {
        return undefined;
    }

    const parsed = parseInt(value);
    if (isNaN(parsed)) {
        return undefined;
    }

    return parsed;
}

export default function Home() {
    const [version, setVersion] = useState<Version | null>(null);
    const [versionText, setVersionText] = useState("");
    const [versionIsValid, setVersionIsValid] = useState(true);

    useEffect(() => {
        if (versionIsValid) {
            const match = VERSION_REGEX.exec(versionText);

            console.log(`Match on ${versionText} is ${match}`)

            if (match) {
                const major = parseInt(match.groups?.major!);
                const minor = coerceNumber(match.groups?.minor);
                const patch = coerceNumber(match.groups?.patch);
                setVersion({
                    prefix: (match.groups?.prefix ?? "") as VersionPrefix,
                    major,
                    minor,
                    patch
                })
            }
        }
    }, [versionText])

    return (
        <main className="p-4 flex gap-4">
            <div className="flex items-center gap-2 ">
                <IconPackage opacity={0.4} />
                <input
                    autoFocus
                    type="text"
                    className={`${!versionIsValid ? "text-red-500" : null}`}
                    placeholder="Version"
                    onChange={(e) => {
                        setVersionText(e.target.value)
                        setVersionIsValid(e.target.value === "" || VERSION_REGEX.test(e.target.value))
                    }}
                />
            </div>
            <span>=></span>

            {versionIsValid && version ? <VersionTimeline version={version!} /> : null}
        </main>
    );
}
