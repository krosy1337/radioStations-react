export interface IStation {
    changeuuid: string;
    stationuuid: string;
    serveruuid: string;
    name: string;
    url: string;
    url_resolved: string;
    homepage: string;
    favicon: string;
    tags: string;
    country: string;
    countrycode: string;
    iso_3166_2?: any;
    state: string;
    language: string;
    languagecodes: string;
    votes: number;
    lastchangetime: string;
    lastchangetime_iso8601: Date | string;
    codec: string;
    bitrate: number;
    hls: number;
    lastcheckok: number;
    lastchecktime: string;
    lastchecktime_iso8601: Date | string;
    lastcheckoktime: string;
    lastcheckoktime_iso8601: Date | string;
    lastlocalchecktime: string;
    lastlocalchecktime_iso8601: Date | string;
    clicktimestamp: string;
    clicktimestamp_iso8601: Date | string;
    clickcount: number;
    clicktrend: number;
    ssl_error: number;
    geo_lat?: number | null;
    geo_long?: number | null;
    has_extended_info: boolean;
}

export interface ICountry {
    name: string;
    iso_3166_1: string;
    stationcount: number;
}

export interface IRadio {
    station: IStation | null
    country: ICountry | null
}