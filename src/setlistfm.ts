import queryString from "query-string";

type Config = {
  key?: string;
  format?: "json" | "xml";
  language?: string;
};

type Query = Record<string, string | number | boolean | undefined>;

class SetlistFmApi {
  private key: string | false = false;
  private format: string = "application/json";
  private language: string = "en";

  private static version = "1.0";
  private static baseUrl = "https://api.setlist.fm/rest/";
  private static paths = {
    getArtist: "/artist/%s",
    getArtistSetlists: "/artist/%s/setlists",
    getCity: "/city/%s",
    searchArtists: "/search/artists",
    searchCities: "/search/cities",
    searchCountries: "/search/countries",
    searchSetlists: "/search/setlists",
    searchVenues: "/search/venues",
    getSetlistByVersion: "/setlist/version/%s",
    getSetlist: "/setlist/%s",
    getUser: "/user/%s",
    getUserAttended: "/user/%s/attended",
    getUserEdited: "/user/%s/edited",
    getVenue: "/venue/%s",
    getVenueSetlists: "/venue/%s/setlists",
  };

  private static languages = ["en", "es", "fr", "de", "pt", "tr", "it", "pl"];

  constructor(config?: Config) {
    if (config?.key) {
      this.key = config.key;
    }

    if (config?.format) {
      this.format = config.format === "json" ? "application/json" : "application/xml";
    }

    if (config?.language && SetlistFmApi.languages.includes(config.language)) {
      this.language = config.language;
    }
  }

  private buildUrl(endpoint: string, variable: string): string {
    return `${ SetlistFmApi.baseUrl }${ SetlistFmApi.version }${ endpoint.replace("%s", variable) }`;
  }

