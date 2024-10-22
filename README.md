# setlistfm.ts

## About

This is a wrapper for the brand new setlist.fm API in Typescript.

## Install

```shell
npm install @emulienfou/setlistfm.ts
```

## Useful Links

* [setlist.fm APi documentation](https://api.setlist.fm/docs/1.0/index.html#resources)

## Getting started

To use the API, you need an API key of setlist.fm.   
You can apply for an API key here: https://www.setlist.fm/settings/api (Please note that you need a setlist.fm
account to proceed)

```ts
const setlistfmClient = new SetlistFmApi({ key: process.env.SETLISTFM_KEY });

// Get Artist Profile
await setlistfmClient.getArtist("8538e728-ca0b-4321-b7e5-cff6565dd4c0");

// Get Setlists of Artist
await setlistfmClient.getArtistSetlists("8538e728-ca0b-4321-b7e5-cff6565dd4c0", { p: 1 });

// Get City
await setlistfmClient.getCity("2921466");

// Search for Artists
await setlistfmClient.searchArtists({ artistName: "Linkin Park" });

// Search for Cities
await setlistfmClient.searchCities({ name: "New York" });

// Search Countries
await setlistfmClient.searchCountries();

// Search for Setlists
await setlistfmClient.searchSetlists({ artistName: "Linkin Park" });

// Search for Venues
await setlistfmClient.searchVenues({ name: "Gruenspan" });

// Get Setlist by specific Version
await setlistfmClient.getSetlistByVersion("43596f23");

// Get Setlist
await setlistfmClient.getSetlist("53e493bd");

// Get User
await setlistfmClient.getUser("terhuerne");

// Get Concerts a User has attended to
await setlistfmClient.getUserAttended("terhuerne", { p: 1 });

// Get Setlists a User has edited
setlistfmClient.getUserEdited("terhuerne", { p: 1 });

// Get Venue
await setlistfmClient.getVenue("4bd78fbe");

// Get Setlists of a Venue
await setlistfmClient.getVenueSetlists("4bd78fbe", { p: 1 });
```
