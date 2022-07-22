// // Script to populate search fields
// $(function () {
//
//     $.ajax({
//         async: false,
//         url: '/dashboards/kpi/data/types',
//         type: 'GET',
//         dataType: "json",
//         data: {
//             asset_group: 'KPI2.1',
//         },
//         success: function (dataTypeList) {
//
//             dataTypeList.location_list.sort().forEach(function (location) {
//                 $("#locationSelect").append(new Option(location, location));
//             })
//
//             dataTypeList.asset_list.sort().forEach(function (asset) {
//                 $("#assetSelect").append(new Option(asset, asset));
//             })
//         }
//     })
//
// });
