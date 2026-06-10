/* eslint-disable */

export interface AttractionDTO {
    externalId: string;
    name: string;
    description: string;
    website?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
    images: ImageDTO[];
    tags: TagDTO[];
    programm: ProgrammEntryDTO[];
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

export interface NewsDTO {
    id: number;
    date: DateAsString;
    title: string;
    introText: string;
    fullText: string;
    cloudflareId?: string;
}

export interface ProgrammEntryDTO {
    location: LocationDTO;
    fromDate: DateAsString;
    fromTime?: DateAsString;
    toDate?: DateAsString;
    toTime?: DateAsString;
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

export interface MeetupEntryDTO {
    firstname: string;
    lastname: string;
    yearOfBirth: number;
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
