"use client"

import Explanation from "@/components/Explanation";
import Footer from "@/components/Footer";
import Title from "@/components/Title";
import VersionInput from "@/components/VersionInput";
import VersionRangeView from "@/components/VersionRangeView";
import { Version, VERSION_REGEX, VersionPrefix } from "@/types";
import { IconArrowNarrowDown, IconArrowNarrowRight } from "@tabler/icons-react";
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
            setVersion(null)
        }
    }, [versionText])

    return (
        <main className="w-[100dvw] h-[100dvh] bg-surface-100 flex justify-center overflow-y-scroll">
            <div className="flex flex-col items-center justify-stretch h-full max-w-[90dvw] sm:w-[40rem] gap-12 p-1 sm:p-12">
                <figure className="sm:h-[1dvh] w-full" />
                <Title />

                <div className="flex flex-col sm:flex-row justify-between gap-4 items-center w-full">
                    <VersionInput versionIsValid={versionIsValid} onChange={(e) => {
                        setVersionText(e.target.value)
                        setVersionIsValid(e.target.value === "" || VERSION_REGEX.test(e.target.value))
                    }} />

                    <div className="grow-0 hidden sm:block">
                        <IconArrowNarrowRight
                            size={24}
                            style={{ color: '#ba9ffb' }}
                            opacity={versionIsValid && versionText != "" ? 1 : 0.5}
                        />
                    </div>

                    <div className="grow-0 sm:hidden">
                        <IconArrowNarrowDown
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
