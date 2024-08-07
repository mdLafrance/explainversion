import { convertVersionToRange } from "@/lib/conversions";
import { Version, VersionPrefix } from "@/types";
import { expect, test, describe } from 'vitest'

describe("Semver tilde matching", () => {
    test("~1.2.3", () => {
        const version: Version = {
            prefix: VersionPrefix.Tilde,
            major: 1,
            minor: 2,
            patch: 3
        };

        const range = convertVersionToRange(version);

        expect(range.min_is_inclusive).toBe(true);
        expect(range.max_is_inclusive).toBe(false);
        expect(range.min).toStrictEqual(
            {
                prefix: VersionPrefix.None,
                major: 1,
                minor: 2,
                patch: 3
            }
        )
        expect(range.max).toStrictEqual(
            {
                prefix: VersionPrefix.None,
                major: 1,
                minor: 3,
                patch: 0
            }
        )
    });

    test("~1.2", () => {
        const version: Version = {
            prefix: VersionPrefix.Tilde,
            major: 1,
            minor: 2,
            patch: undefined
        };

        const range = convertVersionToRange(version);

        expect(range.min_is_inclusive).toBe(true);
        expect(range.max_is_inclusive).toBe(false);
        expect(range.min).toStrictEqual(
            {
                prefix: VersionPrefix.None,
                major: 1,
                minor: 2,
                patch: 0
            }
        )
        expect(range.max).toStrictEqual(
            {
                prefix: VersionPrefix.None,
                major: 1,
                minor: 3,
                patch: 0
            }
        )
    });

    test("~1", () => {
        const version: Version = {
            prefix: VersionPrefix.Tilde,
            major: 1,
            minor: undefined,
            patch: undefined
        };

        const range = convertVersionToRange(version);

        expect(range.min_is_inclusive).toBe(true);
        expect(range.max_is_inclusive).toBe(false);
        expect(range.min).toStrictEqual(
            {
                prefix: VersionPrefix.None,
                major: 1,
                minor: 0,
                patch: 0
            }
        )
        expect(range.max).toStrictEqual(
            {
                prefix: VersionPrefix.None,
                major: 2,
                minor: 0,
                patch: 0
            }
        )
    });

    test("~0.2.3", () => {
        const version: Version = {
            prefix: VersionPrefix.Tilde,
            major: 0,
            minor: 2,
            patch: 3
        };

        const range = convertVersionToRange(version);

        expect(range.min_is_inclusive).toBe(true);
        expect(range.max_is_inclusive).toBe(false);
        expect(range.min).toStrictEqual(
            {
                prefix: VersionPrefix.None,
                major: 0,
                minor: 2,
                patch: 3
            }
        )
        expect(range.max).toStrictEqual(
            {
                prefix: VersionPrefix.None,
                major: 0,
                minor: 3,
                patch: 0
            }
        )
    });

    test("~0.2", () => {
        const version: Version = {
            prefix: VersionPrefix.Tilde,
            major: 0,
            minor: 2,
            patch: undefined
        };

        const range = convertVersionToRange(version);

        expect(range.min_is_inclusive).toBe(true);
        expect(range.max_is_inclusive).toBe(false);
        expect(range.min).toStrictEqual(
            {
                prefix: VersionPrefix.None,
                major: 0,
                minor: 2,
                patch: 0
            }
        )
        expect(range.max).toStrictEqual(
            {
                prefix: VersionPrefix.None,
                major: 0,
                minor: 3,
                patch: 0
            }
        )
    });

    test("~0", () => {
        const version: Version = {
            prefix: VersionPrefix.Tilde,
            major: 0,
            minor: undefined,
            patch: undefined
        };

        const range = convertVersionToRange(version);

        expect(range.min_is_inclusive).toBe(true);
        expect(range.max_is_inclusive).toBe(false);
        expect(range.min).toStrictEqual(
            {
                prefix: VersionPrefix.None,
                major: 0,
                minor: 0,
                patch: 0
            }
        )
        expect(range.max).toStrictEqual(
            {
                prefix: VersionPrefix.None,
                major: 1,
                minor: 0,
                patch: 0
            }
        )
    });
});