  private async requestApi(endpoint: string, variables: Query | null): Promise<any> {
    const qs = queryString.stringify(variables || {});
    const url = `${ endpoint }?${ qs }`;

    try {
      let response = await fetch(url, {
        headers: {
          Accept: this.format,
          "Accept-Language": this.language,
          "x-api-key": this.key || "",
        },
      });
      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        return response.json();
      }
      return response;
    } catch (error) {
      console.error("setlist.fm API Error: Could not reach API.");
      throw error;
    }
  }

  public async getArtist(mbid: string): Promise<any> {
    if (!this.key)
      throw new Error("SetlistFM API Error: You have to set an application key to request API.");

    if (!mbid)
      throw new Error("setlist.fm API Error: You need to define a 'mbid' to request API.");

    return this.requestApi(this.buildUrl(SetlistFmApi.paths.getArtist, mbid), null);
  }

  public async getArtistSetlists(mbid: string, query?: Query): Promise<any> {
    if (!this.key)
      throw new Error("SetlistFM API Error: You have to set an application key to request API.");

    if (!mbid)
      throw new Error("setlist.fm API Error: You need to define a 'mbid' to request API.");

    if (typeof query !== "object" && query !== undefined)
      throw new Error("setlist.fm API Error: 'query' must be an object to request API.");

    return this.requestApi(this.buildUrl(SetlistFmApi.paths.getArtistSetlists, mbid), query);
  }

  public async getCity(geoId: string): Promise<any> {
    if (!this.key)
      throw new Error("SetlistFM API Error: You have to set an application key to request API.");

    if (!geoId)
      throw new Error("setlist.fm API Error: You need to define a 'geoId' to request API.");

    return this.requestApi(this.buildUrl(SetlistFmApi.paths.getCity, geoId), null);
  }

  public async searchArtists(query: Query): Promise<any> {
    if (!this.key)
      throw new Error("SetlistFM API Error: You have to set an application key to request API.");

    if (typeof query !== "object")
      throw new Error("setlist.fm API Error: 'query' must be an object to request API.");

    return this.requestApi(this.buildUrl(SetlistFmApi.paths.searchArtists, ""), query);
  }

  public async searchCities(query: Query): Promise<any> {
    if (!this.key)
      throw new Error("SetlistFM API Error: You have to set an application key to request API.");

    if (typeof query !== "object")
      throw new Error("setlist.fm API Error: 'query' must be an object to request API.");

    return this.requestApi(this.buildUrl(SetlistFmApi.paths.searchCities, ""), query);
  }

  public async searchCountries(): Promise<any> {
    if (!this.key)
      throw new Error("SetlistFM API Error: You have to set an application key to request API.");

    return this.requestApi(this.buildUrl(SetlistFmApi.paths.searchCountries, ""), null);
  }

  public async searchSetlists(query: Query): Promise<any> {
    if (!this.key)
      throw new Error("SetlistFM API Error: You have to set an application key to request API.");

    if (typeof query !== "object")
      throw new Error("setlist.fm API Error: 'query' must be an object to request API.");

    return this.requestApi(this.buildUrl(SetlistFmApi.paths.searchSetlists, ""), query);
  }

  public async searchVenues(query: Query): Promise<any> {
    if (!this.key)
      throw new Error("SetlistFM API Error: You have to set an application key to request API.");

    if (typeof query !== "object")
      throw new Error("setlist.fm API Error: 'query' must be an object to request API.");

    return this.requestApi(this.buildUrl(SetlistFmApi.paths.searchVenues, ""), query);
  }

  public async getSetlistByVersion(versionId: string): Promise<any> {
    if (!this.key)
      throw new Error("SetlistFM API Error: You have to set an application key to request API.");

    if (!versionId)
      throw new Error("setlist.fm API Error: You need to define a 'versionId' to request API.");

    return this.requestApi(this.buildUrl(SetlistFmApi.paths.getSetlistByVersion, versionId), null);
  }

  public async getSetlist(setlistId: string): Promise<any> {
    if (!this.key)
      throw new Error("SetlistFM API Error: You have to set an application key to request API.");

    if (!setlistId)
      throw new Error("setlist.fm API Error: You need to define a 'setlistId' to request API.");

    return this.requestApi(this.buildUrl(SetlistFmApi.paths.getSetlist, setlistId), null);
  }

  public async getUser(userId: string): Promise<any> {
    if (!this.key)
      throw new Error("SetlistFM API Error: You have to set an application key to request API.");

    if (!userId)
      throw new Error("setlist.fm API Error: You need to define a 'userId' to request API.");

    return this.requestApi(this.buildUrl(SetlistFmApi.paths.getUser, userId), null);
  }

  public async getUserAttended(userId: string, query?: Query): Promise<any> {
    if (!this.key)
      throw new Error("SetlistFM API Error: You have to set an application key to request API.");

    if (!userId)
      throw new Error("setlist.fm API Error: You need to define a 'userId' to request API.");

    if (typeof query !== "object" && query !== undefined)
      throw new Error("setlist.fm API Error: 'query' must be an object to request API.");

    return this.requestApi(this.buildUrl(SetlistFmApi.paths.getUserAttended, userId), query);
  }

  public async getUserEdited(userId: string, query?: Query): Promise<any> {
    if (!this.key)
      throw new Error("SetlistFM API Error: You have to set an application key to request API.");

    if (!userId)
      throw new Error("setlist.fm API Error: You need to define a 'userId' to request API.");

    if (typeof query !== "object" && query !== undefined)
      throw new Error("setlist.fm API Error: 'query' must be an object to request API.");

    return this.requestApi(this.buildUrl(SetlistFmApi.paths.getUserEdited, userId), query);
  }

  public async getVenue(venueId: string): Promise<any> {
    if (!this.key)
      throw new Error("SetlistFM API Error: You have to set an application key to request API.");

    if (!venueId)
      throw new Error("setlist.fm API Error: You need to define a 'venueId' to request API.");

    return this.requestApi(this.buildUrl(SetlistFmApi.paths.getVenue, venueId), null);
  }

  public async getVenueSetlists(venueId: string, query?: Query): Promise<any> {
    if (!this.key)
      throw new Error("SetlistFM API Error: You have to set an application key to request API.");

    if (!venueId)
      throw new Error("setlist.fm API Error: You need to define a 'venueId' to request API.");

    if (typeof query !== "object" && query !== undefined)
      throw new Error("setlist.fm API Error: 'query' must be an object to request API.");

    return this.requestApi(this.buildUrl(SetlistFmApi.paths.getVenueSetlists, venueId), query);
  }
}

export default SetlistFmApi;
