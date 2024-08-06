export const VERSION_REGEX = new RegExp(
    /^v?(?<prefix>(>|<|>=|<=|\^|~)?)(?<major>(\d+|\*))(\.(?<minor>(\d+|\*)))?(\.(?<patch>(\d+|\*)))?$/
)

export type Version = {
    prefix: string,
    major: number,
    minor: number,
    patch: number
}
