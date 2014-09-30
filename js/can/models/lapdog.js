$.lapdog = can.Model.extend({

  state_data:function (success_func, error_func) {
    $.ajax({
      url:"/data/lapdog.json",
      type:"GET",
      success:success_func,
      error:error_func
    });
  }

},

/* @Prototype */
{


});
