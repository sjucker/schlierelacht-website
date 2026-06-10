import {MeetupJahrgang} from '~~/shared/types/rest'

export const MEETUP_JAHRGANG_OPTIONS = [
    {value: MeetupJahrgang.BEFORE_1954, label: '1953 + älter – Mo, 6.9.2027, 17:30'},
    {value: MeetupJahrgang.BORN_1954_1958, label: '1954–1958 – Di, 7.9.2027, 17:30'},
    {value: MeetupJahrgang.BORN_1959_1963, label: '1959–1963 – Mo, 6.9.2027, 17:30'},
    {value: MeetupJahrgang.BORN_1965_1968, label: '1965–1968 – Di, 7.9.2027, 17:30'},
    {value: MeetupJahrgang.BORN_1969_1973, label: '1969–1973 – Mi, 8.9.2027, 17:30'},
    {value: MeetupJahrgang.BORN_1974_1978, label: '1974–1978 – Do, 9.9.2027, 17:30'},
    {value: MeetupJahrgang.BORN_1979_1983, label: '1979–1983 – Mi, 8.9.2027, 17:30'},
    {value: MeetupJahrgang.BORN_1984_1988, label: '1984–1988 – Do, 9.9.2027, 17:30'},
    {value: MeetupJahrgang.BORN_1989_1993, label: '1989–1993 – Fr, 10.9.2027, 17:30'},
    {value: MeetupJahrgang.BORN_1994_1998, label: '1994–1998 – Fr, 10.9.2027, 17:30'},
    {value: MeetupJahrgang.AFTER_1998, label: '1999 + jünger – Fr, 10.9.2027, 17:30'},
] as const
