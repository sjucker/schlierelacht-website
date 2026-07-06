/* eslint-disable */

export interface AttractionDTO {
    externalId: string;
    name: string;
    description: string;
    website?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
    operator?: string;
    images: ImageDTO[];
    tags: TagDTO[];
    programm: ProgrammEntryDTO[];
    files: AttractionFileDTO[];
}

export interface AttractionFileDTO {
    id: number;
    filename: string;
    filetype: string;
    description: string;
    filesize: number;
}

export interface AttractionRefDTO {
    externalId: string;
    name: string;
}

export interface DownloadDTO {
    id: number;
    filename: string;
    filetype: string;
    description: string;
    filesize: number;
    category: DownloadCategory;
    uploadedAt: DateAsString;
}

export interface ImageDTO {
    cloudflareId: string;
    description: string;
    type: ImageType;
}

export interface LocationDTO {
    externalId: string;
    type: LocationType;
    name: string;
    latitude: number;
    longitude: number;
    googleMapsUrl: string;
    cloudflareId?: string;
    mapId?: string;
}

export interface MeetupEntryDTO {
    firstname: string;
    lastname: string;
    jahrgang: MeetupJahrgang;
}

export interface MeetupRegistrationDTO {
    firstname: string;
    lastname: string;
    email: string;
    jahrgang: MeetupJahrgang;
    showOnList: boolean;
}

export interface NewsDTO {
    id: number;
    date: DateAsString;
    title: string;
    introText: string;
    fullText: string;
    cloudflareId?: string;
}

export interface OkDTO {
    members: OkMemberDTO[];
    teamMembers: OkTeamMemberDTO[];
}

export interface OkMemberDTO {
    name: string;
    role: string;
    email?: string;
    cloudflareId?: string;
}

export interface OkTeamMemberDTO {
    name: string;
    team: OkTeam;
    email?: string;
}

export interface ProgrammEntryDTO {
    location: LocationDTO;
    fromDate: DateAsString;
    fromTime?: DateAsString;
    toDate?: DateAsString;
    toTime?: DateAsString;
    past: boolean;
}

export interface ProgrammPointDTO {
    attraction: AttractionRefDTO;
    entry: ProgrammEntryDTO;
}

export interface SponsoringDTO {
    type: SponsoringType;
    name: string;
    cloudflareId?: string;
    url?: string;
}

export interface SponsoringTypeDTO {
    type: SponsoringType;
    description: string;
}

export interface TagDTO {
    id: number;
    name: string;
}

export type DateAsString = string;

export enum DownloadCategory {
    LOGOS = "LOGOS",
    SPONSORING = "SPONSORING",
    GASTRONOMIE = "GASTRONOMIE",
    PROGRAMM = "PROGRAMM",
}

export enum ImageType {
    MAIN = "MAIN",
    ADDITIONAL = "ADDITIONAL",
}

export enum LocationType {
    STAGE = "STAGE",
    FOOD_STAND = "FOOD_STAND",
    BAR = "BAR",
    TENT = "TENT",
    ATTRACTION = "ATTRACTION",
    SANITARY = "SANITARY",
    INFO = "INFO",
}

export enum MeetupJahrgang {
    BEFORE_1954 = "BEFORE_1954",
    BORN_1954_1958 = "BORN_1954_1958",
    BORN_1959_1963 = "BORN_1959_1963",
    BORN_1965_1968 = "BORN_1965_1968",
    BORN_1969_1973 = "BORN_1969_1973",
    BORN_1974_1978 = "BORN_1974_1978",
    BORN_1979_1983 = "BORN_1979_1983",
    BORN_1984_1988 = "BORN_1984_1988",
    BORN_1989_1993 = "BORN_1989_1993",
    BORN_1994_1998 = "BORN_1994_1998",
    AFTER_1998 = "AFTER_1998",
}

export enum OkTeam {
    PRAESIDIALES_STADT_KOMMUNIKATION_FINANZEN = "PRAESIDIALES_STADT_KOMMUNIKATION_FINANZEN",
    BAU_INFRASTRUKTUR = "BAU_INFRASTRUKTUR",
    GASTRONOMIE = "GASTRONOMIE",
    PROGRAMM_AKTIVITAETEN = "PROGRAMM_AKTIVITAETEN",
    SICHERHEIT = "SICHERHEIT",
    SPONSORING = "SPONSORING",
}

export enum SponsoringType {
    HAUPTSPONSOREN = "HAUPTSPONSOREN",
    ORGANISATION = "ORGANISATION",
    GASTREGION = "GASTREGION",
    GOLD = "GOLD",
    SILBER = "SILBER",
    BRONZE = "BRONZE",
    GOENNER = "GOENNER",
    PARTNER = "PARTNER",
}
