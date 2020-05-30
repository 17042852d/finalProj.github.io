$(document).ready(function(){
    $('#table').bootstrapTable({
        columns: [{
            field: 'orderNo',
            title: 'Order#'
        }, {
          field: 'name',
          title: 'Name'
        }, {
          field: 'email',
          title: 'Email'
        }, {
            field: 'phoneNo',
            title: 'Phone No'
        }, {
            field: 'orderDate',
            title: 'Ordered Date'
        }, {
            field: 'updateDate',
            title: 'Last Update'
        }, {
            field: 'numberItem',
            title: 'Number of item'
        }, {
            field: 'price',
            title: 'Price'
        }, {
            field: 'status',
            title: 'Status'
        }]
      })
});