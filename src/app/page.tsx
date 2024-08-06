"use client"

import ConstraintDisplay from "@/components/ConstraintDisplay";
import Header from "@/components/Header";
import { Version, VERSION_REGEX } from "@/types";
import { IconPackage } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function Home() {
    const [version, setVersion] = useState<Version | null>(null);
    const [versionText, setVersionText] = useState("");
    const [versionisValid, setVersionIsValid] = useState(false);

    useEffect(() => {
        if (versionisValid) {
            const match = VERSION_REGEX.exec(versionText);

            console.log(`Match on ${versionText} is ${match}`)

            if (match) {
                const major = parseInt(match.groups?.major!);
                const minor = parseInt(match.groups?.minor ?? "0");
                const patch = parseInt(match.groups?.patch ?? "0");
                setVersion({
                    prefix: match.groups?.prefix ?? "",
                    major,
                    minor,
                    patch
                })
            }
        }
    }, [versionText])

    return (
        <main className="">
            <label className="input input-bordered flex items-center gap-2">
                <IconPackage opacity={0.4} />
                <input
                    type="text"
                    className="grow"
                    placeholder="Version"
                    onChange={(e) => {
                        setVersionText(e.target.value)
                        setVersionIsValid(VERSION_REGEX.test(e.target.value))
                    }}
                />
            </label>
            <p></p>
            {versionisValid ? "Valid" : "Invalid"}

            <p></p>
            {versionisValid ? <ConstraintDisplay version={version!} /> : null}
        </main>
    );
}
