import {UserType} from "../sever-api/api";

export type FilterType = {
    search: string
    field: 'id' | 'name' | 'age'
    order: 'asc' | 'desc'
}

export const sortedUsersHandle = (filter: FilterType, data: UserType[]) => {

    let searchedValue = data.filter(e => e.name.split(' ').join('').toLocaleLowerCase().includes(filter.search.toLowerCase()))

    if (filter.order === 'asc') {
        return searchedValue.sort((a, b) => a[filter.field] > b[filter.field] ? 1 : -1)
    } else {
        return searchedValue.sort((a, b) => a[filter.field] > b[filter.field] ? -1 : 1)
    }


}

export const ageMaker = (age: number) => {

    let count = age % 100;

    if (count >= 5 && count <= 20) {
        return 'лет';
    } else {
        count = count % 10;
        if (count == 1) {
            return 'год';
        } else if (count >= 2 && count <= 4) {
            return 'года';
        } else {
            return 'лет';
        }
    }
}
