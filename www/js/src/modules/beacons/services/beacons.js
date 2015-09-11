angular.module('beacons').factory('beacons.beacons', ['$resource', 'storage', function($resource, storage) {
    var backend = storage.get('backend');
    var user = storage.get('user');
    var baseUrl = backend.url + '/v1/beacons';

    var res = $resource(baseUrl, {}, {
        search: {
            method: 'POST',
            url: baseUrl + '/search',
            isArray: true
        }
    });

    return {
        get: function(search,page, success, error){
            res.search({
                page: page,
                sort: '-updatedAt',
                token: user.token
            }, {
                search: search
            }, function(data, h){
                success(data, {
                    currentPage: parseInt(h('X-Pagination-Current-Page')),
                    pageCount: parseInt(h('X-Pagination-Page-Count')),
                    perPage: parseInt(h('X-Pagination-Per-Page')),
                    totalCont: parseInt(h('X-Pagination-Total-Count'))
                });
            }, error)
        }
    };
}]);