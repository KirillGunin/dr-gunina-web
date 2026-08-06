export type PollenDate = {
    year: number;
    month: number;
    day: number;
};

export type PollenColor = {
    red?: number;
    green?: number;
    blue?: number;
};

export interface PollenIndexInfo {
    code: string;
    displayName: string;
    value: number;
    category: string;
    indexDescription?: string;
    color?: PollenColor;
}

export type PlantDescription = {
    type: string;
    family: string;
    season?: string;
    specialColors?: string;
    specialShapes?: string;
    crossReaction?: string;
    picture?: string;
    pictureCloseup?: string;
};

export interface PlantInfo {
    code: string;
    displayName: string;
    inSeason?: boolean;
    indexInfo?: PollenIndexInfo;
    plantDescription?: PlantDescription;
}

export interface PollenTypeInfo {
    code: string;
    displayName: string;
    inSeason?: boolean;
    indexInfo?: PollenIndexInfo;
    healthRecommendations?: string[];
}

export interface DailyInfo {
    date: PollenDate;
    plantInfo: PlantInfo[];
    pollenTypeInfo: PollenTypeInfo[];
}

export interface PollenForecast {
    dailyInfo: DailyInfo[];
    regionCode?: string;
}
