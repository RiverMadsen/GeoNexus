import { LatLngTuple } from 'leaflet';
import { SettingsState } from './store/SettingsContext';

let compassCircle: any = null
let activeRouteLine: any = null
let nonActiveRouteLine: any = null
let navVectorLine: any = null
let offlineArea: any = null
export function drawColorTestArea(L: any, mapInstance: any, settingsState: SettingsState) {
  ///debugger;
  const baseLat = 49.12;//49.36;
  const baseLng = -115.27;//-114.33;
  const firstPoint = [baseLat, baseLng];
  const activeRoute = [[baseLat + .014, baseLng - .01], [baseLat + .014, baseLng + .07]];
  const activeRouteLL = activeRoute.map(coord => L.latLng(coord[0], coord[1]));
  const nonActiveRoute = [[baseLat + .012, baseLng - .01], [baseLat + .012, baseLng + .07]];
  const nonActiveRouteLL = nonActiveRoute.map(coord => L.latLng(coord[0], coord[1]));
  const navVector = [[baseLat + .01, baseLng - .01], [baseLat + .01, baseLng + .07]];
  const navVectorLL = navVector.map(coord => L.latLng(coord[0], coord[1]));
  const firstPointLL = L.latLng(firstPoint[0] + .01, firstPoint[1]);
  const polygonCoords = [
    firstPoint,
    [baseLat + .02, baseLng],
    [baseLat + .02, baseLng + .05],
    [baseLat, baseLng + .05],
    firstPoint,
  ];
  const polyOptions = {
    fillColor: settingsState.background, // Optional: set fill color
    fillOpacity: 0.4, // Optional: adjust transparency (0 - 1)
    weight: 2, // Optional: set border line thickness
  };
  const convertedCoords = polygonCoords.map(coord => [coord[0], coord[1]] as LatLngTuple);
  // COMPASS
  //debugger;
  if (compassCircle === null) {
    compassCircle = L.circle(firstPointLL, { radius: 1000, fillOpacity: .3, fillColor: settingsState.compass }).addTo(mapInstance.current);
    //debugger;
    console.log("compassCircle: ", compassCircle._latlng.lat, compassCircle._latlng.lng)
  }
  else {
    //debugger;
    compassCircle.setStyle({ fillColor: settingsState.compass });
    console.log("compassCircle exists: ", compassCircle._latlng.lat, compassCircle._latlng.lng)
  }
  // OFFLINE AREA
  if (offlineArea === null) {
    offlineArea = L.polygon(convertedCoords, polyOptions).addTo(mapInstance.current);
  }
  else {
    console.log("offlineArea exists")
    offlineArea.setStyle({ fillColor: settingsState.background });
  }
  //ACTIVE ROUTE
  if (activeRouteLine === null) {
    activeRouteLine = L.polyline(activeRouteLL, { color: settingsState.activeRoute }).addTo(mapInstance.current);
  }
  else {
    activeRouteLine.setStyle({ color: settingsState.activeRoute });
  }
  //NON-ACTIVE ROUTE
  if (nonActiveRouteLine === null) {
    nonActiveRouteLine = L.polyline(nonActiveRouteLL, { color: settingsState.nonActiveRoute }).addTo(mapInstance.current);
  }
  else {
    nonActiveRouteLine.setStyle({ color: settingsState.nonActiveRoute });
  }
  //NAVIGATION VECTOR
  if (navVectorLine === null) {
    navVectorLine = L.polyline(navVectorLL, { color: settingsState.navigationVector }).addTo(mapInstance.current);
  }
  else {
    navVectorLine.setStyle({ color: settingsState.navigationVector });
  }
}