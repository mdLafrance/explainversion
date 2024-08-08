export const VERSION_REGEX = new RegExp(
    /^v?(?<prefix>(>|<|>=|<=|\^|~)?)(?<major>\d+)(\.(?<minor>\d+))?(\.(?<patch>\d+))?$/
)

export enum VersionPrefix {
    None = "",
    Equal = "=",
    GTE = ">=",
    LTE = "<=",
    GT = ">",
    LT = "<",
    Caret = "^",
    Tilde = "~"
}

export type Version = {
    prefix: VersionPrefix,
    major: number,
    minor?: number,
    patch?: number
}

export type VersionRange = {
    min?: Version,
    max?: Version,
    min_is_inclusive?: boolean,
    max_is_inclusive?: boolean
}

