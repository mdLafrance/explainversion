import { Version } from "@/types";

enum VersionConstraint {
    Equal,
    Any,
    GTE,
    LTE
}


function NumberDisplay({ value, constraint }: { value: number, constraint: VersionConstraint }) {
    return (
        <div className={`
            flex flex-col items-center justify-center
            h-[10rem] bg-blue-500
            bg-gradient-to-t from-red-500 to-transparent
        `}>

            {/** Possible greater versions number **/}
            <div className="text-xl flex flex-col font-bold mask-fadeout">
                <span>foo</span>
                <span>foo</span>
                <span>foo</span>
                <span>foo</span>
                <span>foo</span>
            </div>
            {/** Current number **/}
            <div className="text-xl font-bold bg-green-500">
                {value}
            </div>
            {/** Possible greater smaller versions **/}
            <div className="text-xl font-bold bg-green-500 grow-grow-1">
                bar
            </div>
        </div>
    );
}

export default function ConstraintDisplay({ version }: { version: Version }) {

    return (
        <div className="flex flex gap-2">
            <div className="h-64 bg-blue-500 fade-out-bottom">
                <p className="p-4 text-white">This content will fade out at the bottom</p>
            </div>
        </div>
    );
}
