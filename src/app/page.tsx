"use client"

import Explanation from "@/components/Explanation";
import Footer from "@/components/Footer";
import Title from "@/components/Title";
import VersionInput from "@/components/VersionInput";
import VersionRangeView from "@/components/VersionRangeView";
import VersionTimeline from "@/components/VersionTimeline";
import { convertVersionToRange } from "@/lib/conversions";
import { Version, VERSION_REGEX, VersionPrefix } from "@/types";
import { IconArrowNarrowRight, IconArrowRight, IconPackage } from "@tabler/icons-react";
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
        } else {
            console.log("Invalid version!: Version is:", version)

            setVersion(null)
        }
    }, [versionText])

    return (
        <main className="w-screen h-screen bg-surface-100 flex justify-center overflow-y-scroll">
            <div className="flex flex-col items-center h-full max-w-[35rem] gap-12 p-12">
                <figure className="h-[1dvh]"/>
                <Title />
                <div className="flex justify-between gap-4 items-center w-full h-[2rem]">
                    <VersionInput versionIsValid={versionIsValid} onChange={(e) => {
                        setVersionText(e.target.value)
                        setVersionIsValid(e.target.value === "" || VERSION_REGEX.test(e.target.value))
                    }} />

                    <div className="grow-0">
                        <IconArrowNarrowRight
                            size={24}
                            style={{ color: '#ba9ffb' }}
                            opacity={versionIsValid && versionText != "" ? 1 : 0.5}
                            className="grow-0"
                        />
                    </div>
                    <VersionRangeView version={version} versionIsValid={versionIsValid && versionText?.length !== 0} />

                </div>

                {versionText !== "" && versionText[0] === "~" || versionText[0] === "^" ? <Explanation constraint={versionText[0] as VersionPrefix} /> : null}
                <figure className="grow grow-1" />
                <Footer />
            </div>
        </main>
    );
}
