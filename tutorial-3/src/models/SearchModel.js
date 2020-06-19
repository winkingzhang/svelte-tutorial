export const Order = {
    'asc': 'asc',
    'desc': 'desc'
};

export const Sort = {
    'stars': 'stars'
};

export const Scope = {
    'repositories': 'repositories',
    // 'commits': 'commits',
    // 'code': 'code',
    // 'issues': 'issues',
    // 'users': 'users'
};

export const Language = {
    'any': '',
    'C': 'C',
    'C#': 'C#',
    'C++': 'C++',
    'CSS': 'CSS',
    'Go': 'Go',
    'HTML': 'HTML',
    'Java': 'Java',
    'JavaScript': 'JavaScript',
    'Objective-C': 'Objective-C',
    'PHP': 'PHP',
    'Python': 'Python',
    'R': 'R',
    'Ruby': 'Ruby',
    'Scala': 'Scala',
    'Shell': 'Shell',
    'Swift': 'Swift',
};

export const baseApiurl = 'https://api.github.com/search';

export default class SearchModel {
    constructor(
        query = 'svelte',
        language = Language.javascript,
        scope = Scope.repositories,
        sort = Sort.stars,
        order = Order.desc,
        page = 1,
        limit = 10
    ) {
        this.query = query;
        this.language = language;
        this.scope = scope;
        this.sort = sort;
        this.order = order;
        this.page = page;
        this.limit = limit;
    }

    toString() {
        const {scope, query, language, sort, order, page, limit} = this;
        const languagePart = language ? `+language:${language}` : '';
        return `${baseApiurl}/${scope}?q=${query}${languagePart}&sort=${sort}&order=${order}&page=${page}&per_page=${limit}`;
    }

    static fromState(state) {
        if (!state || !state.query) {
            return;
        }
        return new SearchModel(state.query, state.language, state.scope,
            state.sort, state.order, state.page, state.limit);
    }
}