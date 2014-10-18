$.lapdog = can.Model.extend({

  state_data:function (success_func, error_func) {
    $.ajax({
      url:"/data/lapdog.json",
      type:"GET",
      success:success_func,
      error:error_func
    });
  },

  renderMap : function (state) {

      // setup variables for state records and state names
      var state_data = $.state_data.states[state],
          state = state,
          list_senators = [],
          list_reps = [];

      $.each(state_data, function( index, value ) {

        // find the desired state and determine with its senator or house rep
        if (state_data[index].state == state) {
          if (state_data[index].type == "") {
            list_senators.push(value);

            if (list_senators.length == 1) {
              list_senators[0].senior = "1";
            } else {
              if (list_senators[0].years >= list_senators[1].years) {
                list_senators[0].senior = "1";
                list_senators[1].senior = "0";
              } else {
                list_senators[0].senior = "0";
                list_senators[1].senior = "1";
              }
            }


          } else {
            list_reps.push(value);
          }
        }

      });

      // sort the reps by contribution
      list_reps.sort(function(a,b) {return (a.total_contributions < b.total_contributions) ? 1 : ((b.total_contributions < a.total_contributions) ? -1 : 0);} );

      // display the the senator and house of reps data
      $('#senator_container_layout').html(can.view('js/can/templates/senator_scorecard_template', {display_senators: list_senators, state: state}));
      $('#house_container_layout').html(can.view('js/can/templates/house_scorecard_template',{display_reps: list_reps, state: state}));

      // put focus to the top of the senators
      $(window).scrollTop($('#start-senators-card').position().top - 200);

  }

},

/* @Prototype */
{


});
