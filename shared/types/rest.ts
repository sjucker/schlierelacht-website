/* eslint-disable */

export interface ArtistDTO {
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

export interface ProgrammEntryDTO {
    location: LocationDTO;
    fromDate: DateAsString;
    fromTime?: DateAsString;
    toDate?: DateAsString;
    toTime?: DateAsString;
}

export interface TagDTO {
    id: number;
    name: string;
}

export type DateAsString = string;

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
}
