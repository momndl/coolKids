// async function searchHandler(e) {
//     if (myLocation) {
//         const proxi = myLocation.pos.reverse();
//         console.log("proxi yay", proxi);
//         const query = e.target.value;
//         const response = await geocoder
//             .forwardGeocode({
//                 query,
//                 limit: 5,
//                 routing: true,
//                 proximity: proxi, // LAT AND LONG -> now hard coded, we need this from myLocation const
//                 // types: ["poi", "postcode"], ==== COMMENTED OUT, maybe not neccessaire
//                 // bbox: [-77.210763, 38.803367, -76.853675, 39.052643], bbox	Limit results to only those contained within the supplied bounding box. Bounding boxes should be supplied as four numbers separated by commas, in minLon,minLat,maxLon,maxLat order. The bounding box cannot cross the 180th meridian.
//                 // marker: true, -> key does not work
//             })
//             .send();
//         console.log("res,", response);
//         setSearch(response.body.features);
//         dispatch(searchResultsReceived(response.body.features));
//     } else {
//         console.log("proxy nay");
//         const query = e.target.value;
//         const response = await geocoder
//             .forwardGeocode({
//                 query,
//                 limit: 5,
//                 routing: true,

//                 // types: ["poi", "postcode"], ==== COMMENTED OUT, maybe not neccessaire
//                 // bbox: [-77.210763, 38.803367, -76.853675, 39.052643], bbox	Limit results to only those contained within the supplied bounding box. Bounding boxes should be supplied as four numbers separated by commas, in minLon,minLat,maxLon,maxLat order. The bounding box cannot cross the 180th meridian.
//                 // marker: true, -> key does not work
//             })
//             .send();
//         console.log("res,", response);
//         setSearch(response.body.features);
//         dispatch(searchResultsReceived(response.body.features));
//     }
// }
