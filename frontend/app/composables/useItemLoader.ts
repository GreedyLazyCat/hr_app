import ItemsLoader from "~/utils/items_loader";

export default function <T>(page: number, itemsPerPage: number, apiPath: string, constantFilters: Record<string, any> = {}) {
    const itemsLoader = new ItemsLoader<T>(page, itemsPerPage, apiPath, constantFilters)

    return {
        items: itemsLoader.items,
        loadingItems: itemsLoader.loadingItems,
        itemFilters: itemsLoader.filters,
        shouldShowLoadingSpinner: itemsLoader.shouldShowLoadingSpinner,
        loadNextPage: () => itemsLoader.loadNextPage(),
        reload: () => itemsLoader.reload(),
        loadFirstPage: () => itemsLoader.loadFirstPage(),
        setFilters: (filters: Partial<T>) => itemsLoader.setFilters(filters),
        deleteItem: (predicate: (item: T) => boolean) => itemsLoader.deleteItem(predicate),
        endReached: itemsLoader.endReached,
        setEndReached: (val: boolean) => itemsLoader.endReached = val
    }
}