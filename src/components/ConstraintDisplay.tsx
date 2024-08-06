import { Version, VersionPrefix } from "@/types";

type VersionConstraint = {
    version: number,
    constraint: Constraint
}

enum Constraint {
    Equal,
    GTE,
    LTE,
    GT,
    LT
}

function FadeOutList({ children, direction }: { children: React.ReactNode, direction: "up" | "down" }) {
    return (
        <div
            className={`
                h-[4rem]
                flex ${direction === "down" ? "flex-col" : "flex-col-reverse"}
                justify-${direction === "down" ? "start" : "end"}
                ${direction === "down" ? "fade-out-bottom" : "fade-out-top"}
            `}
        >
            {children}
        </div>
    )
}

function NumberDisplay({ constraint }: { constraint: VersionConstraint }) {
    var greaterVersions = []
    var lesserVersions = []

    return (
        <div className={`
            flex flex-col items-center justify-center
            h-[10rem] 
        `}>

            {/** Possible greater versions number **/}
            <FadeOutList direction="up">
                <span>foo</span>
                <span>bar</span>
                <span>baz</span>
            </FadeOutList>

            {/** Current number **/}
            <div className="h-[2rem] bg-blue-500 w-full flex justify-center items-center">
                {constraint.version}
            </div>

            {/** Possible greater versions number **/}
            <FadeOutList direction="down">
                <span>foo</span>
                <span>bar</span>
                <span>baz</span>
            </FadeOutList>
        </div>
    );
}

function calculateConstraints(version: Version): [VersionConstraint, VersionConstraint, VersionConstraint] {
    switch (version?.prefix) {
        case VersionPrefix.None:
            return [
                {
                    version: version.major,
                    constraint: Constraint.Equal
                },
                {
                    version: version.minor,
                    constraint: Constraint.Equal
                },
                {
                    version: version.patch,
                    constraint: Constraint.Equal
                }
            ]
        default:
            throw new Error("Not implemented")
    }
}

export default function ConstraintDisplay({ version }: { version: Version }) {
    console.log("Mounting version:", version)
    const [major, minor, patch] = calculateConstraints(version);

    return (
        <div className="flex gap-2">
            <NumberDisplay constraint={major} />
            <NumberDisplay constraint={minor} />
            <NumberDisplay constraint={patch} />
        </div>
    );
}
