import globby from "globby";
import { FilterCollection } from "../types";
import { defaultPolicyFilter, defaultProjectFilter } from "../constant";

export function makePatternIgnore(patternCollection: FilterCollection): FilterCollection {
    return patternCollection.map((pattern) => (pattern.charAt(0) !== "!" ? `!${pattern}` : pattern));
}

export function filterPolicy(posixPath: string, includeFilters: FilterCollection, excludeFilters: FilterCollection = []): Array<string> {
    return globby.sync([...includeFilters, ...defaultPolicyFilter, ...makePatternIgnore(excludeFilters)], {
        onlyFiles: true,
        cwd: posixPath,
    });
}

export function filterProject(posixPath: string, excludeFilters: FilterCollection = []): Array<string> {
    return globby.sync([...defaultProjectFilter, ...makePatternIgnore(excludeFilters)], {
        onlyFiles: true,
        cwd: posixPath,
    });
}
