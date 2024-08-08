import { Version, VersionPrefix, VersionRange } from "@/types";

export function versionRangeToString(versionRange: VersionRange): string {
    return `${versionRange.min_is_inclusive ? "INCLUSIVE" : ""} ${versionRange.min?.major}.${versionRange.min?.minor}.${versionRange.min?.patch} - ${versionRange.max_is_inclusive ? "INCLUSIVE" : ""} ${versionRange.max?.prefix}${versionRange.max?.major}.${versionRange.max?.minor}.${versionRange.max?.patch}`
}

export function convertVersionToRange(version: Version): VersionRange {
    const hasMinor = version.minor !== undefined;
    const hasPatch = version.patch !== undefined;

    const defaultMin = {
        prefix: VersionPrefix.None,
        major: version.major,
        minor: version.minor,
        patch: version.patch
    }

    const defaultMax = {
        prefix: VersionPrefix.None,
        major: version.major,
        minor: version.minor,
        patch: version.patch
    }

    var versionRange: VersionRange = {};

    // Am i proud of this function? no
    // Does it work fine? yes
    switch (version.prefix) {
        case VersionPrefix.None:
            versionRange.min = undefined
            versionRange.max = undefined
            versionRange.min_is_inclusive = true
            versionRange.max_is_inclusive = true
            break;
        case VersionPrefix.Equal:
            versionRange.min = undefined
            versionRange.max = undefined
            versionRange.min_is_inclusive = true
            versionRange.max_is_inclusive = true
            break;
        case VersionPrefix.GTE:
            versionRange.min = defaultMin
            versionRange.min_is_inclusive = true
            break;
        case VersionPrefix.LTE:
            versionRange.max = defaultMax
            versionRange.max_is_inclusive = true
            break;
        case VersionPrefix.GT:
            versionRange.min = defaultMin
            versionRange.min_is_inclusive = false
            break;
        case VersionPrefix.LT:
            versionRange.max = defaultMax
            versionRange.max_is_inclusive = false
            break;
        case VersionPrefix.Caret:
            versionRange.min = defaultMin
            versionRange.min_is_inclusive = true
            versionRange.max_is_inclusive = false

            if (version.major === 0) {
                // Special caret case - ^0.0.3
                if (hasMinor && version.minor! === 0 && hasPatch) {
                    versionRange.min = undefined
                    versionRange.max = undefined
                    versionRange.min_is_inclusive = true
                    versionRange.max_is_inclusive = true
                } else if (hasMinor && hasPatch) {
                    versionRange.max = {
                        prefix: VersionPrefix.None,
                        major: version.major,
                        minor: version.minor! + 1,
                        patch: 0
                    }
                    // ^0.0
                } else if (hasMinor && !hasPatch) {
                    versionRange.max = {
                        prefix: VersionPrefix.None,
                        major: version.major,
                        minor: (version.minor ?? 0) + 1,
                        patch: 0
                    }
                } else if (!hasMinor && !hasPatch && version.major === 0) {
                    versionRange.max = {
                        prefix: VersionPrefix.None,
                        major: 1,
                        minor: 0,
                        patch: 0
                    }
                }
            } else {
                versionRange.max = {
                    prefix: VersionPrefix.None,
                    major: version.major + 1,
                    minor: 0,
                    patch: 0
                }
            }

            break;

        case VersionPrefix.Tilde:
            versionRange.min = defaultMin
            versionRange.min_is_inclusive = true
            versionRange.max_is_inclusive = false

            if (!hasMinor) {
                versionRange.max = {
                    prefix: VersionPrefix.None,
                    major: version.major + 1,
                    minor: 0,
                    patch: 0
                }
            } else {
                versionRange.max = {
                    prefix: VersionPrefix.None,
                    major: version.major,
                    minor: (version.minor ?? 0) + 1,
                    patch: 0
                }
            }

            break;
    }

    if (versionRange.min !== undefined) {
        versionRange.min!.minor = versionRange.min!.minor ?? 0;
        versionRange.min!.patch = versionRange.min!.patch ?? 0;
    }

    if (versionRange.max !== undefined) {
        versionRange.max!.minor = versionRange.max!.minor ?? 0;
        versionRange.max!.patch = versionRange.max!.patch ?? 0;
    }

    return versionRange;
}
