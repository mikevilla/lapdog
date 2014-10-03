var lapdogPageControl  = can.Control(
{
  defaults:{

  }
},
// @Prototype
{
  init:function () {
    this.load(test_data);
    var self = this;
    $.lapdog.initial_state = "California";

  },

  load:function (test_data) {
    if (!this.hasOwnProperty('set_up_complete')) {
      this.set_up_complete = false;
    }
    if (!this.set_up_complete) {

      var outer = this;


      // make the json call here and dont show the map until completely processed
      $.lapdog.state_data(function (data) {

        $.lapdog_data = data;
        $.state_data = {
          states: {},
          total: 0
        };


        // build the hash of states
        $.each($.lapdog_data, function( index, value ) {

          outer.createNestedObject( $.state_data.states, [value.state] );
          $.state_data.states[value.state] = [];
          $.state_data.total = $.state_data.total + 1;

        });

        // populate the hash with the records
        $.each($.lapdog_data, function( index, value ) {
          $.state_data.states[value.state].push(value);
        });


        // setup variables for state records and state names
        var state_data = $.state_data.states[$.lapdog.initial_state],
            state = "California",
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

        console.log("list of senators in page controller final", list_senators);

        // display the the senator and house of reps data
        $('#senator_container_layout').html(can.view('js/can/templates/senator_scorecard_template', {display_senators: list_senators, state: state}));
        $('#house_container_layout').html(can.view('js/can/templates/house_scorecard_template',{display_reps: list_reps, state: state}));

      }, null);

      this.set_up_complete = true;
    }
  },

  createNestedObject: function( base, names ) {
    for (var i = 0; i < names.length; i++) {
      base = base[ names[i] ] = base[ names[i] ] || {};
    }

  }




});