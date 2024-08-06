import { Version, VersionPrefix } from "@/types";

export type VersionRange = {
    min?: Version,
    max?: Version,
    min_is_inclusive?: boolean,
    max_is_inclusive?: boolean
}

export function versionRangeToString(versionRange: VersionRange): string {
    return `${versionRange.min?.prefix}${versionRange.min?.major}.${versionRange.min?.minor}.${versionRange.min?.patch} - ${versionRange.max?.prefix}${versionRange.max?.major}.${versionRange.max?.minor}.${versionRange.max?.patch}`
}

export function convertVersionToRange(version: Version): VersionRange {
    var mostSignificantNumber: "major" | "minor" | "patch" | null;

    if (version.major !== 0) {
        mostSignificantNumber = "major";
    }
    else if (version.major === 0 && version.minor === undefined) {
        mostSignificantNumber = "major";
    }
    else if (version.minor !== 0) {
        mostSignificantNumber = "minor";
    }
    else if (version.minor === 0 && version.patch === undefined) {
        mostSignificantNumber = "minor";
    } else {
        mostSignificantNumber = "patch";
    }

    var versionRange: VersionRange = {};

    switch (version.prefix) {
        case VersionPrefix.None:
            console.log("None")
            versionRange.min = version
            versionRange.max = version
            versionRange.min_is_inclusive = true
            versionRange.max_is_inclusive = true
            break;
        case VersionPrefix.Equal:
            versionRange.min = version
            versionRange.max = version
            versionRange.min_is_inclusive = true
            versionRange.max_is_inclusive = true
            break;
        case VersionPrefix.GTE:
            versionRange.min = version
            versionRange.min_is_inclusive = true
            break;
        case VersionPrefix.LTE:
            versionRange.max = version
            versionRange.max_is_inclusive = true
            break;
        case VersionPrefix.GT:
            versionRange.min = version
            versionRange.min_is_inclusive = false
            break;
        case VersionPrefix.LT:
            versionRange.max = version
            versionRange.max_is_inclusive = false
            break;
        case VersionPrefix.Caret:
            versionRange.min = version
            versionRange.min_is_inclusive = true
            versionRange.max_is_inclusive = false

            switch (mostSignificantNumber) {
                case "major":
                    versionRange.max = {
                        prefix: VersionPrefix.None,
                        major: version.major + 1,
                        minor: 0,
                        patch: 0
                    }
                    break;
                case "minor":
                    versionRange.max = {
                        prefix: VersionPrefix.None,
                        major: 0,
                        minor: version.minor! + 1,
                        patch: 0
                    }
                    break;
                case "patch":
                    versionRange.max = {
                        prefix: VersionPrefix.None,
                        major: 0,
                        minor: 0,
                        patch: (version.patch ?? 0) + 1
                    }
                    break;
            }
            break;

        case VersionPrefix.Tilde:
            versionRange.min = version
            versionRange.min_is_inclusive = true
            versionRange.max_is_inclusive = false

            versionRange.max = {
                prefix: VersionPrefix.None,
                major: version.major,
                minor: (version.minor ?? 0) + 1,
                patch: 0
            }
            break;
    }

    return versionRange;
}