describe("Semver caret matching", () => {
    test("^1.2.3", () => {
        const version: Version = {
            prefix: VersionPrefix.Caret,
            major: 1,
            minor: 2,
            patch: 3
        };

        const range = convertVersionToRange(version);

        expect(range.min_is_inclusive).toBe(true);
        expect(range.max_is_inclusive).toBe(false);
        expect(range.min).toStrictEqual(
            {
                prefix: VersionPrefix.None,
                major: 1,
                minor: 2,
                patch: 3
            }
        )
        expect(range.max).toStrictEqual(
            {
                prefix: VersionPrefix.None,
                major: 2,
                minor: 0,
                patch: 0
            }
        )
    });

    test("^0.2.3", () => {
        const version: Version = {
            prefix: VersionPrefix.Caret,
            major: 0,
            minor: 2,
            patch: 3
        };

        const range = convertVersionToRange(version);

        expect(range.min_is_inclusive).toBe(true);
        expect(range.max_is_inclusive).toBe(false);
        expect(range.min).toStrictEqual(
            {
                prefix: VersionPrefix.None,
                major: 0,
                minor: 2,
                patch: 3
            }
        )
        expect(range.max).toStrictEqual(
            {
                prefix: VersionPrefix.None,
                major: 0,
                minor: 3,
                patch: 0
            }
        )
    });

    test("^0.0.3", () => {
        const version: Version = {
            prefix: VersionPrefix.Caret,
            major: 0,
            minor: 0,
            patch: 3
        };

        const range = convertVersionToRange(version);

        expect(range.min_is_inclusive).toBe(true);
        expect(range.max_is_inclusive).toBe(true);
        expect(range.min).toBeUndefined();
        expect(range.max).toBeUndefined();
    });

    test("^1.2", () => {
        const version: Version = {
            prefix: VersionPrefix.Caret,
            major: 1,
            minor: 2,
            patch: undefined
        };

        const range = convertVersionToRange(version);

        expect(range.min_is_inclusive).toBe(true);
        expect(range.max_is_inclusive).toBe(false);
        expect(range.min).toStrictEqual(
            {
                prefix: VersionPrefix.None,
                major: 1,
                minor: 2,
                patch: 0
            }
        )
        expect(range.max).toStrictEqual(
            {
                prefix: VersionPrefix.None,
                major: 2,
                minor: 0,
                patch: 0
            }
        )
    });

    test("^0.0", () => {
        const version: Version = {
            prefix: VersionPrefix.Caret,
            major: 0,
            minor: 0,
            patch: undefined
        };

        const range = convertVersionToRange(version);

        expect(range.min_is_inclusive).toBe(true);
        expect(range.max_is_inclusive).toBe(false);
        expect(range.min).toStrictEqual(
            {
                prefix: VersionPrefix.None,
                major: 0,
                minor: 0,
                patch: 0
            }
        )
        expect(range.max).toStrictEqual(
            {
                prefix: VersionPrefix.None,
                major: 0,
                minor: 1,
                patch: 0
            }
        )
    });

    test("^1", () => {
        const version: Version = {
            prefix: VersionPrefix.Caret,
            major: 1,
            minor: undefined,
            patch: undefined
        };

        const range = convertVersionToRange(version);

        expect(range.min_is_inclusive).toBe(true);
        expect(range.max_is_inclusive).toBe(false);
        expect(range.min).toStrictEqual(
            {
                prefix: VersionPrefix.None,
                major: 1,
                minor: 0,
                patch: 0
            }
        )
        expect(range.max).toStrictEqual(
            {
                prefix: VersionPrefix.None,
                major: 2,
                minor: 0,
                patch: 0
            }
        )
    });

    test("^0", () => {
        const version: Version = {
            prefix: VersionPrefix.Caret,
            major: 0,
            minor: undefined,
            patch: undefined
        };

        const range = convertVersionToRange(version);

        expect(range.min_is_inclusive).toBe(true);
        expect(range.max_is_inclusive).toBe(false);
        expect(range.min).toStrictEqual(
            {
                prefix: VersionPrefix.None,
                major: 0,
                minor: 0,
                patch: 0
            }
        )
        expect(range.max).toStrictEqual(
            {
                prefix: VersionPrefix.None,
                major: 1,
                minor: 0,
                patch: 0
            }
        )
    });
});
