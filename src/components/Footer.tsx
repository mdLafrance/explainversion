import { IconBolt, IconHeart } from "@tabler/icons-react";

export default function Footer() {
    return (
        <span className={`
            text-sm font-aldrich text-primary-600
            opacity-30 hover:opacity-100 transition-opacity duration-200
        `}>
            <IconBolt size={18} style={{ color: '#ba9ffb' }} className="inline" />
            Made by <a href="https://github.com/mdlafrance/explainversion" target="_blank" className="underline">Max Lafrance</a>

        </span>
    )
}
