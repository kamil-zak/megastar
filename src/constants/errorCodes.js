export const CODES = {
    DEFAULT: '0',
    UNAUTHENTICATED: '1',
    UNAUTHORIZED: '2',
    NOTOKEN: '3',
    LOGIN: '4',
    BADREQUESST: '5',
    NOTFOUND: '6',
    VALIDATION: '7',
    UPLOAD: '10',
    USED_FORECLOSURE: '11',
    NOT_EXISTING_FORECLOSURE: '12',
    EXISTING_SYMBOL: '13',
}

export const DETAILS = {
    [CODES.DEFAULT]: { message: 'Wystąpił błąd', status: 500 },
    [CODES.UNAUTHENTICATED]: { message: 'Nie udało się uwierzytelnić użytkownika', status: 401 },
    [CODES.UNAUTHORIZED]: { message: 'Nieautoryzowany dostęp', status: 403 },
    [CODES.NOTOKEN]: { message: 'Nie przesłano tokena uwierzytelniającego', status: 401 },
    [CODES.LOGIN]: { message: 'Nie udało się zalogować', status: 401 },
    [CODES.BADREQUESST]: { message: 'Przesłane zapytanie jest niepoprawne', status: 400 },
    [CODES.NOTFOUND]: { message: 'Nie znaleziono', status: 404 },
    [CODES.VALIDATION]: { message: 'Przesłane dane są niepoprawne', status: 400 },
    [CODES.UPLOAD]: { message: 'Plik nie został przesłany', status: 400 },
    [CODES.USED_FORECLOSURE]: { message: 'Nie można usunąć ograniczenia używanego w rozkładzie', status: 400 },
    [CODES.NOT_EXISTING_FORECLOSURE]: {
        message: 'Nie można zapisać rozkładu zawierającego niezdefiniowane ograniczenia',
        status: 400,
    },
    [CODES.EXISTING_SYMBOL]: {
        message: 'Ograniczenie o podanym symbolu już istnieje',
        status: 400,
    },
}
