interface ListReturn<T> {
  data: T[];
  page: number;
  itemsPerPage: number;
  isLastPage: boolean;
}

/**
 * Класс для удобной загрузки пагинированных списков с сервера
 */
export default class ItemsLoader<T> {
  /**
   * Страница
   */
  page = 1;
  /**
   * Реактивный список элементов
   */
  items: Ref<T[]> = ref([]);
  /**
   * Фильтры, которые помещаются в запрос, при загрузке элементов
   */
  filters: Partial<T> | null = null;
  /**
   * Постоянные фильтры, которые передаются при создании и
   * в дальнейшем нельзя изменить
   */
  constantFilters: Record<string, any>;
  /**
   * Загружает ли ItemLoader сейчас элементы
   */
  loadingItems = ref(false);
  /**
   * Утилитарная реактивная переменная для компонентов.
   * Указывает стоит ли показывать состояние загрузки.
   */
  shouldShowLoadingSpinner = ref(false);
  /**
   * Таймаут отображения состояния загрузки.
   */
  loadingSpinnerTimeout: ReturnType<typeof setTimeout> | null = null;
  /**
   * Были ли загружены все доступные элементы.
   */
  endReached = false;
  /**
   * Количество элементов на страницу
   */
  itemsPerPage: number;
  /**
   * Api маршрут для загрузки элементов
   */
  apiPath: string;

  constructor(
    page: number,
    itemsPerPage: number,
    apiPath: string,
    constantFilters: Record<string, any> = {},
  ) {
    this.page = page;
    this.itemsPerPage = itemsPerPage;
    this.apiPath = apiPath;
    this.constantFilters = constantFilters;
  }

  private startTimeout() {
    if (this.loadingSpinnerTimeout) {
      clearTimeout(this.loadingSpinnerTimeout);
    }
    this.loadingSpinnerTimeout = setTimeout(() => {
      this.shouldShowLoadingSpinner.value = true && this.loadingItems.value;
    }, 100);
  }

  private stopTimeout() {
    if (this.loadingSpinnerTimeout) {
      clearTimeout(this.loadingSpinnerTimeout);
    }
    this.shouldShowLoadingSpinner.value = false;
  }

  /**
   * Заново загружает список объектов с сервера
   * @returns загруженный список объектов
   */
  async reload() {
    this.endReached = false;
    this.page = 1;
    this.loadingItems.value = true && !this.endReached;
    try {
      this.startTimeout();
      const newItems = await useNuxtApp().$api<ListReturn<T>>(this.apiPath, {
        method: "GET",
        query: {
          page: this.page,
          itemsPerPage: this.itemsPerPage,
          ...this.filters,
          ...this.constantFilters,
        },
      });
      this.endReached = newItems.isLastPage;
      this.items.value = newItems.data;
      this.loadingItems.value = false;
      this.stopTimeout();
      return newItems;
    } catch (err) {
      this.loadingItems.value = false;
      this.page -= 1;
      throw err;
    }
  }

  /**
   * Загружает первую страницу используя useApi composable.
   * В связи с этим первую страницу нужно помещать в items самостоятельно.
   * @returns то, что возращает useApi
   */
  async loadFirstPage() {
    const fetchObj = useAPI<ListReturn<T>>(this.apiPath, {
      method: "GET",
      query: {
        page: this.page,
        itemsPerPage: this.itemsPerPage,
        ...this.filters,
        ...this.constantFilters,
      },
    });
    return fetchObj;
  }

  /**
   * Загружает следующую страницу.
   * Автоматически помещает объекты в items.
   * @returns загруженный список объектов
   */
  async loadNextPage() {
    if (this.loadingItems.value || this.endReached) {
      return null;
    }
    this.page += 1;
    this.startTimeout();
    try {
      this.loadingItems.value = true && !this.endReached;
      const newItems = await useNuxtApp().$api<ListReturn<T>>(this.apiPath, {
        method: "GET",
        query: {
          page: this.page,
          itemsPerPage: this.itemsPerPage,
          ...this.filters,
          ...this.constantFilters,
        },
      });
      if (newItems.data.length !== 0) {
        this.items.value.push(...newItems.data);
      }
      this.endReached = newItems.isLastPage;
      this.loadingItems.value = false;
      this.stopTimeout();
      return newItems;
    } catch (err) {
      this.loadingItems.value = false;
      this.page -= 1;
      throw err;
    }
  }

  async setFilters(filters: Partial<T>) {
    this.filters = filters;
  }

  deleteItem(predicate: (item: T) => boolean) {
    const foundIndex = this.items.value.findIndex((val) => predicate(val));
    if (foundIndex !== -1) {
      this.items.value.splice(foundIndex, 1);
    }
  }
}
